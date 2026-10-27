export type BorrowingInputs={income:number,expenses:number,commitments:number,reserve:number,rate:number,buffer:number,years:number,fees:number,ongoing:number};
export function calculateBorrowingPower(p:BorrowingInputs){
 if(Object.values(p).some(x=>!Number.isFinite(x)||x<0)||p.income>500000||p.expenses>500000||p.commitments>500000||p.reserve>500000||p.rate>40||p.buffer>10||p.rate+p.buffer>50||!Number.isInteger(p.years)||p.years<1||p.years>7||p.fees>20000||p.ongoing>1000)return null;
 const available=p.income-p.expenses-p.commitments-p.reserve;
 const payment=Math.max(0,available-p.ongoing),assessmentRate=p.rate+p.buffer,n=p.years*12,r=assessmentRate/1200;
 const financed=payment*(r===0?n:(-Math.expm1(-n*Math.log1p(r)))/r);
 const amount=Math.max(0,financed-p.fees);
 const offerRate=p.rate/1200;
 const repayment=amount===0?0:((amount+p.fees)*(offerRate===0?1/n:offerRate/(-Math.expm1(-n*Math.log1p(offerRate))))+p.ongoing);
 return {available,payment,assessmentRate,financed,amount,repayment,interest:amount===0?0:(repayment-p.ongoing)*n-(amount+p.fees),total:amount===0?0:repayment*n};
}
