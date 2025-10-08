import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function MobileLabScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Mobile Lab Service</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Mobile laboratory services in your community</ThemedText>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <ThemedText style={styles.pageTitle}>Mobile Lab Service</ThemedText>
              <ThemedText style={styles.pageSubtitle}>
                Community laboratory testing in different barangays across Nueva Vizcaya
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.checkButton}>
              <Ionicons name="calendar" size={16} color="#FFFFFF" />
              <ThemedText style={styles.checkButtonText}>Check Schedule & Location</ThemedText>
            </TouchableOpacity>
          </View>

          {/* What is Mobile Lab Service */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="medkit" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoTitle}>What is Mobile Lab Service?</ThemedText>
              <ThemedText style={styles.infoDescription}>
                Our mobile laboratory unit visits different barangays and public spaces throughout Nueva Vizcaya on scheduled days.
                Community members can come to the designated location for professional lab testing without traveling to our main facility!
              </ThemedText>
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="shield-checkmark" size={28} color="#21AEA8" />
              </View>
              <ThemedText style={styles.featureTitle}>Scheduled Community Visits</ThemedText>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="people" size={28} color="#21AEA8" />
              </View>
              <ThemedText style={styles.featureTitle}>Professional Medical Staff</ThemedText>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="add-circle" size={28} color="#21AEA8" />
              </View>
              <ThemedText style={styles.featureTitle}>Complete Lab Testing</ThemedText>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="home" size={28} color="#21AEA8" />
              </View>
              <ThemedText style={styles.featureTitle}>Covers All Nueva Vizcaya</ThemedText>
            </View>
          </View>

          {/* Mobile Lab Schedule */}
          <View style={styles.scheduleSection}>
            <ThemedText style={styles.sectionTitle}>Mobile Lab Schedule</ThemedText>
            
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleLeft}>
                <ThemedText style={styles.dayLabel}>Sunday</ThemedText>
              </View>
              <View style={styles.scheduleRight}>
                <View style={styles.scheduleBadge}>
                  <ThemedText style={styles.scheduleBadgeText}>SCHEDULED</ThemedText>
                </View>
                <ThemedText style={styles.scheduleLocation}>adasad</ThemedText>
                <ThemedText style={styles.scheduleTime}>7:30 AM - 12:00 PM</ThemedText>
                <ThemedText style={styles.scheduleAddress}>asdas, Nueva Vizcaya</ThemedText>
              </View>
            </View>
          </View>

          {/* Available Tests */}
          <View style={styles.testsSection}>
            <ThemedText style={styles.sectionTitle}>Available Tests</ThemedText>
            
            <View style={styles.testsGrid}>
              {/* Blood Tests */}
              <View style={styles.testCategory}>
                <ThemedText style={styles.categoryTitle}>Blood Tests</ThemedText>
                <View style={styles.testsList}>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Complete Blood Count (CBC)</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Blood Sugar/Glucose</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Lipid Profile</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Liver Function Tests</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Kidney Function Tests</ThemedText>
                  </View>
                </View>
              </View>

              {/* Urine Tests */}
              <View style={styles.testCategory}>
                <ThemedText style={styles.categoryTitle}>Urine Tests</ThemedText>
                <View style={styles.testsList}>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Urinalysis</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Urine Culture</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>24-Hour Urine Collection</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Pregnancy Test</ThemedText>
                  </View>
                </View>
              </View>

              {/* Other Services */}
              <View style={styles.testCategory}>
                <ThemedText style={styles.categoryTitle}>Other Services</ThemedText>
                <View style={styles.testsList}>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>ECG/EKG</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Blood Pressure Monitoring</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Wound Care</ThemedText>
                  </View>
                  <View style={styles.testItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#21AEA8" />
                    <ThemedText style={styles.testName}>Health Consultations</ThemedText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Mobile Lab Service Information */}
          <View style={styles.bottomInfoSection}>
            <ThemedText style={styles.bottomInfoTitle}>Mobile Lab Service Information</ThemedText>
            
            <View style={styles.infoItemsContainer}>
              <View style={styles.infoItem}>
                <View style={styles.infoItemIcon}>
                  <Ionicons name="call" size={24} color="#21AEA8" />
                </View>
                <View style={styles.infoItemContent}>
                  <ThemedText style={styles.infoItemTitle}>Inquiries: +63 912 345 6789</ThemedText>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoItemIcon}>
                  <Ionicons name="calendar-outline" size={24} color="#21AEA8" />
                </View>
                <View style={styles.infoItemContent}>
                  <ThemedText style={styles.infoItemTitle}>Check our weekly schedule for locations</ThemedText>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoItemIcon}>
                  <Ionicons name="time-outline" size={24} color="#21AEA8" />
                </View>
                <View style={styles.infoItemContent}>
                  <ThemedText style={styles.infoItemTitle}>Walk-in available during scheduled hours</ThemedText>
                </View>
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
  mainContent: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  checkButton: {
    backgroundColor: '#21AEA8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIconContainer: {
    backgroundColor: '#21AEA8',
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    backgroundColor: '#E6FFFA',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#21AEA8',
    textAlign: 'center',
  },
  scheduleSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#21AEA8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleLeft: {
    marginRight: 16,
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  scheduleRight: {
    flex: 1,
  },
  scheduleBadge: {
    backgroundColor: '#21AEA8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  scheduleBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  scheduleLocation: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  scheduleTime: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 2,
  },
  scheduleAddress: {
    fontSize: 13,
    color: '#A0AEC0',
  },
  testsSection: {
    marginBottom: 24,
  },
  testsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  testCategory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#21AEA8',
  },
  testsList: {
    gap: 8,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  testName: {
    fontSize: 14,
    color: '#718096',
  },
  bottomInfoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bottomInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoItemsContainer: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FFFA',
    padding: 12,
    borderRadius: 8,
  },
  infoItemIcon: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoItemContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#21AEA8',
  },
});
