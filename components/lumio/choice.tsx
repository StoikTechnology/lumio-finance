'use client';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
export function Choice({id,value,onChange,options,placeholder='Select an option'}:{id:string,value:string,onChange:(v:string)=>void,options:{value:string,label:string}[],placeholder?:string}){return <Select value={value} onValueChange={onChange}><SelectTrigger id={id} className="lumio-select"><SelectValue placeholder={placeholder}/></SelectTrigger><SelectContent>{options.map(o=><SelectItem value={o.value} key={o.value}>{o.label}</SelectItem>)}</SelectContent></Select>}
