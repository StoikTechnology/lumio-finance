// Use the public origin allowlist: Amplify may forward an internal request URL.
export function isAllowedContactRequest(req: Request): boolean {
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",").map(value => value.trim()).filter(Boolean);
  const origin = req.headers.get("origin");
  return !!origin && allowed.includes(origin) && req.headers.get("sec-fetch-site") !== "cross-site";
}
