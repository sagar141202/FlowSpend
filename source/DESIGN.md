# FlowSpend: Design System & UI Specification

## 1. Visual Inspiration (The "Canva" Vibe)
Reference these aesthetics during implementation:
- Primary Ref: Linear App (for smoothness) + Canva (for color/playfulness).
- Color Palette: 
  - Background: Off-White (#FAFAFA) or Deep Charcoal (#121212) for Dark Mode.
  - Primary Accent: Electric Indigo (#6366F1) to Soft Lavender (#A5B4FC) gradient.
  - Success: Mint Green (#34D399).
  - Alert: Coral Pink (#FB7185) (Softer than red).
- Typography: Plus Jakarta Sans (Geometric, friendly, modern).
- Shape Language: Border-radius: 24px for cards, 16px for buttons. No sharp edges.

## 2. Component Inventory
- The "Flow" Card: The main transaction item. Swipes left to delete, right to edit. Features a subtle glassmorphism effect.
- Magic Button: A floating action button (FAB) with a glowing gradient ring. On press, it expands into a camera viewfinder with a scanning laser animation.
- River Chart: A custom SVG path animation that flows like water to represent daily spending, replacing static bar charts.
- Category Pills: Soft, pastel-colored badges with rounded icons (e.g., Burger for Food, Plane for Travel).
- Confetti Success: When a budget goal is met, trigger a lightweight Lottie confetti explosion.

## 3. Interaction & Motion Guidelines
- Transitions: All screen changes use SharedElementTransition (e.g., the tapped card expands to become the detail view).
- Haptics: 
  - Light impact on button press.
  - Success notification on save.
  - Warning pulse on budget breach.
- Loading States: No spinners. Use "Skeleton Shimmers" that match the layout exactly.
- Gestures: 
  - Pull down to refresh (with a satisfying snap).
  - Long press on chart to see exact values (haptic tick).

## 4. Accessibility (WCAG AA+)
- Contrast ratios checked for pastel colors against white/dark backgrounds.
- Dynamic Type support (text scales with system settings).
- VoiceOver labels for all chart data points ("Spent 50 dollars on food").

## 5. Wireframe Flow
1. Splash: Logo fade-in + gradient mesh background.
2. Home: "Good Morning, Sagar" + River Chart + Recent List.
3. Scan: Camera overlay with auto-detect bounding box animation.
4. Review: Editable card with "Swipe to Save" gesture.
5. Insights: Full-screen interactive data story.
