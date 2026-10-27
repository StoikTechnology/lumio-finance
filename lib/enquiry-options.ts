export const enquiryProducts=['car-loans','personal-loans','leisure-finance','commercial-loans','unsecured-commercial-loans','novated-leasing','home-loans'] as const;
export const enquiryPurposes:Record<string,string[]>={
 'personal-loans':['Debt consolidation','Home renovations','Solar','Medical and dental','Holiday and travel','Wedding or event','Education','Vehicle purchase','Unexpected expenses','Other'],
 'car-loans':['Personal use','Refinance an existing car loan'],
 'commercial-loans':['Business vehicle','Fleet vehicles','Equipment','Machinery','Office equipment','Medical and dental equipment','Truck','Other business asset'],
 'unsecured-commercial-loans':['Working capital','Stock and inventory','Business growth','Marketing and technology','Tax obligations','Other business purpose'],
 'leisure-finance':['Caravan','Motorhome','Boat','Camper trailer'],
 'novated-leasing':['New vehicle lease','Used vehicle lease','Explore my options'],
 'home-loans':['First home','Next home','Investment property','Refinance','Other property goal']};
export const relationships=['Single','Married','De facto'] as const;
export const employmentTypes=['Full time','Part time','Casual','Contractor','Self employed','Not currently employed','Retired','Student','Carer'] as const;
export const livingArrangements=['Renting','Paying a mortgage','Living with family','Own home outright','Boarding','Other'] as const;
export const citizenshipTypes=['Australian citizen','New Zealand citizen','Permanent resident','Temporary visa holder','Other'] as const;
export const incomeSources=['Salary or wages','Self employment','Centrelink Family Tax Benefit A','Centrelink Family Tax Benefit B','Pension','Carer Payment','Carer Allowance','Other Centrelink benefit','Rental income','Other income'] as const;
export const incomeFrequencies=['Weekly','Fortnightly','Monthly','Annually'] as const;
export const commercialPurposes:Record<string,string[]>={Car:['Business vehicle purchase','Refinance a business vehicle','Fleet expansion'],Equipment:['Equipment purchase','Machinery','Office equipment','Medical and dental equipment','Truck or trailer','Other business asset'],'Unsecured loan':['Working capital','Stock and inventory','Business expansion','Marketing and technology','Tax obligations','Other business purpose']};
