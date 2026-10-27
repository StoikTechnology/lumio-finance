import {BorrowerEnquiry} from '@/components/lumio/borrower-enquiry';
import {enquiryProducts} from '@/lib/loan-enquiry';
export const metadata={title:'Start your journey',description:'Tell Lumio about your finance goals. Send an enquiry and a Lumio analyst will get in touch to explore your options.'};
export default async function Apply({searchParams}:{searchParams:Promise<{product?:string,amount?:string,purpose?:string}>}){const q=await searchParams;const product=(enquiryProducts as readonly string[]).includes(q.product||'')?q.product||'':'';const amount=q.amount&&/^\d+$/.test(q.amount)&&Number(q.amount)>=10000&&Number(q.amount)<=500000?q.amount:'';return <BorrowerEnquiry initialProduct={product} initialAmount={amount} initialPurpose={(q.purpose||'').slice(0,120)}/>}
