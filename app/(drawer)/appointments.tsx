import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function AppointmentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>My Appointments</ThemedText>
          <ThemedText style={styles.headerSubtitle}>View and manage your appointments</ThemedText>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Upcoming Appointments</ThemedText>
          
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentIcon}>
                <Ionicons name="calendar" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.appointmentInfo}>
                <ThemedText style={styles.appointmentTitle}>Blood Test</ThemedText>
                <ThemedText style={styles.appointmentDate}>October 15, 2025 - 10:00 AM</ThemedText>
                <ThemedText style={styles.appointmentLocation}>MDLAB Central Branch</ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.appointmentButton}>
              <ThemedText style={styles.appointmentButtonText}>View Details</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentIcon}>
                <Ionicons name="calendar" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.appointmentInfo}>
                <ThemedText style={styles.appointmentTitle}>X-Ray</ThemedText>
                <ThemedText style={styles.appointmentDate}>October 20, 2025 - 2:00 PM</ThemedText>
                <ThemedText style={styles.appointmentLocation}>MDLAB North Branch</ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.appointmentButton}>
              <ThemedText style={styles.appointmentButtonText}>View Details</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Past Appointments */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Past Appointments</ThemedText>
          
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={[styles.appointmentIcon, styles.completedIcon]}>
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.appointmentInfo}>
                <ThemedText style={styles.appointmentTitle}>Complete Blood Count</ThemedText>
                <ThemedText style={styles.appointmentDate}>September 2, 2025</ThemedText>
                <ThemedText style={styles.completedText}>Completed</ThemedText>
              </View>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  appointmentCard: {
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
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  appointmentIcon: {
    backgroundColor: '#21AEA8',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: '#48BB78',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 2,
  },
  appointmentLocation: {
    fontSize: 13,
    color: '#A0AEC0',
  },
  appointmentButton: {
    backgroundColor: '#21AEA8',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  appointmentButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completedText: {
    fontSize: 13,
    color: '#48BB78',
    fontWeight: '600',
  },
});
