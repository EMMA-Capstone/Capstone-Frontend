import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

import Cookies from 'js-cookie';

export async function registerPush() {
  try {
    // Ask permission (Android 13+ and above)
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive !== 'granted') {
      console.warn('Push permission not granted');
      return;
    }

    // Register device for push
    await PushNotifications.register();

    // Successfully registered
    PushNotifications.addListener('registration', async (token) => {
      console.log('FCM Token:', token.value);
      console.log('Saving token to server...');
      // Send token to the server
      try {

        await saveTokenToServer(token.value);
        console.log('Token saved successfully');
      } catch (err) {
        console.error('Error saving token:', err);
      }
    });

    // Registration error
    PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error:', err.error);
    });

    // Notification received in foreground
    PushNotifications.addListener('pushNotificationReceived', async (notification) => {
      console.log('Notification received:', JSON.stringify(notification, null, 2));

      // Ensure notifications show even if data-only
      if (!notification.title && !notification.body) {
        console.warn('No title/body in notification; using fallback.');
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: notification.title || 'Notification',
            body: notification.body || 'You have a new update',
          },
        ],
      });
    });

    // User taps on notification
    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      console.log('Notification action:', action.notification);
    });
  } catch (error) {
    console.error('Error during push registration:', error);
  }
}

export async function saveTokenToServer(token: string) {
  try {
    const authToken = Cookies.get('Authorization') || '';
    const cleanedToken = authToken.startsWith('Bearer ')
      ? authToken.slice(7)
      : authToken;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cleanedToken}`,
        },
        body: JSON.stringify({ fcm: token }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to save token: ${response.status}`);
    }

    console.log('Token saved to server successfully');
  } catch (error) {
    console.error('Error saving token to server:', error);
  }
}
