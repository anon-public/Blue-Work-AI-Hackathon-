import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const app = express()
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

import { parseIntent } from './agents/intentParser.js';
import { confirmBooking } from './agents/bookingAgents.js';
import { matchprovider } from './agents/providerMatcher.js';

const providersPath = path.join(__dirname, "../data", "providers.json");
const providers = JSON.parse(fs.readFileSync(providersPath, "utf8"));


// ROUTE 1: Parse intent + rank providers (no booking yet)
app.post('/api/request', async (req, res) => {
    const agentlog = [];
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const intent = await parseIntent(message);
        agentlog.push(`[IntentParser] Extracted: ${intent.service}, ${intent.location}, ${intent.time}`);

        const allProviders = matchprovider(intent, providers);
        agentlog.push(`[Matcher] ${allProviders.length} providers ranked by service & location`);

        if (!allProviders.length) {
            return res.status(404).json({ error: "No providers found", intent });
        }

        return res.json({
            intent,
            provider: allProviders[0],
            allProviders,
            agentlog
        }
        );

    } catch (error) {
        console.error('REAL BUG::', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ROUTE 2: User taps Confirm
app.post('/api/booking/confirm', async (req, res) => {
    const agentlog = [];
    try {
        const { provider, intent } = req.body;
        if (!provider || !intent) {
            return res.status(400).json({ error: "Provider and intent are required" });
        }

        const booking = await confirmBooking(provider, intent, 'CONFIRMED');
        agentlog.push("[BookingAgent] Appended to Sheets with status CONFIRMED");

        const reminder = {
            message: `Reminder: ${provider.name} arriving for ${intent.service}`,
            triggerAt: `1 hour before ${booking.slot}`,
            status: 'SCHEDULED'
        };

        return res.json({ booking, reminder, agentlog });

    } catch (error) {
        console.error('REAL BUG::', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ROUTE 3: User taps Reject
app.post('/api/booking/reject', async (req, res) => {
    const agentlog = [];
    try {
        const { provider, intent } = req.body;
        if (!provider || !intent) {
            return res.status(400).json({ error: "Provider and intent are required" });
        }

        const booking = await confirmBooking(provider, intent, 'REJECTED');
        agentlog.push("[BookingAgent] Appended to Sheets with status REJECTED");

        return res.json({ booking, agentlog });

    } catch (error) {
        console.error('REAL BUG::', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));

