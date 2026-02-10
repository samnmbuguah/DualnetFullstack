# Project Plan: BTC Spot/Forward(perpetual futures) Mobile App

## 1. Project Overview

Build a cross-platform mobile application (Android & iOS) using React Native to track BTC Spot and BTC Forward investments. The app will prioritize security (client-side API key encryption) and provide a rich user interface for visualizing investment data.

## 2. Communication & Requirements (Current Phase)

- [ ] **Reply to Client**: Explain the benefits of a dedicated mobile app over a WhatsApp bot (Security, UI capabilities).
- [ ] **Gather Logic**: Obtain the specific mathematical logic for BTC Spot and BTC Forward calculations from Werner.
- [ ] **Define Features**:
  - Input API Keys (stored locally/encrypted).
  - Dashboard: Total Investment, Current Profit, APR (projected w/ compounding).
  - Real-time data fetching (Exchange APIs).

## 3. Technology Stack

- **Framework**: React Native (via Expo) for cross-platform compatibility (iOS/Android) using a single codebase.
- **State Management**: React Context or Zustand.
- **Storage**: Secure Store (for API keys).
- **Styling**: NativeWind (Tailwind CSS) or StyleSheet.

## 4. Implementation Steps

### Phase 1: Setup & Prototyping

- [ ] Initialize React Native project.
- [ ] Create a "Hello World" build to verify Android/iOS compatibility.
- [ ] Design a high-fidelity mockup of the Dashboard (Investment, Profit, APR).

### Phase 2: Core Logic & Security

- [ ] Implement secure storage for API keys.
- [ ] Implement the "BTC Spot/Forward" calculation logic (once provided).
- [ ] Connect to necessary Exchange APIs (read-only permissions recommended).

### Phase 3: UI/UX Development

- [ ] Build the Dashboard screen.
- [ ] Add charts/graphs for performance visualization (better than text-based WhatsApp).
- [ ] Implement settings for API key management.

### Phase 4: Testing & Delivery

- [ ] Test on Android Emulator and iOS Simulator.
- [ ] Build APK/IPA for client testing.
- [ ] Deployment assistance.
