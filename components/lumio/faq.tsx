'use client';
import{Accordion,AccordionItem,AccordionTrigger,AccordionContent}from '@/components/ui/accordion';
export function FaqList({items}:{items:string[][]}){return <Accordion type="multiple" className="faq-accordion">{items.map(([q,a],i)=><AccordionItem value={String(i)} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent><p>{a}</p></AccordionContent></AccordionItem>)}</Accordion>}
