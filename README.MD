# Binaural Beats Audio App

## 🚀 Overview

The **Binaural Beats Audio App** is a React Native-based application designed to provide users with a relaxing, focused, and meditative experience through binaural beats. This project is part of a technical challenge to showcase full-stack mobile development skills.

---

## 🎯 Challenge Objectives

### Frontend

- Write clean, efficient, and maintainable React Native code.
- Create a simple UI with the following:
  - **Play/Pause button**.
  - **Volume slider**.
  - **Simple animations** when audio is playing.
- **Error Handling**: Manage loading and error states effectively.
- **Bonus**:
  - Support background audio playback.

### Backend

- Build an API endpoint to serve audio files.
- Implement basic error handling for the API.
- **Bonus**:
  - Add audio streaming capabilities for better performance.

---

## 🛠️ Features Implemented

### Frontend

- **Play/Pause Button**: Toggle audio playback seamlessly.
- **Volume Slider**: Adjust volume dynamically.
- **Frequency Visualizer** (Bonus): Display a simulated frequency spectrum while playing audio.
- **Error Handling**: Inform users of errors with clear messages.
- **Animations**: Smooth transitions for volume and visualizer components.
- **Offline Mode** (Bonus): Allow users to save and play audio offline.

### Backend

- **API Endpoint**:
  - Serve audio metadata.
  - Provide audio files for playback.
- **Error Handling**: Return specific error messages for missing files or other issues.
- **Audio Streaming** (Bonus): Optimize playback with streaming.

### Bonus Implementations

- **Analytics Tracking**: Capture user interactions and events.
- **Unit Tests**: Ensure the quality of the code with comprehensive test cases.

---

## 💻 Installation & Setup

### Prerequisites

- Node.js >= 18.0
- Yarn (or npm)
- Expo CLI
- A simple backend server to run the API

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/binaural_beats_audio_app.git
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the application:
   ```bash
   yarn start
   ```

### Backend Setup

1. Start the backend server:
   ```bash
   node server.js
   ```
2. The backend will run at `http://localhost:8080/api`.

---

## 🎬 Usage Guide

1. **Open the App**: Explore the user-friendly interface.
2. **Select a Track**: Tap the Play button to start the binaural beats.
3. **Adjust Volume**: Use the slider to control audio levels.
4. **Frequency Visualizer**: Watch dynamic frequency visualizations.
5. **Offline Playback**: Save tracks to play them without an internet connection.

---

## 🧩 Technical Highlights

- **Audio Processing**: Used Expo AV module for seamless audio playback.
- **Error Handling**: Clear user feedback when:
  - API fails to respond.
  - Playback encounters issues.
- **Scalability**: Backend is ready to handle thousands of users with audio streaming.
- **Cross-Platform Performance**: Ensures smooth operation on both Android and iOS.
- **Frequency Visualization**: Built with Skia for high-performance rendering.

---

## ✅ Checklist of Completed Features

- [x] **Play/Pause Button** working as expected.
- [x] **Volume Slider** dynamically adjusts audio.
- [x] **Frequency Visualizer** displays simulated spectrum.
- [x] **Error Handling** notifies users of issues.
- [ ] **Offline Mode** enables playback without internet.
- [x] **Audio Streaming** optimizes playback from the backend.
- [ ] **Background Playback** works seamlessly when switching apps.
- [x] **Testing** ensures code quality with test cases.
- [x] **Analytics** tracks user events and actions.

---

## 🧪 Testing Approach

- **Unit Tests**:
  - Validate basic React Native components.
  - Ensure the API returns correct data.
- **Integration Tests**:
  - Test the complete audio playback flow (Play, Pause, Volume).
- **Manual Testing**:
  - Verified functionality across multiple devices.

---

## 🤔 Challenges & Considerations

1. **Audio Processing**:
   - Efficiently handle audio streaming.
   - Use simulated FFT data for the frequency visualizer.
2. **Scalability**:
   - Backend prepared for handling thousands of concurrent users.
3. **Mobile Challenges**:
   - Manage background audio states.
   - Optimize animations for mobile performance.

---

## 📞 Contact

For any questions or feedback, please contact us at **support@binauralbeatsapp.com**.

---
