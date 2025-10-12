import { ThemedText } from '@/components/themed-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    gender: 'Not provided',
    dateOfBirth: 'Not provided',
    address: 'Not provided'
  });
  const [editingField, setEditingField] = useState<'gender' | 'dateOfBirth' | 'address' | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLogout = () => {
    router.replace('/(tabs)');
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFieldEdit = (field: 'gender' | 'dateOfBirth' | 'address') => {
    setEditingField(field);
    setTempValue(profile[field]);
    if (field === 'dateOfBirth') {
      setShowDatePicker(true);
    }
  };

  const handleSave = () => {
    if (editingField) {
      setProfile(prev => ({
        ...prev,
        [editingField]: tempValue
      }));
    }
    setEditingField(null);
    setTempValue('');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTempValue(selectedDate.toLocaleDateString());
    }
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
            <TouchableOpacity 
              style={[
                styles.editButton,
                isEditing && { backgroundColor: '#E53E3E' } // Red background when editing
              ]}
              onPress={handleEdit}
            >
              <ThemedText style={styles.editButtonText}>
                {isEditing ? 'Cancel' : 'Edit'}
              </ThemedText>
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
                  <TouchableOpacity 
                    onPress={() => isEditing && handleFieldEdit('gender')}
                    style={isEditing ? styles.editableField : undefined}
                  >
                    <ThemedText style={styles.detailValue}>{profile.gender}</ThemedText>
                  </TouchableOpacity>
                </View>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>DATE OF BIRTH</ThemedText>
                  <TouchableOpacity 
                    onPress={() => isEditing && handleFieldEdit('dateOfBirth')}
                    style={isEditing ? styles.editableField : undefined}
                  >
                    <ThemedText style={styles.detailValue}>{profile.dateOfBirth}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailColumn}>
                  <ThemedText style={styles.detailLabel}>ADDRESS</ThemedText>
                  <TouchableOpacity 
                    onPress={() => isEditing && handleFieldEdit('address')}
                    style={isEditing ? styles.editableField : undefined}
                  >
                    <ThemedText style={styles.detailValue}>{profile.address}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add the Edit Modal */}
      <Modal
        visible={editingField !== null}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>
              Edit {editingField?.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </ThemedText>
            
            {editingField === 'gender' ? (
              <View style={styles.optionsList}>
                {['Male', 'Female', 'Other', 'Prefer not to say'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionItem,
                      tempValue === option && styles.selectedOption
                    ]}
                    onPress={() => {
                      setTempValue(option);
                      setProfile(prev => ({
                        ...prev,
                        gender: option
                      }));
                      setEditingField(null);
                    }}
                  >
                    <ThemedText 
                      style={[
                        styles.optionText,
                        tempValue === option && styles.selectedOptionText
                      ]}
                    >
                      {option}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            ) : editingField === 'dateOfBirth' ? (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            ) : (
              <TextInput
                style={styles.input}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder="Enter your address"
                multiline
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditingField(null)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              {editingField !== 'gender' && (
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
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
  editableField: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  optionsList: {
    width: '100%',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  optionText: {
    fontSize: 16,
    color: '#2D3748',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#21AEA8',
  },
  cancelButton: {
    backgroundColor: '#EDF2F7',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#4A5568',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2D3748',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  selectedOption: {
    backgroundColor: '#E6FFFD',
    borderColor: '#21AEA8',
  },
  selectedOptionText: {
    color: '#21AEA8',
    fontWeight: '600',
  },
});
