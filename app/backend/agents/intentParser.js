import dotenv from 'dotenv';


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM = process.env.SYSTEM;

const RULES = process.env.RULES;

export async function parseIntent(message) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        max_tokens: 256,
        system: SYSTEM,
        messages: [{ role: "user", content: `${RULES}\n\nRequest: "${message}"` }],
    });
    const prompt = RULES + '\n\nRequest: "' + message;

    const generationConfig = {
        responseMimeType: "application/json",
    };

    const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
    });
    const raw = response.response.text();

    try {
        return JSON.parse(raw);
    } catch {
        const match = raw.match(/\{[\s\S]*?\}/);
        if (match) return JSON.parse(match[0]);
        throw new Error(`Intent parser failed. Raw output: ${raw}`);
    }
}