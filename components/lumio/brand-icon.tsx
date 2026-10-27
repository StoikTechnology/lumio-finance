import type{CSSProperties}from 'react';
const shapes:Record<string,React.ReactNode>={
vehicle:<><path d="m5 17 3-8h16l3 8M5 17h22v8H5zM9 21h3m8 0h3M9 25v3m14-3v3"/><path d="M11 9V6m10 3V6"/></>,
personal:<><circle cx="16" cy="9" r="4"/><path d="M7 27v-4a9 9 0 0 1 18 0v4M12 24h8"/></>,
home:<><path d="m4 14 12-10 12 10M7 12v16h18V12M13 28V18h6v10"/></>,
commercial:<><rect x="4" y="10" width="24" height="17" rx="3"/><path d="M11 10V5h10v5M4 17l12 5 12-5M14 21v3h4v-3"/></>,
novated:<><path d="m4 19 3-7h13l3 7M4 19h19v7H4zM8 26v3m11-3v3M8 22h3m5 0h3M21 11c0-6 4-8 8-8 0 5-2 9-8 8Zm0 0 5-5"/></>,
firsthome:<><path d="m3 13 10-9 10 9M6 11v14h11M11 25v-8h5v5"/><circle cx="23" cy="23" r="4"/><path d="m20 26-4 4m0-4 3 3"/></>,
nexthome:<><path d="m3 14 11-10 11 10M6 12v16h16V16M12 28v-9h5v9M23 5h6m-3-3v6"/></>,
investment:<><path d="M4 28V8h11v20M7 12h5m-5 5h5m-5 5h5M15 28h13V17M19 13l4-4 5 2 2-6m-4 0h4v4"/></>,
refinance:<><path d="m10 16 6-5 6 5v10H10zM14 26v-6h4v6M5 12a12 12 0 0 1 21-4m0-5v5h-5M27 21A12 12 0 0 1 6 27m0 4v-5h5"/></>,
apply:<><rect x="7" y="5" width="18" height="24" rx="3"/><path d="M12 5V3h8v2M11 12h10m-10 5h6m-6 5h4m4 1 8-8 3 3-8 8-4 1z"/></>,
match:<><rect x="3" y="4" width="9" height="9" rx="2"/><rect x="20" y="4" width="9" height="9" rx="2"/><rect x="11" y="21" width="10" height="8" rx="2"/><path d="m8 13 8 8 8-8M6 8l1 1 3-3m12 2 1 1 3-3"/></>,
choose:<><rect x="4" y="5" width="24" height="22" rx="3"/><path d="M4 11h24M9 19l4 4 10-9"/></>,
documents:<><path d="M8 3h12l6 6v20H8zM20 3v7h6M12 15h10m-10 5h6m-6 5h8"/></>,
dashboard:<><rect x="4" y="4" width="24" height="24" rx="4"/><path d="M4 11h24M12 11v17M7 8h1m3 0h1m3 0h1M16 17h8m-8 5h5"/></>,
support:<><path d="M5 20v-5a11 11 0 0 1 22 0v5M5 15H3v8h5v-8zM27 15h2v8h-5v-8zM25 23v3h-8M15 14c-4-5-8 1 1 7 9-6 5-12 1-7Z"/></>,
solar:<><circle cx="16" cy="10" r="4"/><path d="M16 2v2M7 10H4m24 0h-3M8 3l3 3m13-3-3 3M7 20h18l3 9H4zM10 24h12m-9-4-2 9m8-9 2 9"/></>,
renovation:<><path d="m4 16 11-11 10 10M7 14v14h16V17M12 28v-8h6v8M21 6l3-3 5 5-3 3-5-5Zm2 3-8 8"/></>,
emergency:<><rect x="4" y="9" width="24" height="19" rx="3"/><path d="M11 9V5h10v4M16 14v9m-4-4h8"/></>,
travel:<><path d="m3 17 10-3 6-10 4-1-3 11 7 5v3l-9-2-5 9-3-1 2-10-7 2z"/></>,
leisure:<><rect x="3" y="9" width="23" height="15" rx="3"/><path d="M7 13h6v5H7zM18 24V13h5v11m3-3h4"/><circle cx="9" cy="25" r="3"/></>,
shield:<><path d="m16 3 12 5v8c0 7-12 13-12 13S4 23 4 16V8zM10 16l4 4 8-9"/></>
};
export function BrandIcon({kind,size=32,className=''}:{kind:string;size?:number;className?:string}){return <svg className={'lumio-brand-icon '+className} width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[kind]||shapes.personal}</svg>}
