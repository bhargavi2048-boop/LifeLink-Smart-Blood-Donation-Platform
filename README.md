# LifeLink-Smart-Blood-Donation-Platform
                                   🩸 LifeLink — Emergency Blood Connect Platform


**Saving Lives Through Technology**

> *"Every 2 seconds, someone in India needs blood.*
> *LifeLink connects them to a donor in minutes — not hours."*


## 🌐 Overview

**LifeLink** is a real-time Emergency Blood Connect Platform built for the **CodeSangram Hackathon** under the *Web Development — Social Impact* domain.

India faces a critical blood shortage — **1.2 crore units** are needed every year, yet nearly **30% of demand goes unmet**. People die not because blood is unavailable, but because the *right blood can't reach the right patient in time*.

LifeLink solves this by building a **live, searchable donor registry** combined with an **emergency request board** — connecting patients to nearby willing donors in minutes.

| 📊 Stat | 💡 Value |
|---|---|
| Annual Blood Need (India) | 1.2 Crore units |
| Demand Unmet | ~30% (36 lakh units) |
| Eligible Donors Who Haven't Donated | 4 Crore+ |
| Lives Saved Per Donation | Up to 3 |
| Blood Needed Every | 2 seconds |

---

                                             ## 🎬 Demo Video

LifeLink Demo Video : ("https://drive.google.com/file/d/1iNAg-CkFkQuD54mcoOX60cyKZHM4moCI/view?usp=sharing")

> 📌 **Click the above link** to watch the full demo walkthrough of LifeLink.
> The video covers: Home Page → Donor Registration → Blood Request → Find Donors → About

---
                                            ## 🔗 Live Demo

Live Demo : ("https://bhargavi2048-boop.github.io/LifeLink-Smart-Blood-Donation-Platform/")

