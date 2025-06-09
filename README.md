# KaizenApp

## Download for android (available until 2025-06-21)

[Link](https://expo.dev/accounts/dvaldesg/projects/KaizenApp/builds/21883d4d-46eb-4c27-aa9a-38849490bbe9)

## Setup environment variables

1. Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your specific configuration values.

## Run the local Expo Go server

1. Install dependencies:

```bash
npm install
```

2. Start the Expo server:

```bash
npx expo start
```

If you are on Windows/Ubuntu and have an iOS device, add the `--tunnel` flag, else ignore.

```bash
npx expo start --tunnel
```

## Running on Expo Go

1. Install the Expo Go app on your device:
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code that appears in your terminal after starting the Expo server.

3. The app will load on your device through Expo Go.