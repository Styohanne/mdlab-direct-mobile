import { StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { 
  registerForPushNotificationsAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener
} from '@/utils/notifications';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const notificationListener = useRef<Notifications.Subscription | undefined>(undefined);
  const responseListener = useRef<Notifications.Subscription | undefined>(undefined);

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync();

    // Listen for notifications received while app is foregrounded
    notificationListener.current = addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Listen for notification taps
    responseListener.current = addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      
      // Navigate to the appropriate screen based on notification type
      if (data.screen) {
        router.push(data.screen as any);
      }
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  const handleLogout = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Image
            source={require('@/assets/images/mdlab-navbar.png')}
            style={styles.navbarLogo}
            contentFit="contain"
          />
          <View style={styles.navbarTitle}>
            <ThemedText style={styles.navbarMainTitle}>MDLAB DIRECT</ThemedText>
            <ThemedText style={styles.navbarSubtitle}>Patient Portal</ThemedText>
          </View>
        </View>
        <View style={styles.navbarRight}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <ThemedText style={styles.avatarText}>R</ThemedText>
            </View>
            <View>
              <ThemedText style={styles.userName}>Renz Ramos</ThemedText>
              <ThemedText style={styles.userRole}>Patient</ThemedText>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Dashboard Overview</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Welcome to your health dashboard</ThemedText>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <ThemedText style={styles.welcomeTitle}>Welcome back, Renz!</ThemedText>
            <ThemedText style={styles.welcomeText}>
              Here's a quick overview of your health journey with MDLAB Direct
            </ThemedText>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>2</ThemedText>
              <ThemedText style={styles.statLabel}>Upcoming{'\n'}Appointments</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>4</ThemedText>
              <ThemedText style={styles.statLabel}>Past{'\n'}Appointments</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>6</ThemedText>
              <ThemedText style={styles.statLabel}>Total{'\n'}Appointments</ThemedText>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="calendar" size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.actionTitle}>Book Appointment</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Schedule your next lab test</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="document-text" size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.actionTitle}>View Results</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Check your latest test results</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="car" size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.actionTitle}>Mobile Lab</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Check community visit schedule</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.actionTitle}>My Profile</ThemedText>
              <ThemedText style={styles.actionSubtitle}>View your profile</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Activities</ThemedText>
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Ionicons name="flask" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>Blood Test Results Available</ThemedText>
              <ThemedText style={styles.activityDate}>September 2, 2025</ThemedText>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Ionicons name="calendar" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>Appointment Scheduled</ThemedText>
              <ThemedText style={styles.activityDate}>August 28, 2025</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5F3',
  },
  navbar: {
    backgroundColor: '#21AEA8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  navbarLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  navbarTitle: {
    justifyContent: 'center',
  },
  navbarMainTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarSubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#21AEA8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  userRole: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.9,
  },
  logoutButton: {
    padding: 6,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  welcomeCard: {
    backgroundColor: '#21AEA8',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },
  welcomeContent: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.95,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    backgroundColor: '#21AEA8',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityIcon: {
    backgroundColor: '#21AEA8',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#718096',
  },
});
