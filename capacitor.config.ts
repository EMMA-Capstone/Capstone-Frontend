import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capstonecompostbin.app',
  appName: 'Smart Compost',
  webDir: 'public',
  server: {
    url: "https://capstone.asoatram.dev",
    cleartext: true
  }
};

export default config;
