// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { siteData } from "../../lib/siteData";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// function safeJsonParse(text: string) {
//     try {
//         const start = text.indexOf("{");
//         const end = text.lastIndexOf("}") + 1;

//         if (start === -1 || end === -1) return null;

//         return JSON.parse(text.slice(start, end));
//     } catch {
//         return null;
//     }
// }

// export async function POST(req: Request) {
//     const { message } = await req.json();

//     const model = genAI.getGenerativeModel({
//         model: "gemini-2.5-flash-lite",
//     });

//     const prompt = `
// You are a website assistant.

// You MUST classify the user's intent and respond ONLY in JSON.

// INTENT RULES:
// - Greeting (hi, hello, hey) → intent = GREETING
// - Asking about company → intent = ABOUT
// - Asking for promotion or marketing → intent = PROMOTION
// - Otherwise → intent = HOME

// PROMOTION TYPES:
// - sports
// - movie
// - music

// WEBSITE DATA:
// ${JSON.stringify(siteData, null, 2)}

// USER MESSAGE:
// "${message}"

// RESPONSE FORMAT (JSON ONLY):
// {
//   "reply": string,
//   "intent": "GREETING" | "ABOUT" | "PROMOTION" | "HOME",
//   "promotionType": "sports" | "movie" | "music" | null,
//   "caseStudies": {
//     "title": string,
//     "slug": string
//   }[]
// }
// `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();
//     console.log("RAW GEMINI RESPONSE:", text);

//     const parsed = safeJsonParse(text);
//     return NextResponse.json(parsed);
//     // try {
//     // const json = JSON.parse(text);
//     // return NextResponse.json(json);
//     // } catch {
//     //     return NextResponse.json({
//     //         reply: "Hi! How can I help you today?",
//     //         intent: "HOME",
//     //         promotionType: null,
//     //         caseStudies: [],
//     //     });
//     // }
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { siteData } from "../../lib/siteData";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function safeJsonParse(text: string) {
    try {
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}") + 1;
        if (start === -1 || end === -1) return null;
        return JSON.parse(text.slice(start, end));
    } catch {
        return null;
    }
}

export async function POST(req: Request) {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite", // ✅ VALID MODEL
    });

    const prompt = `
You are a website assistant.

Return ONLY valid JSON.
No markdown, no explanation, no extra text.

INTENT PRIORITY (IMPORTANT):
1. ABOUT (about, company, services, who are you)
2. PROMOTION (case study, promote, marketing, campaign)
3. GREETING (hi, hello, hey)
4. HOME (fallback)

CASE STUDY VIEW RULES:
- If user asks "case studies", "our work", "all campaigns"
  → view = "LIST"
- If user mentions a specific type like sports, movie, music
  → view = "DETAIL"

PROMOTION TYPES:
sports, movie, music

WEBSITE DATA:
${JSON.stringify(siteData)}

USER MESSAGE:
"${message}"

RESPONSE FORMAT:
{
  "reply": "string",
  "intent": "GREETING" | "ABOUT" | "PROMOTION" | "HOME",
  "view": "LIST" | "DETAIL" | null,
  "promotionType": "sports" | "movie" | "music" | null,
  "caseStudies": [
    { "title": "string", "slug": "string" }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    console.log("RAW GEMINI RESPONSE:", raw);

    const parsed = safeJsonParse(raw);

    // ✅ SAFE FALLBACK
    if (!parsed) {
        return NextResponse.json({
            reply: "Hi! How can I help you today?",
            intent: "HOME",
            view: null,
            promotionType: null,
            caseStudies: [],
        });
    }

    return NextResponse.json(parsed);
}
