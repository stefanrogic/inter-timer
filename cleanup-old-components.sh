#!/bin/sh

# Cleanup script to remove old component files after refactoring
# Run this ONLY after verifying that the new structure works correctly!

echo "🧹 Starting cleanup of old component files..."
echo ""
echo "⚠️  WARNING: This will delete old component files."
echo "   Make sure you've tested the app and everything works!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cleanup cancelled."
    exit 1
fi

echo ""
echo "Removing old component files..."

# Remove old component files
rm -f src/components/ColorPicker.js
rm -f src/components/DesktopButtons.js
rm -f src/components/FeaturesSection.js
rm -f src/components/Footer.js
rm -f src/components/Icons.js
rm -f src/components/MobileMenuButton.js
rm -f src/components/SettingsModal.js
rm -f src/components/Sidebar.js
rm -f src/components/TimerControls.js
rm -f src/components/TimerDisplay.js
rm -f src/components/TimerLayout.js

echo "✅ Cleanup complete!"
echo ""
echo "Removed files:"
echo "  - ColorPicker.js"
echo "  - DesktopButtons.js"
echo "  - FeaturesSection.js"
echo "  - Footer.js"
echo "  - Icons.js"
echo "  - MobileMenuButton.js"
echo "  - SettingsModal.js"
echo "  - Sidebar.js"
echo "  - TimerControls.js"
echo "  - TimerDisplay.js"
echo "  - TimerLayout.js"
echo ""
echo "New organized structure is now in place! 🎉"
