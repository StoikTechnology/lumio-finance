import {LoanOptimiser} from '@/components/lumio/loan-optimiser';
import {AnikaLogo} from '@/components/lumio/anika-logo';
export const metadata={title:"Anika Loan Optimiser, Your financial snapshot",description:'Explore your income, expenses and current commitments alongside an indicative loan repayment, with clear Anika explanations.'};
export default function Optimiser(){return <><section className="tool-heading"><div><div className="anika-brand-line"><AnikaLogo decorative/><span>ANIKA · LOAN OPTIMISER</span></div><h1>Your position.<br/>In perspective.</h1></div><p>Explore your income, expenses and current commitments alongside an example future repayment.</p></section><LoanOptimiser/></>}
