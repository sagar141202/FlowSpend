# FlowSpend: Product Requirement Document (PRD)

## 1. Elevator Pitch
FlowSpend is the "Canva of Finance"—a visually stunning, offline-first expense tracker that turns receipt scanning into an artistic, frictionless flow, auto-categorizing spending with AI while keeping your data 100% private on-device.

## 2. Core Goals
- Aesthetic Utility: Prove that finance apps don't have to be boring spreadsheets; they should feel like a creative tool.
- Zero-Latency Logging: Allow users to scan and log an expense in under 8 seconds, even without internet.
- Visual Intelligence: Replace rows of numbers with fluid, animated charts that tell a story about spending habits.

## 3. User Persona: "The Visual Planner"
- Who: Creatives, freelancers, and Gen Z/Millennials who use Notion/Canva.
- Pain Point: Hates clunky banking apps; loses paper receipts; wants to "see" their budget, not just read it.
- Desire: An app that feels good to touch, with haptic feedback and smooth transitions.

## 4. MVP Features (Prioritized)
1. Magic Scan (OCR+AI): Point camera -> Auto-extract Amount, Date, Merchant, & Category -> Animated "Swipe to Confirm" card.
2. Fluid Dashboard: A living home screen with a "Spending River" visualization (animated flow chart) instead of static bars.
3. Haptic Budgets: Set limits; the app vibrates gently as you approach 80% and pulses urgently at 100%.
4. Offline Vault: SQLite local database with encryption; zero cloud dependency for core features.
5. Smart Insights: "You spent 20% more on coffee this week" – delivered via a friendly, conversational UI card.

## 5. Success Metrics
- Time-to-Value: < 10 seconds from app open to logged expense.
- Retention: > 45% Day-7 retention due to delightful UX.
- Performance: 60fps animations on mid-range devices; < 50ms DB write latency.

## 6. Non-Goals & Constraints
- No Social Feed: No sharing expenses publicly (Privacy First).
- No Web Version (MVP): Mobile-native only for best camera/haptic integration.
- Constraint: Must work 100% offline; sync is optional/add-on later.
- Design Constraint: Strict adherence to "Canva-esque" minimalism (soft shadows, rounded-xl, pastel gradients).
