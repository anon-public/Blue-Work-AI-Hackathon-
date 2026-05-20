# Blue Work -AI Service Orchestrator for Informal Economy 

## Overview
Agentic AI system that converts natural language service requests
into confirmed bookings via multi-step agent pipeline.

## Architecture
Mobile (Expo) → Express Backend → Antigravity Orchestrator
→ Gemini 2.5 Flash API → Provider Matching → Google Sheets

## Agent Workflow
1. Intent Parser — extracts service, location, time (Gemini 2.5 Flash API)
2. Provider Matcher — scores by rating + distance
3. Booking Agent — writes to Google Sheets

## Tech Stack
- Frontend: React Native (Expo)
- Backend: Node.js, Express
- AI: Google Gemini (Gemini 2.5 Flash)
- Orchestration: Google Antigravity
- Storage: Google Sheets API

## Setup
# Backend
```bash
cd app/backend && npm install && node index.js
```
# Frontend
``` bash
cd app/frontend && npm install && npx expo start
```
## Main Input Screen
<div align='center'>
<img width="480" height="793" alt="image" src="https://github.com/user-attachments/assets/fbee9b48-ed1f-405a-ab2f-4b5b13676ff6" />
  <p><i >Preview of Best Main input Page</i></p>
</div>

## The Best Match Screen
<div align='center'>
  <img width="494" height="728" alt="image" src="https://github.com/user-attachments/assets/55958c46-6a05-4e41-ae46-e88bde925980" />
  <p><i >Preview of Best Match Page</i></p>
</div>

## Environment Variables
``` bash
GEMINI_API_KEY=
GOOGLE_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=./credentials.json
BASE_RATES= //add as per category
URGENCY= //add as per category
SYSTEM= //add specific for the use case
RULES= //add add specific for the use case
```

## Key Features
- Urdu / Roman Urdu / English input
- Price estimation per booking
- Confirm / Reject / Refresh provider flow
- Live Google Sheets booking log
- Full agent trace visible in app

## Assumptions
- Provider data is mocked (20 providers, 5 areas)
- Reminders are simulated, not push notifications
- Antigravity orchestrates all 3 agent steps
