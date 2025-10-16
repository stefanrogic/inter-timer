#!/bin/bash

echo "Building Android APK from VS Code..."

export ANDROID_HOME=/home/duvendir/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

cd /home/duvendir/Documents/Projects/Code/interval-timer/react-native-app

echo "Step 1: Installing dependencies..."
flatpak-spawn --host npm install

echo "Step 2: Generating Android project files..."
flatpak-spawn --host npx expo prebuild --clean --platform android

echo "Step 3: Setting SDK location..."
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

echo "Step 4: Building debug APK..."
cd android
chmod +x ./gradlew
flatpak-spawn --host env ANDROID_HOME=/home/duvendir/Android/Sdk ./gradlew assembleDebug

echo ""
echo "✅ Done! APK location:"
echo "$(pwd)/app/build/outputs/apk/debug/app-debug.apk"
