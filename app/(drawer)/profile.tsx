import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>My Profile</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Manage your personal information</ThemedText>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.titleRow}>
            <View>
              <ThemedText style={styles.pageTitle}>My Profile</ThemedText>
              <ThemedText style={styles.pageSubtitle}>View and update your personal information</ThemedText>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <ThemedText style={styles.editButtonText}>Edit</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarLarge}>
                <ThemedText style={styles.avatarLargeText}>R</ThemedText>
              </View>
              <View style={styles.profileHeaderInfo}>
                <ThemedText style={styles.profileName}>Renz Ramos</ThemedText>
                <ThemedText style={styles.profileEmail}>renz09358@gmail.com</ThemedText>
                <View style={styles.roleBadge}>
                  <ThemedText style={styles.roleBadgeText}>Patient</ThemedText>
                </View>
              </View>
            </View>

            {/* Profile Details */}
            <View style={styles.profileDetails}>
              <View style={styles.detailsGrid}>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>FULL NAME</ThemedText>
                  <ThemedText style={styles.detailValue}>Renz Ramos</ThemedText>
                </View>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>EMAIL ADDRESS</ThemedText>
                  <ThemedText style={styles.detailValue}>renz09358@gmail.com</ThemedText>
                </View>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>GENDER</ThemedText>
                  <ThemedText style={styles.detailValue}>Not provided</ThemedText>
                </View>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>DATE OF BIRTH</ThemedText>
                  <ThemedText style={styles.detailValue}>Not provided</ThemedText>
                </View>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>ADDRESS</ThemedText>
                  <ThemedText style={styles.detailValue}>Not provided</ThemedText>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  editButton: {
    backgroundColor: '#21AEA8',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    backgroundColor: '#21AEA8',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatarLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarLargeText: {
    color: '#21AEA8',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileHeaderInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileDetails: {
    padding: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#21AEA8',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#2D3748',
    fontWeight: '500',
  },
});
