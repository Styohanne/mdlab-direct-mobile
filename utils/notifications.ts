import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications should be handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  } as Notifications.NotificationBehavior),
});

/**
 * Request notification permissions from the user
 */
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#21AEA8',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Failed to get push notification permissions!');
    return;
  }

  return finalStatus;
}

/**
 * Schedule a notification for new test results
 */
export async function scheduleResultNotification(testName: string, resultDate: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🧪 Test Results Ready!',
      body: `Your ${testName} results are now available. Tap to view and download.`,
      data: { 
        type: 'result',
        testName,
        resultDate,
        screen: '/(drawer)/results'
      },
      sound: true,
    },
    trigger: null, // Show immediately (or use a specific time)
  });
}

/**
 * Schedule a notification for payment reminder
 */
export async function schedulePaymentNotification(amount: number, dueDate: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💰 Payment Reminder',
      body: `You have a pending balance of ₱${amount.toFixed(2)}. Please pay at MDLAB office (walk-in only).`,
      data: { 
        type: 'payment',
        amount,
        dueDate,
        screen: '/(drawer)/payments'
      },
      sound: true,
    },
    trigger: null, // Show immediately
  });
}

/**
 * Schedule a notification for payment confirmation
 */
export async function schedulePaymentConfirmationNotification(amount: number, receiptNumber: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✅ Payment Received',
      body: `Payment of ₱${amount.toFixed(2)} has been confirmed. Receipt #${receiptNumber} is now available.`,
      data: { 
        type: 'payment_confirmation',
        amount,
        receiptNumber,
        screen: '/(drawer)/payments'
      },
      sound: true,
    },
    trigger: null,
  });
}

/**
 * Schedule a notification for appointment reminder
 */
export async function scheduleAppointmentReminder(testName: string, appointmentDate: string, location: string) {
  // Calculate trigger time (e.g., 1 day before appointment)
  const appointmentTime = new Date(appointmentDate);
  const reminderTime = new Date(appointmentTime);
  reminderTime.setDate(reminderTime.getDate() - 1);
  reminderTime.setHours(9, 0, 0, 0); // 9 AM the day before

  const now = new Date();
  const secondsUntilReminder = Math.max(0, Math.floor((reminderTime.getTime() - now.getTime()) / 1000));

  if (secondsUntilReminder > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📅 Appointment Reminder',
        body: `Your ${testName} appointment is tomorrow at ${location}.`,
        data: { 
          type: 'appointment',
          testName,
          appointmentDate,
          location,
          screen: '/(drawer)/appointments'
        },
        sound: true,
      },
      trigger: { seconds: secondsUntilReminder } as Notifications.NotificationTriggerInput,
    });
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Get all scheduled notifications
 */
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * Add a notification listener for when notifications are received
 */
export function addNotificationReceivedListener(callback: (notification: Notifications.Notification) => void) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Add a notification response listener for when user taps on notification
 */
export function addNotificationResponseReceivedListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}
