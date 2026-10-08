# Namma Bengaluru Civic Voice (ನಮ್ಮ ಬೆಂಗಳೂರು ನಾಗರಿಕ ಧ್ವನಿ)
### AI-Powered Civic Issue Escalation Platform for Bengaluru Citizens & Authorities

A Twitter-like civic reporting mobile/web application designed specifically for the citizens of Bengaluru (18+), enabling them to post locality complaints, automatically moderate content with AI, chat with an AI civic assistant, and escalate issues directly to BBMP, BESCOM, BWSSB, and BTP.

---

## 🌟 Key Features

### 1. 🐦 Twitter/X-Style Civic Feed
- **Locality & Ward Tagging**: Direct tagging with Bengaluru areas (Koramangala, Indiranagar, HSR Layout, Whitefield, Malleshwaram, Jayanagar, etc.) and BBMP Ward numbers.
- **Authority Tracking**: Real-time status tags (`Reported` 🔴 ➔ `Acknowledged` 🟡 ➔ `Officer Dispatched` 🔵 ➔ `Resolved` 🟢).
- **Official Ticket IDs**: Automated unique grievance codes (e.g., `#BBMP-2026-9821`, `#BESCOM-2026-4412`).
- **Amplify (Upvote) Engine**: Upvote issues to escalate community visibility to Ward Corporators and Executive Engineers.
- **"I'm Affected Too"**: Community counter for aggregating multiple affected households.
- **Before / After Photo Proof**: Direct image comparison for fixed potholes and cleared garbage.

### 2. 🛡️ AI Content Moderation Guard
- **Pre-Posting Content Scanner**: Real-time natural language processing scan on post title & body.
- **Anti-Harassment & Civility Filter**: Prevents abusive language, hate speech, or non-civic rants.
- **Automatic Civic Categorization**: Detects keywords (e.g., "pothole", "power cut", "water pipe burst", "garbage pile") and automatically selects the responsible department.
- **AI Severity Classifier**: Tags issues with severity tiers (*High Hazard*, *Health Risk*, *Moderate*).

### 3. 🤖 Namma Mitra AI Assistant (ನಮ್ಮ ಮಿತ್ರ)
- **Locality Search**: Search existing issues to avoid duplicate filings.
- **Resolution Status Check**: Inquires whether a specific problem in a ward has already been addressed by BBMP/BWSSB.
- **Department Routing & Helplines**: Instant guidance to 24x7 control desks (BBMP 1533, BESCOM 1912, BWSSB 1916, BTP 1095).
- **Interactive Complaint Wizard**: Step-by-step assistance in composing a high-priority grievance.

### 4. 📊 Ward Transparency & Leaderboard
- **Ward Resolution Rates**: Transparent metrics on BBMP Wards (e.g. Ward 177 Jayanagar at 87.5% vs Ward 150 Bellandur at 61.9%).
- **SLA Tracking**: Average response and resolution speed by civic department.

### 5. 📱 Android Mobile Simulator & Responsive Web
- Switch seamlessly between **Android Native Mobile Frame** (Pixel/Galaxy device with status bar & notch) and **Full Desktop Web View**.
- Material 3 / Tailwind CSS responsive design with fast single-page interactions.

### 6. 🏛️ Dual Role Mode: Citizen & Gov Official Desk
- **18+ Citizen Profile**: Verified resident badge, civic karma score, history of reported and amplified issues.
- **Official Gov Desk**: BBMP / Department engineers can log in to update tickets, post progress notes, and upload resolution proof photos.

---

## 🚀 Running the Project

1. Navigate to the project directory:
   ```bash
   cd "C:\Users\Deeksha P\.gemini\antigravity\scratch\bengaluru-civic-connect"
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open in your browser:
   - **Local URL**: `http://localhost:5173/`
