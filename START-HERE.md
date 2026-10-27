# Lumio Finance — Amplify merge

Merged 27 October 2026. Base: the 26 October Developer Pack, with the existing Amplify deployment and Resend delivery restored. This is a new merged export, not the original Developer Pack commit.

## Run

Use Node.js 22 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
node tests/enquiries.mjs
node --experimental-strip-types scripts/check-enquiry-snapshot.mjs
node --experimental-strip-types scripts/check-loan-scenarios.mjs
```

The enquiry test starts a local production server on port 3219 and mocks Resend. Build first. It uses synthetic data and sends no real emails. Never preload `tests/mock-resend.cjs` in production.

## Amplify deployment

Keep the existing GitHub repository and Amplify app. Replace the project source with this merged source, retaining your repository's `.git` directory and locally configured environment files. Do not copy `node_modules` or `.next` from another project. Review the diff before committing and pushing to your deployment branch.

`amplify.yml` retains the existing Node 22, pnpm frozen-lockfile install and `.next` output settings. Keep these existing Amplify environment variables:

- `RESEND_API_KEY`: existing Resend key.
- `CONTACT_FROM_EMAIL`: existing sender on your verified Resend domain.
- `CONTACT_ALLOWED_ORIGINS`: comma-separated exact public origins, including https:// and no trailing slash. Include both apex and www only if both serve the form. For local development add http://localhost:3000 to the local environment value.

The build script writes only these variables to `.env.production` for server-side access. No secret values are included in this export. No domain or API-key recreation is needed if the existing configuration remains valid.

## Merge decisions

- Kept new consumer and commercial enquiry forms, validation, Anika calculations, legal notices, content and styles.
- Restored existing Next.js 15.5.28, pnpm lockfile, Amplify config, trusted-auth stub and disabled database adapter.
- Preserved the existing README.md unchanged as requested. Its original starter instructions describe Cloudflare; use THIS file for the merged Amplify project.
- Removed Cloudflare/Vinext build support and the Next 16-specific ESLint config. This export retains the existing deployment's build/typecheck workflow; it does not claim a standalone lint pass.
- General, community, partnership, consumer loan and commercial loan enquiries send via Resend to contact@lumiofinance.com.au. Contact form submissions with the existing "Feedback or a complaint" topic go to compliance@lumiofinance.com.au. Reply-To is the customer's email.
- Loan API uses the public-origin allowlist rather than an internal proxy URL. Notes accept up to 6,000 characters; requests accept up to 40,000 UTF-8 bytes. Validation still rejects invalid fields and absent consent.
- Emails include Privacy Agreement v2.0 (26 October 2026) consent wording and a reference. Existing provider idempotency and 10-second timeout are retained.
- Updated obsolete saved/preview/no-email messages to sending/sent messages while retaining new collection notices.
- Dashboard remains under development; user authentication, saved drafts and a production database are not connected. Enquiries are emailed, not persisted in Cloudflare D1. The original D1 per-email rate limit is consequently not active, as in the previous Resend deployment.
- Public contact/legal email addresses remain exactly as supplied in the new Developer Pack: contact@ for general enquiries; compliance@ for complaints and privacy. The API recipient mapping follows these published roles. Privacy pages retain their direct compliance@ email links. CONTACT_FROM_EMAIL remains the verified sender, independent of these recipients.

## After deployment

Submit one general enquiry and one enquiry through each loan flow. Confirm receipt in the company's Gmail, check details and Reply-To, and check success/error messages. Automated tests mock provider acceptance; they do not prove real inbox delivery. No live deployment or actual test email was performed as part of this merge.
