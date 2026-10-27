export type MonthlyPosition={income:number,expenses:number,commitments:number,reserve:number,proposed:number};
export function financialSnapshot(p:MonthlyPosition){
 if(Object.values(p).some(x=>!Number.isFinite(x)||x<0||x>500000)||p.income===0)return null;
 const remaining=p.income-p.expenses-p.commitments-p.reserve;
 return {remaining,after:remaining-p.proposed,commitmentShare:p.commitments/p.income*100,stressAfter:remaining-p.proposed-p.expenses*.1};
}
