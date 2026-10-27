import {AnikaLogo} from '@/components/lumio/anika-logo';
import {BorrowingPower} from '@/components/lumio/borrowing-power';
export const metadata={title:'Borrowing power calculator with Anika AI',description:'Explore an indicative borrowing amount for personal, vehicle and business finance with Anika explaining your budget and assumptions.'};
export default function BorrowingPowerPage(){return <><section className="tool-heading anika-calculator-heading"><div><div className="anika-brand-line"><AnikaLogo decorative/><span>ANIKA AI · BORROWING POWER</span></div><h1>What could your<br/>budget support?</h1></div><p>Choose your loan and purpose. Enter your monthly income, costs and commitments, then explore an estimate with Anika.</p></section><BorrowingPower/></>}
