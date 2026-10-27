# Merge validation — 27 October 2026

- pnpm 11.25.0 frozen-lockfile installation: passed. Existing lockfile unchanged.
- TypeScript typecheck: passed.
- Production Next.js build under Node.js 22.23.4: passed.
- Twelve page routes, all five enquiry flows, origin checks behind a proxy, consent and honeypot rejection, payload limits, loan field validation, mocked Resend payload/error handling and forged authentication header rejection: passed.
- Supplied enquiry snapshot and loan calculation scenario tests under Node.js 22: passed.
- Existing README preserved byte-for-byte.

Resend was mocked with synthetic data; no real email was sent. Live Amplify deployment, real inbox delivery and interactive browser testing were not performed.

Recipient correction: general enquiries route to contact@lumiofinance.com.au; the contact form’s Feedback or a complaint topic routes to compliance@lumiofinance.com.au. Node 22 production rebuild and mocked recipient-routing regression tests passed. Published contact/legal addresses remain unchanged from the Developer Pack.
