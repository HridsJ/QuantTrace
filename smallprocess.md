Refined Roadmap Based on Your Plan
Page 1: Login / Guest Access
Firebase Auth (email/password, optional Google OAuth)

One hardcoded guest account: e.g., guest@example.com / guest123

On login success → redirect to /companies

Page 2: Company List Manager (/companies)
List current tickers (stored per user in Firestore)

Add/remove tickers via input field

Store list in Firestore: users/{uid}/companies

“Next” button → redirect to /screen

Page 3: Screener Input (/screen)
Split into two sections:

Filters:

Sliders for price, volume, moving average, RSI

Multi-select technical indicators

“Search using filters” button

Drawing:

Canvas for drawing pattern (let user specify X-Y, normalize behind the scenes)

Similarity threshold input

“Search using drawing” button

Backend API request on click, redirect to /results

Page 4: Results (/results)
If filters were used:

Paginated results (20-30 per page)

Line/candle charts using Recharts or ApexCharts

If drawing was used:

Display graph similarity percentage

Option to overlay user's sketch on each match

Clickable ticker → show expanded view of chart

Firebase Setup Overview
Firestore Auth

email/password + fallback guest login

Firestore Database

users/{uid}/companies → array of tickers

users/{uid}/history → optional saved queries

Firestore Rules

Allow read/write to users/{uid} only if uid == request.auth.uid

Special case for guest mode with read-only