| 🔗 Link | 📝 Description |
|---|---|
| [🌐 Live Website](https://bhargavi2048-boop.github.io/LifeLink-Smart-Blood-Donation-Platform/) | Deployed live on Firebase Hosting |
| [💻 GitHub Repo](https://github.com/bhargavi2048-boop/LifeLink-Smart-Blood-Donation-Platform) | Source code repository |
| [📄 Documentation]([./LifeLink_Documentation.docx](https://docs.google.com/document/d/1TbOcLx-mU4OUBd5x0FpMzEnG5O8RcfDM/edit?usp=sharing&ouid=114854349355507493250&rtpof=true&sd=true)) | Full project documentation (DOCX) |

> ⚡ **No login required** — open the link and explore all 6 pages instantly.

---

## 🚨 Problem Statement

Blood shortage is one of India's most preventable healthcare crises:

- 🩸 **1.2 crore units** of blood are required annually across India
- ❌ **30% of demand goes unmet** — approximately 36 lakh units short every year
- 👥 **4 crore+ Indians** are eligible to donate but have never done so
- ⏱️ **Every 2 seconds** someone in India needs a blood transfusion
- 📍 Patients and families rely on **outdated word-of-mouth** or social media posts to find donors
- 🏥 Blood banks operate in **silos** with no cross-institution visibility
- 🌐 **No centralised, real-time** system exists to connect donors and patients instantly

> **The core problem is not biological — it's a failure of connection and technology.**

---

## 💡 Solution

LifeLink bridges the gap with a **6-page Single Page Application** that:

✅ Maintains a **live, searchable donor registry** across all 8 blood groups  
✅ Provides **real-time emergency request posting** with urgency levels  
✅ Sends **instant email alerts** to nearby matching donors via EmailJS  
✅ Enables **location-based matching** by blood group + city  
✅ Protects **donor privacy** — contact details never publicly visible  
✅ Supports **donor availability management** with a toggle switch  
✅ Works as a **fully static site** — no server required, opens with one double-click  

---

## ✨ Features

### 🩸 For Blood Donors
- Register with blood group, city, age, and availability status
- Toggle availability on/off at any time
- Opt-in for emergency email alerts
- 90-day rest period automatically respected after donation

### 🚨 For Patients & Families
- Post emergency blood requests in under 60 seconds
- Choose urgency level: 🔴 Critical / 🟠 High / 🟡 Moderate
- Specify blood group, hospital, city, units needed
- Request goes live instantly, visible to all matching donors

### 🔍 For Everyone
- Search donor directory by blood group and city
- View live active blood requests on the home page
- Contact available donors directly
- Mobile-responsive design with hamburger navigation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|---|---|
| **HTML5** | Semantic SPA structure, 6 page sections |
| **CSS3** | Variables, Flexbox, Grid, animations, responsive |
| **Vanilla JavaScript** | Navigation, form logic, donor rendering |
| **Google Fonts** | Syne (headings) + DM Sans (body) |
| **SVG** | Custom illustrated team avatars |

### Backend & Services
| Service | Usage |
|---|---|
| **Firebase Realtime DB** | Donor profiles + blood request storage |
| **Firebase Auth** | Google Sign-In for secure accounts |
| **Firebase Hosting** | CDN-backed global static hosting |
| **EmailJS** | Client-side email alerts to donors |
| **Google Maps Embed API** | Hospital and donor location maps |

---

## 🏗️ Architecture

```
LifeLink — SPA Architecture
─────────────────────────────────────────────
Browser (Client)
│
├── index.html          All 6 pages as <section> elements
├── style.css           CSS variables + component styles
└── script.js           window.goPage() navigation engine
                        Form logic + donor rendering
                        LocalStorage / Firebase integration
│
Firebase (Backend)
├── Realtime Database   Donor profiles + blood requests
├── Authentication      Google Sign-In
├── Hosting             Static site CDN delivery
└── Cloud Functions     Email trigger on matching request
│
External APIs
├── EmailJS             Donor email alerts
└── Google Maps         Location display
─────────────────────────────────────────────
```

### Navigation System
```
window.goPage('home')      → Landing / Hero
window.goPage('how')       → How It Works
window.goPage('register')  → Donor Registration
window.goPage('request')   → Blood Request
window.goPage('donors')    → Find Donors
window.goPage('about')     → About / Team
```

---

## 🔄 Workflow

### Donor Flow
```
Register → Fill Form → Set Availability → Save to DB → Appear in Directory
                                                      ↓
                                          Receive Alerts on Match
```

### Patient Flow
```
Post Request → Select Urgency → Fill Details → Go Live (30s)
                                                    ↓
                                       Matching Donors Alerted
                                                    ↓
                                       Donor Confirms → Donates
```

### Matching Algorithm
```
1. blood === request.blood       (exact blood group match)
2. city  === request.city        (same city)
3. available === true            (donor is ready)
4. lastDon > 90 days ago         (recovery period respected)
         ↓
   Send email alert via EmailJS
```

---

## 📄 Pages

| # | Page | Route | Description |
|---|---|---|---|
| 1 | **Home** | `home` | Hero, stats, live requests, CTA |
| 2 | **How It Works** | `how` | 4-step flow + blood group grid |
| 3 | **Register** | `register` | Donor registration form |
| 4 | **Request Blood** | `request` | Emergency blood request form |
| 5 | **Find Donors** | `donors` | Searchable donor directory |
| 6 | **About** | `about` | Mission, stats, team, tech stack |

---

## 🚀 Getting Started

### Option 1 — Direct Open (No Setup)
```bash
1. Download the ZIP from the releases or GitHub
2. Extract the folder
3. Double-click index.html
4. Opens in any browser — works fully offline!
```

### Option 2 — Clone & Run
```bash
# Clone the repository
git clone https://github.com/your-username/lifelink.git

# Navigate into the folder
cd lifelink

# Open in browser (no build step needed!)
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

### Option 3 — VS Code Live Server
```bash
1. Open the project folder in VS Code
2. Install the "Live Server" extension
3. Right-click index.html → Open with Live Server
4. App runs at http://localhost:5500
```

### Firebase Deployment (Production)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and init
firebase login
firebase init hosting

# Deploy
firebase deploy

# Your app will be live at:
# https://your-project-id.web.app
```

---

## 🔮 Future Scope

### Phase 1 — Current (Hackathon MVP) ✅
- [x] Donor registration and directory
- [x] Blood request posting
- [x] City-based matching
- [x] Email notifications via EmailJS
- [x] LocalStorage for demo persistence

### Phase 2 — Post Hackathon 🔧
- [ ] Full Firebase Realtime Database integration
- [ ] Firebase Authentication (Google Sign-In)
- [ ] OTP-based mobile verification
- [ ] Firebase Cloud Messaging push notifications
- [ ] GPS-based proximity matching (5km / 10km radius)

### Phase 3 — Scale & Impact 🚀
- [ ] Hospital blood bank API integration
- [ ] eRaktkosh (Govt) data sync
- [ ] Android & iOS mobile apps
- [ ] WhatsApp / SMS alerts via Twilio
- [ ] Multi-language support (Tamil, Hindi, Telugu)
- [ ] Admin dashboard and analytics
- [ ] Blood donation camp management module

---

## 👥 Team


| 👑 Team Leader | 💻 Team Member |
|:---:|:---:|
| **Bhargavi N** | **Atchaya M** |
| Full Stack Developer | Backend Developer |
| UI/UX Design · Firebase · Frontend | Database · Research · Pitch |



---

## 📁 Project Structure

```
lifelink/
│
├── index.html                  # All 6 pages — SPA structure
├── style.css                   # All styles + CSS variables
├── script.js                   # Navigation + form logic
├── LifeLink_Documentation.docx # Full project documentation
└── README.md                   # This file
```

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---


**Built with ❤️ for CodeSangram Hackathon**

[![LifeLink](https://img.shields.io/badge/LifeLink-Emergency%20Blood%20Connect-0d9488?style=for-the-badge)](https://github.com/bhargavi2048-boop)

*Bhargavi N & Atchaya M — 2026*

> *"Your blood could save a life today.*
> *It takes 30 minutes to donate.*
> *It takes a lifetime to forget that you did."*



