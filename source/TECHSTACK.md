# FlowSpend: Technical Architecture (2026 Stack)

## 1. Frontend (Mobile Native)
- Core: React Native (v0.75+) with Expo SDK 52+ (Managed Workflow).
- Language: TypeScript (Strict Mode, Zod for runtime validation).
- Styling: NativeWind v4 (Tailwind CSS for RN) + Tamagui for optimized universal components.
- Animations: React Native Reanimated 4 (Worklets for 60fps UI thread animations) + Moti for declarative transitions.
- Icons: Lucide React Native (Clean, stroke-based).

## 2. Local Database (Offline-First)
- Engine: Expo SQLite (Next-gen WASM-based SQLite for speed) OR WatermelonDB (if complex sync needed later).
- Encryption: SQLCipher for local data security (biometric lock integration).
- State Management: Zustand (Lightweight, persistent stores) + TanStack Query (for async state caching).

## 3. AI & OCR (On-Device)
- OCR Engine: Google ML Kit (via expo-camera + native module) for fast, offline text recognition.
- Categorization Logic: Lightweight Regex + Heuristic Rules initially; Phase 2: On-device TensorFlow Lite model for merchant classification.
- Image Processing: expo-image-manipulator for auto-cropping receipts before OCR.

## 4. DevOps & Quality
- Package Manager: pnpm (Fastest, disk efficient).
- Linting: Biome (Rust-based, faster than ESLint/Prettier combo).
- Git Hooks: Husky + Lint-Staged (Auto-fix on commit).
- CI/CD: GitHub Actions + EAS Build (Cloud builds for iOS/Android).
- Code Review: CodeRabbit AI (Installed on GitHub) for logic checks and security scanning.

## 5. Security & Monitoring
- Secrets: expo-secure-store for sensitive tokens.
- Crash Reporting: Sentry (with Performance monitoring).
- Analytics: PostHog (Self-hosted mode, privacy-compliant).
- Dependency Scanning: Dependabot + npm audit.

## 6. Testing Strategy
- Unit: Vitest (Fast, parallel).
- Component: React Native Testing Library.
- E2E: Maestro (YAML-based, easiest for RN flows, handles animations well).

## 7. Deployment Pipeline
- Preview: EAS Update for OTA (Over-the-Air) patches on every PR merge.
- Staging: TestFlight / Internal Play Store track.
- Production: Phased rollout (10% -> 50% -> 100%).
