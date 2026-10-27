

import {AnikaLogo} from '@/components/lumio/anika-logo';
import {LayoutDashboard,FileText,MessageCircle,Bell,CalendarDays,Car,PlusCircle} from 'lucide-react';
export const memberFeatures=[
 {icon:LayoutDashboard,title:'Your complete loan journey',text:'See your application information, selected lender, approval conditions and settlement progress together. Understand what is complete, what is needed and your next step.'},
 {icon:FileText,title:'Your documents, always within reach',text:'Keep your application evidence, signed agreements and settlement documents in your own account. After settlement, the document history remains available for you to access.'},
 {icon:MessageCircle,title:'Conversations in one place',text:'Communicate with your Lumio team and participating dealer through your dashboard. Keep questions, updates and the context behind decisions with the loan they relate to.'},
 {icon:Bell,title:'Updates you can follow',text:'Receive notifications for document requests, approval conditions and settlement milestones. Know when something changes and when action is needed.'},
 {icon:CalendarDays,title:'Support after settlement',text:'Access your repayment schedule and upcoming payment reminders. Return to the information and documents you need long after the funds have settled.'},
 {icon:Car,title:'Your member vehicle marketplace',text:'Explore electric vehicles, utes, SUVs and hybrids aligned with your finance and repayment parameters. Connect with the dealer directly from your account.'},
 {icon:PlusCircle,title:'Your next goal starts here',text:'Start a future loan application directly from your dashboard. Review your existing information, update what has changed and keep each journey organised.'}
];
export function MemberFeature(){return <section className="member-home-feature"><div><div className="eyebrow dark">YOUR VERY OWN LUMIO SPACE</div><h2>Your journey continues.<br/>Your dashboard stays with you.</h2><p>Applications, documents, conversations and notifications in one place. After settlement, return to your document history, repayment schedule and reminders, or start your next goal.</p><a className="button outline" href="/your-dashboard">Explore the member experience</a></div><div className="member-highlight"><div className="insight-top"><AnikaLogo decorative/><b>Loan Optimiser</b></div><h3>A clearer view of your financial position.</h3><p>Anika is designed to help you understand your commitments, explore repayment scenarios and see the effects before your next decision.</p><a href="/resources/anika-calculators?tool=loan-optimiser">Explore your financial snapshot</a></div></section>}
