import { isAllowedContactRequest } from "@/lib/contact-request";
import { createHash } from "node:crypto";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
    id: z.string().uuid(),
    fullName: z.string().trim().min(2).max(120),
    mobile: z.string().trim().regex(/^\+?[0-9 ()-]{8,20}$/),
    email: z.string().trim().email().max(254),
    notes: z.string().trim().min(5).max(6000),
    website: z.string().max(0), // 스팸 방지용 숨겨진 필드
    consent: z.literal(true),
    topic: z.enum(["", "Exploring a loan product", "My account or saved draft", "Home loan specialist enquiry", "Feedback or a complaint", "Something else"]).optional(),
    enquiryType: z.enum(["partnership", "community", "consumer-loan", "commercial-loan"]).optional(),
    businessWebsite: z.string().max(500).url().optional(),
}).strict().superRefine((data, ctx) => {
    if (
        data.businessWebsite &&
        !["https:", "http:"].includes(new URL(data.businessWebsite).protocol)
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["businessWebsite"],
            message: "Use an http or https website.",
        });
    }

    if (data.enquiryType === "partnership" && !data.businessWebsite) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["businessWebsite"],
            message: "Business website is required.",
        });
    }
});

function reply(body: unknown, status = 200) {
    return Response.json(body, {
        status,
        headers: { "Cache-Control": "no-store" },
    });
}

export async function POST(req: Request) {
    if (!isAllowedContactRequest(req)) {
        return reply({ error: "Request not permitted." }, 403);
    }

    let raw: unknown;

    try {
        const body = await req.text();

        if (Buffer.byteLength(body, "utf8") > 40000) {
            return reply({ error: "Message too large." }, 413);
        }

        raw = JSON.parse(body);
    } catch {
        return reply({ error: "Invalid message." }, 400);
    }

    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
        return reply({
            error: "Please check your contact details, message and consent.",
        }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !from) {
        return reply({
            error: "Please email contact@lumiofinance.com.au directly.",
        }, 503);
    }

    const data = parsed.data;

    const email = {
        from,
        to: [data.topic === "Feedback or a complaint" ? "compliance@lumiofinance.com.au" : "contact@lumiofinance.com.au"],
        reply_to: data.email,
        subject: `Lumio website enquiry — ${data.topic === "Feedback or a complaint" ? "feedback or complaint" : data.enquiryType ?? "general"}`,
        text: [
            `Reference: ${data.id}`,
            `Name: ${data.fullName}`,
            `Email: ${data.email}`,
            `Mobile: ${data.mobile}`,
            `Business website: ${data.businessWebsite ?? "-"}`,
            "",
            data.notes,
            "",
            "Enquiry consent recorded: Privacy Agreement v2.0, 26 October 2026.",
        ].join("\n"),
    };

    // 같은 내용으로 재시도할 때 중복 발송 방지
    const key = createHash("sha256")
        .update(JSON.stringify(email))
        .digest("hex");

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "Idempotency-Key": `lumio/${key}`,
            },
            body: JSON.stringify(email),
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            return reply({
                error: "Your message could not be sent. Please try again.",
            }, 503);
        }

        const result = await response.json();

        if (!result.id) {
            throw new Error("Missing email reference");
        }

        return reply({ reference: data.id }, 201);
    } catch {
        return reply({
            error: "Sending could not be confirmed. Please try again.",
        }, 503);
    }
}