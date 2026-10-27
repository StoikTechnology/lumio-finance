export const loanGoals=[
 {value:'leisure-finance',label:'Leisure finance',business:false,purposes:['Caravan','Motorhome or campervan','Boat','Camper trailer'],note:'Asset eligibility, security and lender requirements vary. Include running costs in your budget.'},
 {value:'car-loans',label:'Car loan',business:false,purposes:['Personal use'],note:'Explore a car loan for personal use. For a business vehicle, choose Business finance.'},
 {value:'personal-loans',label:'Personal loan',business:false,purposes:['Debt consolidation','Home renovations','Solar','Medical & dental','Travel','Wedding & events','Education','Vehicle purchase','Unexpected expenses','Other'],note:'Choose the purpose that best describes your plans. Changing the purpose does not predict your lender rate.'},
 {value:'commercial-loans',label:'Business finance',business:true,purposes:['Business car loan','Fleet vehicles','Equipment','Commercial machinery','Office equipment','Medical & dental equipment','Truck'],note:'Explore finance for a business vehicle, truck or equipment. Security and asset requirements vary by lender.'},
 {value:'unsecured-commercial-loans',label:'Unsecured business loan',business:true,purposes:['Working capital','Stock & inventory','Business expansion','Marketing & technology','Tax obligations','Other business purpose'],note:'Unsecured does not mean without obligations. Some lenders may require a personal guarantee or business security.'},
 {value:'novated-leasing',label:'Novated leasing',business:false,purposes:['Employer supported vehicle lease'],note:'This is a loan calculation, not a lease package. It excludes tax treatment, salary sacrifice and vehicle running costs.'}
] as const;
export function findLoanGoal(value:string){return loanGoals.find(g=>g.value===value)}
export function validPurpose(product:string,purpose:string){const g=findLoanGoal(product);return !!g&&(g.purposes as readonly string[]).includes(purpose)}
