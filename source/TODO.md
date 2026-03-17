# FlowSpend — Master TODO

Generated: 2026-03-17
Method: Analyzed PRD + DESIGN + TECHSTACK -> prioritized by dependency order
Convention: Complete tasks in order within each phase. Later phases may depend on earlier ones.
Theme: Canva-esque Minimalism (Soft Gradients, Rounded-24, Fluid Motion)

---

## Legend

Status:  [ ] = todo   [x] = done   [-] = in progress   [~] = blocked
Effort:  XS = <2h  S = 2-4h  M = 4-8h  L = 1-2d  XL = 2-3d

---

## Phase 0 — Project Skeleton & Aesthetics (Day 1)

Get the repo structure, design tokens, and CI/CD pipeline in place before writing logic.

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-000 | Create GitHub repo FlowSpend | XS | Repo exists, main branch, MIT LICENSE, .gitignore for Node/Expo |
| T-001 | Initialize Expo App (TypeScript) | XS | npx create-expo-app runs successfully |
| T-002 | Setup Monorepo Structure | XS | Folders: src/, source/, assets/, components/, hooks/, store/ exist |
| T-003 | Commit source/PRD.md | XS | File committed, no placeholder text |
| T-004 | Commit source/DESIGN.md | XS | File committed, color palette defined |
| T-005 | Commit source/TECHSTACK.md | XS | File committed, Offline-first strategy documented |
| T-006 | Commit source/TODO.md (this file) | XS | File committed |
| T-007 | Install & Configure Biome | S | biome.json setup; pnpm lint passes |
| T-008 | Setup NativeWind v4 & Tailwind Config | M | tailwind.config.js has FlowSpend colors |
| T-009 | Setup Typography (Plus Jakarta Sans) | S | Font loaded via expo-font; applied globally |
| T-010 | Setup .github/workflows/ci.yml | S | CI runs on push: installs deps, runs biome check |
| T-011 | Setup Husky Pre-commit Hooks | S | git commit triggers linting and type-check |
| T-012 | Install CodeRabbit on GitHub | XS | App installed; first PR triggers an AI review comment |

---

## Phase 1 — The "Offline Vault" (Days 2–3)

Build the encrypted local database engine. No cloud yet. Pure speed.

### 1A — Database Core

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-013 | Install expo-sqlite (WASM) | XS | Package installed; app doesn't crash on import |
| T-014 | Define DB Schema (transactions, categories, budgets) | S | SQL migration script created |
| T-015 | Implement DB Initialization Hook | M | useDatabase() hook opens connection on app start |
| T-016 | Add SQLCipher Encryption | M | DB requires a PIN/Biometric key to open |
| T-017 | Seed Initial Categories | S | Default categories inserted on first run |

### 1B — State Management (Zustand)

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-018 | Setup Zustand Store Structure | S | Stores created with TS types |
| T-019 | Implement CRUD Actions (Optimistic) | M | addTransaction() updates UI instantly, then writes to DB |
| T-020 | Persist Store to AsyncStorage (Settings only) | S | User preferences persist across app restarts |
| T-021 | Write Unit Tests (Vitest) for Store | M | Tests verify state changes correctly |

---

## Phase 2 — Magic Scan & AI Input (Days 4–6)

The core differentiator: Scanning receipts with style and speed.

### 2A — Camera & OCR

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-022 | Setup expo-camera with Custom Overlay | M | Camera opens; UI overlay has "Scanning Laser" animation |
| T-023 | Integrate Google ML Kit (On-Device OCR) | L | Captured image processed locally; returns raw text string within 1s |
| T-024 | Implement Image Auto-Crop | M | expo-image-manipulator crops to receipt bounds |
| T-025 | Build "Review Card" UI | XL | Display extracted data; Swipe Right to Save, Left to Discard |

### 2B — Parsing Logic

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-026 | Write Regex Parsers (Date, Amount, Merchant) | M | Extracts data from raw ML Kit text with 90% accuracy |
| T-027 | Implement Heuristic Categorization | M | If merchant contains "Uber" -> Category: "Transport" |
| T-028 | Handle Low-Confidence Cases | S | If parser confidence < 80%, highlight field for manual edit |
| T-029 | Add Haptic Feedback on Scan | S | Light haptic on capture; Success haptic on swipe-save |

---

## Phase 3 — Fluid Dashboard & Visuals (Days 7–9)

Making finance look like art. The "Canva" vibe comes alive here.

### 3A — The "River" Chart

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-030 | Install react-native-skia | S | Package installed; basic shape renders on screen |
| T-031 | Build "Spending River" Component | XL | Custom SVG path animation that flows like water |
| T-032 | Implement Interactive Tooltips | M | Long-press on chart river shows exact amount |
| T-033 | Add Gradient Masks to Chart | S | Chart uses Indigo->Lavender gradient |

### 3B — Home Screen Layout

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-034 | Build "Good Morning" Header | S | Dynamic greeting + Current Month Selector |
| T-035 | Build "Budget Pulse" Gauge | L | Circular progress bar that glows red/pulses when >80% used |
| T-036 | Build Transaction List (FlashList) | M | Smooth scrolling list; Glassmorphism card style |
| T-037 | Implement Empty States | S | Beautiful illustration when no transactions exist |
| T-038 | Add Pull-to-Refresh with Snap | S | Custom refresh control with satisfying "snap" haptic |

---

## Phase 4 — Navigation & Micro-Interactions (Days 10–11)

Polishing the feel. Every tap must feel expensive.

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-039 | Setup Expo Router (Tabs + Modals) | S | Tabs: Home, Scan, Insights, Settings |
| T-040 | Implement Shared Element Transitions | L | Tapping a card expands it smoothly into detail view |
| T-041 | Build "Magic Button" FAB | M | Floating Action Button with glowing gradient ring |
| T-042 | Add Confetti on Goal Met | M | Trigger Lottie confetti explosion on goal hit |
| T-043 | Implement Dark Mode Toggle | M | Seamless transition between themes |
| T-044 | Accessibility Audit (WCAG AA) | M | All contrast ratios pass; VoiceOver labels added |

---

## Phase 5 — Insights & Polish (Days 12–13)

Smart features that delight the user.

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-045 | Build "Smart Insights" Cards | M | Generated locally: "You spent 20% more on Coffee" |
| T-046 | Implement Category Breakdown (Pie Chart) | M | Interactive pie chart with soft pastel colors |
| T-047 | Add Export Feature (PDF/CSV) | M | Generate a beautiful PDF report |
| T-048 | Performance Optimization | L | Ensure 60fps on scroll; reduce re-renders |
| T-049 | Final E2E Testing (Maestro) | L | Flows: Onboarding -> Scan -> Save -> View Chart |
| T-050 | Security Final Check | S | Verify DB encryption; CodeRabbit security scan clean |

---

## Phase 6 — Production Ready (Day 14)

| ID | Task | Effort | Acceptance Criteria |
|----|------|--------|---------------------|
| T-051 | Configure EAS Build Profiles | M | preview and production configured in eas.json |
| T-052 | Setup Sentry Integration | M | Errors reported with context |
| T-053 | Write README.md | L | Clear setup instructions |
| T-054 | Build Production APK/IPA | M | eas build completes successfully |
| T-055 | Dogfooding (Internal Test) | — | Founder uses app for 3 days; zero critical bugs |

---

## Notes

- Design First: Before coding any UI component, check source/DESIGN.md.
- Offline Only: Do not introduce API calls to external servers unless marked Optional.
- Commit Discipline: One task = One Commit.
- CodeRabbit: Never merge a PR without addressing CodeRabbit's security suggestions.
