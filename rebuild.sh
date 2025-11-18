#!/bin/bash

echo "=== Building Next.js ==="
npm run build || exit 1

echo "=== Syncing Capacitor ==="
npx cap sync android || exit 1

echo "=== Opening Android Studio ==="
npx cap open android
