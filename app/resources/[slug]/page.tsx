import {LegalPage,type LegalKind} from '@/components/lumio/legal-page';
import documents from '@/lib/legal-documents.json';
import {notFound} from 'next/navigation';
import {guides} from '@/lib/content';
import {PageIntro} from '@/components/lumio/shell';
const support={title:'You don’t have to work it out alone.',intro:'If repayments are becoming difficult, independent support can help you understand your options.',sections:[['Start with your lender','Contact the lender’s hardship team as early as possible. Explain what has changed and ask what assistance may be available.'],['Free, confidential financial counselling','The National Debt Helpline connects people with financial counselling. Call 1800 007 007.'],['Pause before adding debt','Another loan may not solve the underlying problem. Consider support and a realistic budget before taking on a new commitment.']]};
const isLegal=(s:string):s is LegalKind=>Object.hasOwn(documents,s);
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:isLegal(slug)?documents[slug].title:guides.find(x=>x.slug===slug)?.title||(slug==='support'?support.title:'Resource not found')}}
export default async function Guide({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(isLegal(slug))return <LegalPage kind={slug}/>;const g=guides.find(x=>x.slug===slug),e=slug==='support'?support:undefined;if(!g&&!e)notFound();const resource=g||e!;return <><PageIntro eyebrow={g?.category||'LUMIO RESOURCES'} title={resource.title} description={resource.intro}/><article className="article-body">{resource.sections.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}<a className="button outline" href="/resources">Back to resources</a></article></>}
