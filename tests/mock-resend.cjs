// Test-only preload. Never enabled by the production start/build scripts.
const assert = require('node:assert/strict');
const nativeFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (String(url) !== 'https://api.resend.com/emails') return nativeFetch(url, options);
  const email = JSON.parse(options.body);
  assert.deepEqual(email.to, [email.subject.endsWith('feedback or complaint') ? 'compliance@lumiofinance.com.au' : 'contact@lumiofinance.com.au']);
  assert.equal(email.from, 'Lumio Test <test@example.test>');
  assert.match(email.text, /Privacy Agreement v2.0, 26 October 2026/);
  assert.match(options.headers['Idempotency-Key'], /^lumio\/[a-f0-9]{64}$/);
  assert.equal(options.headers.Authorization, 'Bearer test-key');
  if (email.reply_to === 'provider-failure@example.test') return Response.json({error:'test failure'}, {status:429});
  if (email.reply_to === 'provider-empty@example.test') return Response.json({});
  if (email.subject.endsWith('consumer-loan')) {
    for (const detail of ['Car loans','35000','ABC123','Family Tax Benefit A','Joint','2400','Requested term: 5 years']) assert.ok(email.text.includes(detail), detail);
  }
  if (email.subject.endsWith('commercial-loan')) {
    for (const detail of ['12345678901','QA Director','Equipment','https://example.test','Authority to provide business information confirmed.']) assert.ok(email.text.includes(detail), detail);
  }
  return Response.json({id:'mock-email-id'});
};
