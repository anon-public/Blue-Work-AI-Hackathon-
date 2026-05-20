import { google } from 'googleapis';

/**
 * Appends booking to Google Sheets and generates a reminder object.
 * 
 * @param {Object} provider - The matched provider object (from providerMatcher.js)
 * @param {Object} intent - The parsed user intent (from intentParser.js)
 * @returns {Promise<Object>} - Confirmation details and reminder object
 */
export async function confirmBooking(provider, intent, status = 'CONFIRMED') {

    const confirmationId = status === 'CONFIRMED' ? `BK${Date.now()}` : `RJ${Date.now()}`;
    try {
        // 1. Time Parsing Logic
        const requestedTime = (intent.time || "").toLowerCase();
        let slotDate = new Date();

        if (requestedTime.includes("kal subah") || requestedTime.includes("tomorrow morning")) {
            // Next day at 10:00 AM
            slotDate.setDate(slotDate.getDate() + 1);
            slotDate.setHours(10, 0, 0, 0);
        } else {
            // Default: Today at 2:00 PM
            slotDate.setHours(14, 0, 0, 0);
        }

        const formattedSlot = slotDate.toLocaleString(); // e.g., "5/14/2026, 10:00:00 AM"
        const timestamp = new Date().toISOString();
        // const confirmationId = "BK" + Date.now();

        // 2. Google Sheets Authentication & Appending
        // Note: Assumes GOOGLE_APPLICATION_CREDENTIALS or standard env vars are set
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        // Define your target Spreadsheet ID in .env
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // Append Row: [timestamp, confirmationId, providerName, service, location, slot, status]
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Bookings!A:G', // Adjust sheet name if necessary
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        timestamp,
                        confirmationId,
                        provider.name,
                        intent.service,
                        intent.location,
                        formattedSlot,
                        status
                    ]
                ]
            }
        });

        // 3. Generate Reminder Object (1 hour before slot)
        const reminderDate = new Date(slotDate.getTime() - (60 * 60 * 1000));

        const reminder = {
            triggerAt: reminderDate.toLocaleString(),
            message: `Reminder: Your ${intent.service} with ${provider.name} is scheduled at ${formattedSlot}.`,
            status
        };

        return {
            confirmationId,
            formattedSlot,
            status,
            reminder
        };

    } catch (error) {
        console.error("Booking failed:", error);
        throw new Error("Could not confirm booking or append to Google Sheets");
    }
}