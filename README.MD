
# Binaural Beats Audio App

Checkout the White Paper of Project here: https://winglonelion.github.io/binaural-beats-audio-app/

## Overview
The Binaural Beats Audio App is designed to help users relax, focus, and meditate by providing a variety of binaural beats audio tracks. These tracks are scientifically proven to influence brainwave activity and promote mental well-being.

## Features
- **Streaming Audio with Range Header Support**: The app supports audio streaming with `Range` headers, allowing for optimized bandwidth usage and reducing load on the server by fetching only the necessary parts of the audio file.
- **Offline and Background Playback**: Users can download audio tracks for offline use and continue playing them even in the background, ensuring a seamless listening experience.
- **Engaging User Interface**: The app features a user-friendly design with smooth micro-interactions and delightful animations powered by **Reanimated 3** and **Rive**, delivering an exceptional user experience.
- **Powerful Analytics System**: A robust analytics system is implemented to track user interactions. It is highly extensible and compatible with various third-party analytics platforms, such as Firebase Analytics.
- **Well-Designed Architecture**: The app's architecture is modular, making it easy to extend and replace components without affecting the overall system.


## Frontend Setup

The frontend for this app is built using React Native. To set it up:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Winglonelion/binaural-beats-audio-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd binaural-beats-audio-app
   ```

3. **Install dependencies**:
   ```bash
   yarn install
   yarn pod
   ```

4. **Run the dev server of application**:
   ```bash
   yarn start
   ```
5. **Run the application on iOS**
   ```bash
   yarn ios
   ```


## Backend Setup

The backend for this project is implemented using Go. And already deployed in Railway at: https://binaural-beats-audio-services-production.up.railway.app/

So, it could be easy to skip Backend setup on the case want focus on frontend only.



On the case testing with self-build Backend, follow these steps to set up and run the backend:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Winglonelion/binaural-beats-audio-services.git
   ```

1. **Navigate to the backend directory**:
   ```bash
   cd binaural-beats-audio-services
   ```

1.  **Quick start backend with Docker**
      > Ensure your docker engine is running
      ```bash
      docker-compose up -d
      ```

   ---
   **Or run GO server direct in your machine**

1. **Navigate to the backend directory**:
   ```bash
   cd binaural-beats-audio-services
   ```
1. **Install Go**:
   Ensure you have Go installed on your machine. You can download it from [https://golang.org/dl/](https://golang.org/dl/).



1. **Install dependencies**:
   ```bash
   go mod tidy
   ```

1. **Run the server**:
   ```bash
   go run main.go
   ```

## **API Endpoint**:
   The backend serves audio files through the following endpoint:
   - `GET /api/audio` - Returns a list of available audio files.
   - `GET /api/audio/{file_name}` - Streams the selected audio file.
   - `GET /api/download/{file_name}` - Download selected audio file.

   Replace `localhost` and port in the frontend app with the backend's actual URL.

For more details about the backend structure and configuration, refer to the [Backend README](backend/README.md).

## Testing

To test the functionality:
1. Open the app.
2. Choose an audio file to play.
3. Adjust the volume and observe the frequency visualizer.

## Checklist
- [x] Well structured codebase
- [x] Auto Linting and formatter setuped with strong rules/conventions.
- [x] Code optimized performance with technicals like FlashList, memorization, Reanimated, Rive
- [x] Apply Singleton, Factory and Provider design patterns
- [x] Player UI with play/pause button
- [x] Volume slide
- [x] Progress slider 🚀
- [x] Animation when playing
- [x] Error handling & loading states
- [x] Background audio playback
- [x] Audio frequence visualizer
- [x] Full featured Offline mode
- [x] Basic analytics implementation
- [x] Deployed BE to Render
- [x] Basic unit testing
