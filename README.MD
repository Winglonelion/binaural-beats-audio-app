
# Binaural Beats Audio App

## Overview
The Binaural Beats Audio App is designed to help users relax, focus, and meditate by providing a variety of binaural beats audio tracks. These tracks are scientifically proven to influence brainwave activity and promote mental well-being.

## Features
- **Variety of Tracks**: Choose from a wide range of binaural beats tracks tailored for different purposes such as relaxation, focus, and meditation.
- **Customizable Sessions**: Set the duration and intensity of your listening sessions.
- **User-Friendly Interface**: Simple and intuitive design for easy navigation.
- **Offline Access**: Download tracks for offline listening.

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

The backend for this project is implemented using Go. Follow these steps to set up and run the backend:

1. **Install Go**:
   Ensure you have Go installed on your machine. You can download it from [https://golang.org/dl/](https://golang.org/dl/).

2. **Clone the repository**:
   ```bash
   git clone https://github.com/Winglonelion/binaural-beats-audio-services.git
   ```

3. **Navigate to the backend directory**:
   ```bash
   cd binaural-beats-audio-services
   ```

4. **Install dependencies**:
   ```bash
   go mod tidy
   ```

5. **Run the server**:
   ```bash
   go run main.go
   ```

6. **API Endpoint**:
   The backend serves audio files through the following endpoint:
   - `GET /api/audio` - Returns a list of available audio files.
   - `GET /api/audio/{file_name}` - Streams the selected audio file.

   Replace `localhost` and port in the frontend app with the backend's actual URL.

For more details about the backend structure and configuration, refer to the [backend README](backend/README.md).

## Testing

To test the functionality:
1. Open the app.
2. Choose an audio file to play.
3. Adjust the volume and observe the frequency visualizer.

## Contribution Guidelines

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
