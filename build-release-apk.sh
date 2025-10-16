#!/bin/bash

echo "Building Release APK with bundled JavaScript..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Step 1: Install dependencies
echo "Step 1: Installing dependencies..."
flatpak-spawn --host /usr/bin/node /usr/bin/npm install

# Step 2: Generate Android project files (Android only)
echo "Step 2: Generating Android project files..."
flatpak-spawn --host /usr/bin/node /usr/bin/npx expo prebuild --platform android --clean

# Step 3: Set SDK location
echo "Step 3: Setting SDK location..."
echo "sdk.dir=/home/duvendir/Android/Sdk" > android/local.properties

# Step 4: Create assets directory
echo "Step 4: Creating assets directory..."
mkdir -p android/app/src/main/assets

# Step 5: Bundle JavaScript and assets
echo "Step 5: Bundling JavaScript and assets..."
export ANDROID_HOME=/home/duvendir/Android/Sdk
flatpak-spawn --host /usr/bin/node /usr/bin/npx expo export:embed \
  --platform android \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res

# Step 6: Building release APK
echo "Step 6: Building release APK..."
cd android
flatpak-spawn --host ./gradlew assembleRelease
cd ..

echo ""
echo "✅ Done! APK location:"
echo "/home/duvendir/Documents/Projects/Code/interval-timer/react-native-app/android/app/build/outputs/apk/release/app-release-unsigned.apk"
