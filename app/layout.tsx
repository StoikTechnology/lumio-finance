import {PrivacyControls} from '@/components/lumio/privacy-controls';
import type { Metadata } from 'next';
import './globals.css';
import './experience.css';
import './brand-neon.css';
import { Header, Footer } from '@/components/lumio/shell';
export const metadata: Metadata = { title:{default:"Lumio Finance, Your next move, made clearer",template:'%s | Lumio Finance'}, description:"Understand your finance options with Lumio. Explore planned products, compare repayment scenarios with Anika and save a draft at your pace.",icons:{icon:'/media/lumio-app-icon-d1381e7008.webp',shortcut:'/media/lumio-app-icon-d1381e7008.webp'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-AU"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap"/></head><body className="lumio-clear-site"><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/><PrivacyControls/></body></html>}
