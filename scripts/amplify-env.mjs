import { writeFileSync } from "node:fs";

const names = [
    "RESEND_API_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_ALLOWED_ORIGINS",
];

const lines = names.map((name) => {
    const value = process.env[name] ?? "";

    if (/[\r\n]/.test(value)) {
        throw new Error(`Invalid environment variable: ${name}`);
    }

    return `${name}=${JSON.stringify(value.replaceAll("$", "\\$"))}`;
});

writeFileSync(".env.production", lines.join("\n") + "\n", {
    mode: 0o600,
});