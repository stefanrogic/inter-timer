#!/bin/bash

echo "Building standalone APK with Expo..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Step 1: Install dependencies
echo "Step 1: Installing dependencies..."
flatpak-spawn --host /usr/bin/node /usr/bin/npm install

# Step 2: Build standalone APK using Expo
echo "Step 2: Building APK..."
export ANDROID_HOME=/home/duvendir/Android/Sdk
export NODE_ENV=production
flatpak-spawn --host /usr/bin/node /usr/bin/npx expo run:android --variant release --no-bundler

echo ""
echo "✅ Done! APK location:"
echo "/home/duvendir/Documents/Projects/Code/interval-timer/react-native-app/android/app/build/outputs/apk/release/app-release.apk"
