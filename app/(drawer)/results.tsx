import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function ResultsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Test Results</ThemedText>
          <ThemedText style={styles.headerSubtitle}>View your latest test results</ThemedText>
        </View>

        <View style={styles.section}>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIcon}>
                <Ionicons name="flask" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.resultInfo}>
                <ThemedText style={styles.resultTitle}>Complete Blood Count (CBC)</ThemedText>
                <ThemedText style={styles.resultDate}>September 2, 2025</ThemedText>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Normal</ThemedText>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <ThemedText style={styles.viewButtonText}>View Full Report</ThemedText>
              <Ionicons name="chevron-forward" size={18} color="#21AEA8" />
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIcon}>
                <Ionicons name="medical" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.resultInfo}>
                <ThemedText style={styles.resultTitle}>Lipid Panel</ThemedText>
                <ThemedText style={styles.resultDate}>August 15, 2025</ThemedText>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Normal</ThemedText>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <ThemedText style={styles.viewButtonText}>View Full Report</ThemedText>
              <Ionicons name="chevron-forward" size={18} color="#21AEA8" />
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIcon}>
                <Ionicons name="water" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.resultInfo}>
                <ThemedText style={styles.resultTitle}>Blood Glucose</ThemedText>
                <ThemedText style={styles.resultDate}>July 28, 2025</ThemedText>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Normal</ThemedText>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <ThemedText style={styles.viewButtonText}>View Full Report</ThemedText>
              <Ionicons name="chevron-forward" size={18} color="#21AEA8" />
            </TouchableOpacity>
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
  },
  resultCard: {
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
  resultHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  resultIcon: {
    backgroundColor: '#21AEA8',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  resultDate: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#C6F6D5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#22543D',
    fontSize: 12,
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  viewButtonText: {
    color: '#21AEA8',
    fontSize: 14,
    fontWeight: '600',
  },
});
