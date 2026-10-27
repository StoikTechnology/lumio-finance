export type IncomeInput={source:string,gross:string,frequency:string,taxTreatment?:string};
export type LiabilityInput={type:string,balance:string,repayment:string,limit:string};
export const liabilityTypes=['Mortgage','Car loan','Personal loan','Credit card','Buy now pay later','HELP or HECS debt','Other debt'] as const;
export const annualFactor=(frequency:string)=>({Weekly:52,Fortnightly:26,Monthly:12,Annually:1}[frequency]||0);
export function residentTax2027(income:number){if(!Number.isFinite(income)||income<0)return null;if(income<=18200)return 0;if(income<=45000)return (income-18200)*.15;if(income<=135000)return 4020+(income-45000)*.30;if(income<=190000)return 31020+(income-135000)*.37;return 51370+(income-190000)*.45}
export function defaultTaxTreatment(source:string){return source.startsWith('Centrelink Family Tax Benefit')?'Tax free':['Salary or wages','Self employment','Rental income'].includes(source)?'Taxable':'Not sure'}
export function budgetStatus(remaining:number,netMonthly:number){return remaining<0?'shortfall':remaining<=Math.max(200,netMonthly*.1)?'tight':'surplus'}
export function enquirySnapshot(input:{values:Record<string,string>,incomes:IncomeInput[],liabilities:LiabilityInput[],noLiabilities:boolean,rate:number}){
 const {values:v,incomes,liabilities,noLiabilities,rate}=input;
 const validMoney=(s:string|undefined)=>typeof s==='string'&&s!==''&&Number.isFinite(Number(s))&&Number(s)>=0;
 const incomeReady=incomes.length>0&&incomes.every(i=>i.source&&annualFactor(i.frequency)>0&&validMoney(i.gross));
 const annualGross=incomes.reduce((sum,i)=>sum+(validMoney(i.gross)?Number(i.gross)*annualFactor(i.frequency):0),0);
 const taxReady=incomeReady&&v.taxResidency==='Yes'&&incomes.every(i=>['Taxable','Tax free'].includes(i.taxTreatment||''));
 const taxable=incomes.reduce((sum,i)=>sum+(i.taxTreatment==='Taxable'?Number(i.gross||0)*annualFactor(i.frequency):0),0);
 const tax=taxReady?residentTax2027(taxable):null;const medicare=taxReady?taxable*.02:null;
 const netMonthly=tax!==null&&medicare!==null?(annualGross-tax-medicare)/12:null;
 const debtReady=noLiabilities||liabilities.length>0&&liabilities.every(l=>l.type&&validMoney(l.balance)&&validMoney(l.repayment)&&(l.type!=='Credit card'||validMoney(l.limit)));
 const debts=noLiabilities?[]:liabilities;const debtRepayments=debts.reduce((sum,l)=>sum+Number(l.repayment||0),0),debtBalance=debts.reduce((sum,l)=>sum+Number(l.balance||0),0),mortgage=debts.filter(l=>l.type==='Mortgage').reduce((sum,l)=>sum+Number(l.repayment||0),0);
 const housingReady=!!v.living&&(['Paying a mortgage','Own home outright'].includes(v.living)||validMoney(v.housingMonthly));
 const cashHousing=['Paying a mortgage','Own home outright'].includes(v.living)?0:Number(v.housingMonthly||0);
 const housing=v.living==='Paying a mortgage'?mortgage:cashHousing;
 const assetsReady=['assetProperty','assetVehicles','assetSavings','assetOther'].every(k=>validMoney(v[k]));
 const assets=['assetProperty','assetVehicles','assetSavings','assetOther'].reduce((sum,k)=>sum+Number(v[k]||0),0);
 const amount=Number(v.amount),term=Number(v.term),r=rate/1200;const repayment=amount>=10000&&amount<=500000&&term>=2&&term<=7&&rate>=0&&rate<=40?(r===0?amount/(term*12):amount*r/(1-(1+r)**(-term*12))):null;
 const ready=taxReady&&debtReady&&housingReady&&validMoney(v.livingExpenses)&&repayment!==null&&netMonthly!==null&&(v.living!=='Paying a mortgage'||debts.some(l=>l.type==='Mortgage'));
 const remaining=ready?netMonthly!-Number(v.livingExpenses)-cashHousing-debtRepayments-repayment!:null;
 return {incomeReady,annualGross,tax,medicare,netMonthly,debtReady,debtRepayments,debtBalance,housing,assetsReady,assets,netAssets:assetsReady&&debtReady?assets-debtBalance:null,repayment,remaining,status:remaining===null?'pending':budgetStatus(remaining,netMonthly!)};
}
