import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {loanPayload, businessPayload, partnerPayload} from './fixtures.mjs';
const base='http://127.0.0.1:3219';
// Deliberately different from the internal URL to exercise Amplify proxy handling.
const origin='https://lumio.example.test';
const server=spawn(process.execPath,['--require','./tests/mock-resend.cjs','./node_modules/next/dist/bin/next','start','-p','3219','-H','127.0.0.1'],{env:{...process.env,RESEND_API_KEY:'test-key',CONTACT_FROM_EMAIL:'Lumio Test <test@example.test>',CONTACT_ALLOWED_ORIGINS:origin},stdio:['ignore','pipe','pipe']});
let logs='';server.stdout.on('data',d=>logs+=d);server.stderr.on('data',d=>logs+=d);
const send=(path,data,headers={})=>fetch(base+path,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(data)});
try {
 let ready=false;for(let i=0;i<100;i++){try{if((await fetch(base+'/contact')).ok){ready=true;break}}catch{}await delay(200)}assert.ok(ready,logs);
 for(const path of ['/','/apply?product=car-loans','/apply?product=commercial-loans','/contact','/login','/dashboard',...['terms','privacy','privacy-agreement','credit-guide','complaints','cookies'].map(x=>'/resources/'+x)]){
  const r=await fetch(base+path);assert.equal(r.status,200,path);const html=await r.text();assert.doesNotMatch(html,/Email delivery and .*not connected/);
 }
 for(const [path,payload] of [['/api/contact',partnerPayload],['/api/contact',{...partnerPayload,enquiryType:'community'}],['/api/contact',{...partnerPayload,enquiryType:'partnership',businessWebsite:'https://example.test'}],['/api/loan-enquiries',loanPayload],['/api/loan-enquiries',businessPayload]]){
  const r=await send(path,payload);assert.equal(r.status,201,await r.clone().text());assert.equal((await r.json()).reference,payload.id);
  assert.equal((await send(path,{...payload,consent:false})).status,400);
  assert.equal((await send(path,{...payload,website:'bot'})).status,400);
  assert.equal((await send(path,payload,{Origin:'https://untrusted.test'})).status,403);
  assert.equal((await send(path,payload,{'Sec-Fetch-Site':'cross-site'})).status,403);
 }
 assert.equal((await send('/api/contact',{...partnerPayload,topic:'Feedback or a complaint'})).status,201);
 assert.equal((await send('/api/contact',{...partnerPayload,topic:'Unknown topic'})).status,400);
 assert.equal((await send('/api/contact',{...partnerPayload,notes:'가'.repeat(6000)})).status,201);
 assert.equal((await send('/api/contact',{...partnerPayload,notes:'a'.repeat(6001)})).status,400);
 assert.equal((await send('/api/contact',{...partnerPayload,notes:'a'.repeat(40001)})).status,413);
 assert.equal((await send('/api/contact',{...partnerPayload,enquiryType:'partnership'})).status,400);
 assert.equal((await send('/api/contact',{...partnerPayload,enquiryType:'partnership',businessWebsite:'javascript:alert(1)'})).status,400);
 for(const email of ['provider-failure@example.test','provider-empty@example.test']) assert.equal((await send('/api/contact',{...partnerPayload,email})).status,503);
 for(const change of [{term:'8'},{amount:'9999'},{amount:'500001'},{product:'made-up'},{details:undefined}])assert.equal((await send('/api/loan-enquiries',{...loanPayload,...change})).status,400);
 assert.equal((await send('/api/loan-enquiries',{...businessPayload,business:{...businessPayload.business,authority:false}})).status,400);
 assert.equal((await send('/api/loan-enquiries',{...businessPayload,business:{...businessPayload.business,acn:''}})).status,400);
 const spoof=await fetch(base+'/api/applications',{headers:{'oai-authenticated-user-id':'forged','oai-authenticated-user-email':'forged@example.test'}});assert.equal(spoof.status,401);
 console.log('PASS: 12 page routes; all five enquiry flows; proxy origin; consent; spam; length; loan validation; mocked Resend payload and errors; forged auth rejected. No real emails sent.');
} finally {server.kill('SIGTERM');}
