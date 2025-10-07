import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function MobileLabScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Mobile Lab Schedule</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Community visit schedule for mobile laboratory</ThemedText>
        </View>

        <View style={styles.section}>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleIcon}>
                <Ionicons name="location" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.scheduleInfo}>
                <ThemedText style={styles.scheduleTitle}>Barangay San Jose</ThemedText>
                <ThemedText style={styles.scheduleDate}>October 12, 2025</ThemedText>
                <ThemedText style={styles.scheduleTime}>9:00 AM - 3:00 PM</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.scheduleLocation}>Community Health Center</ThemedText>
          </View>

          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleIcon}>
                <Ionicons name="location" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.scheduleInfo}>
                <ThemedText style={styles.scheduleTitle}>Barangay Santa Maria</ThemedText>
                <ThemedText style={styles.scheduleDate}>October 14, 2025</ThemedText>
                <ThemedText style={styles.scheduleTime}>8:00 AM - 2:00 PM</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.scheduleLocation}>Municipal Gymnasium</ThemedText>
          </View>

          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleIcon}>
                <Ionicons name="location" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.scheduleInfo}>
                <ThemedText style={styles.scheduleTitle}>Barangay Del Carmen</ThemedText>
                <ThemedText style={styles.scheduleDate}>October 16, 2025</ThemedText>
                <ThemedText style={styles.scheduleTime}>10:00 AM - 4:00 PM</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.scheduleLocation}>Barangay Hall</ThemedText>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#21AEA8" />
          <ThemedText style={styles.infoText}>
            Mobile lab visits are scheduled monthly. Please check back regularly for updates.
          </ThemedText>
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
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  scheduleIcon: {
    backgroundColor: '#21AEA8',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  scheduleDate: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 13,
    color: '#21AEA8',
    fontWeight: '600',
  },
  scheduleLocation: {
    fontSize: 13,
    color: '#A0AEC0',
    paddingLeft: 60,
  },
  infoBox: {
    backgroundColor: '#E6FFFA',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#234E52',
    lineHeight: 20,
  },
});
