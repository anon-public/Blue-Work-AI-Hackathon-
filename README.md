
<div align='center'>
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/1a3a34d5-d317-40e2-94d0-41b0f8afa67d" />

### Blue Work
  <i>Agentic AI Mobile App for Informal Economy</i>   
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339939?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
  </div>

--- 
# Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Onboarding](#onboarding)
- [Pages & Components](#pages--components)
- [License](#license)


## Overview
Agentic AI system that converts natural language service requests
into confirmed bookings via multi-step agent pipeline.Uses Gemini 2.5 Flash API to parse the natural language into matching intent that further books the working agent for the user.

## Features
- Urdu / Roman Urdu / English input
- Price estimation per booking
- Confirm / Reject / Refresh provider flow
- Live Google Sheets booking log
- Full agent trace visible in app
- Worker form handling and Dashboard

## Tech Stack
- Frontend: React Native (Expo)
- Backend: Node.js, Express
- AI: Google Gemini (Gemini 2.5 Flash)
- Orchestration: Google Antigravity
- Storage: Google Sheets API

## Architecture
Mobile (Expo) → Express Backend → Antigravity Orchestrator
→ Gemini 2.5 Flash API → Provider Matching → Google Sheets

## Agent Workflow
1. Intent Parser — extracts service, location, time (Gemini 2.5 Flash API)
2. Provider Matcher — scores by rating + distance
3. Booking Agent — writes to Google Sheets


## Getting Started
Install the latest version of bluework app from the releases section on your Android or ios platfrom.No need to run the backend/frontend code as for mobile platfrom app.
For Web version need to run the following code in the terminal:
```bash
cd app/frontend
npx expo start --clear

```
> **Note:** No need to run backend code for the web version as the backend is already deployed.


## Onboarding
<div align='center'>

| Screen 1 | Screen 2 |
| :---: | :---: |
|   <img width="485" height="890" alt="image" src="https://github.com/user-attachments/assets/7e1a44df-2725-411c-b49b-a062c9e041da" /> |   <img width="493" height="890" alt="image" src="https://github.com/user-attachments/assets/0deef860-9597-49fe-9fe4-76ac041089ab" />
 |
</div>

## Pages & Components
<div align='center'>

| Main Input | Best Match |
| :--------: | :--------: |
|   <img width="480" height="750" alt="image" src="https://github.com/user-attachments/assets/fbee9b48-ed1f-405a-ab2f-4b5b13676ff6" /> |   <img width="494" height="750" alt="image" src="https://github.com/user-attachments/assets/55958c46-6a05-4e41-ae46-e88bde925980" /> |

| Worker Form | Worker Dashboard |
| :---: | :---: |
|   <img width="471" height="873" alt="image" src="https://github.com/user-attachments/assets/6d523f39-b12f-4cdc-810d-2d32f6820ae1" /> |  <img width="483" height="892" alt="image" src="https://github.com/user-attachments/assets/ccee61e8-c32e-4c97-8bd2-5508587ab443" />
 |

</div>

### Assumptions

- Provider data is mocked (20 providers, 5 areas)
- Reminders are simulated, not push notifications
- Antigravity orchestrates all 3 agent steps
- The worker dashboard shows illustration with mock data.

## LICENSE
This project is licensed under the **License** — see the LICENSE.txt file for details.

