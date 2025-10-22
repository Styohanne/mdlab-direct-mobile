import { ThemedText } from '@/components/themed-text';
import { Appointment, useAppointmentStore } from '@/utils/appointments';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Alert,
  Modal, Platform, SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const TEST_OPTIONS = [
  { 
    name: 'Urinalysis', 
    recommendedTime: 'morning',
    note: 'Best taken in the morning for accurate results',
    price: 200,
    description: 'Complete Urine Examination'
  },
  { 
    name: 'X-Ray Chest (PA)', 
    recommendedTime: 'any',
    note: 'Can be done any time of day',
    price: 600,
    description: 'Posterior-Anterior Chest X-Ray'
  },
  { 
    name: 'Fasting Blood Sugar', 
    recommendedTime: 'morning',
    note: 'Must be taken while fasting for 8-12 hours',
    price: 150,
    description: 'FBS Test'
  },
  { 
    name: 'Lipid Profile', 
    recommendedTime: 'morning',
    note: 'Must be taken while fasting for 8-12 hours',
    price: 450,
    description: 'Complete Cholesterol Panel'
  },
  { 
    name: 'Complete Blood Count', 
    recommendedTime: 'any',
    note: 'Can be done any time of day',
    price: 350,
    description: 'CBC Test'
  }
];

const TIME_SLOTS = [
  { id: 'morning', label: '7:00 AM - 10:00 AM (Morning - Fasting Tests)' },
  { id: 'afternoon', label: '1:00 PM - 4:00 PM (Afternoon - After Lunch)' }
];

const LAB_LOCATIONS = [
  {
    id: 'main',
    name: 'MDLAB Direct - Main Branch',
    address: '123 Main Street, City',
    availableTests: ['Urinalysis', 'X-Ray Chest (PA)', 'Fasting Blood Sugar', 'Lipid Profile', 'Complete Blood Count']
  },
  {
    id: 'north',
    name: 'MDLAB Direct - North Branch',
    address: '456 North Ave, City',
    availableTests: ['Urinalysis', 'Fasting Blood Sugar', 'Complete Blood Count']
  },
  {
    id: 'south',
    name: 'MDLAB Direct - South Branch',
    address: '789 South Road, City',
    availableTests: ['Urinalysis', 'X-Ray Chest (PA)', 'Lipid Profile', 'Complete Blood Count']
  }
];

export default function AppointmentsScreen() {
  const { appointments, addAppointment, rescheduleAppointment, cancelAppointment } =
    useAppointmentStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedTest, setSelectedTest] = useState('Blood Test');
  const [selectedLocation, setSelectedLocation] = useState(LAB_LOCATIONS[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTestOptions, setShowTestOptions] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const handleBookAppointment = () => {
    if (!selectedLocation.availableTests.includes(selectedTest)) {
      Alert.alert(
        'Cannot Book Appointment',
        'The selected test is not available at this location.',
        [{ text: 'OK' }]
      );
      return;
    }

    addAppointment({
      testName: selectedTest,
      date: selectedDate,
      status: 'upcoming',
      location: selectedLocation.name
    });
    setIsBookingModalVisible(false);
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(appointment.date);
    setIsModalVisible(true);
  };

  const confirmReschedule = () => {
    if (selectedAppointment) {
      rescheduleAppointment(selectedAppointment.id, selectedDate);
      setIsModalVisible(false);
    }
  };

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleTestSelect = (test: typeof TEST_OPTIONS[0]) => {
    setSelectedTest(test.name);
    setShowTestOptions(false);
    
    // Only update time slot if test requires morning
    if (test.recommendedTime === 'morning') {
      setSelectedTimeSlot(TIME_SLOTS[0]);
    }
  };

  const handleLocationSelect = (location: typeof LAB_LOCATIONS[0]) => {
    setSelectedLocation(location);
    setShowLocations(false);
    
    // Check if selected test is available at this location
    if (!location.availableTests.includes(selectedTest)) {
      Alert.alert(
        'Test Not Available',
        `${selectedTest} is not available at ${location.name}. Please select another test or location.`,
        [{ text: 'OK' }]
      );
    }
  };

  const renderAppointmentCard = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <ThemedText style={styles.testName}>{appointment.testName}</ThemedText>
        <View style={[
          styles.statusBadge,
          { backgroundColor: appointment.status === 'upcoming' ? '#21AEA8' : '#718096' }
        ]}>
          <ThemedText style={styles.statusText}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#718096" />
          <ThemedText style={styles.detailText}>
            {appointment.date.toLocaleDateString()}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color="#718096" />
          <ThemedText style={styles.detailText}>{appointment.location}</ThemedText>
        </View>
      </View>

      {appointment.status === 'upcoming' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => handleReschedule(appointment)}
          >
            <Ionicons name="calendar" size={16} color="#21AEA8" />
            <ThemedText style={styles.rescheduleText}>Reschedule</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleCancel(appointment.id)}
          >
            <Ionicons name="close-circle" size={16} color="#E53E3E" />
            <ThemedText style={styles.cancelText}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>My Appointments</ThemedText>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setIsBookingModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <ThemedText style={styles.bookButtonText}>Book New</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Upcoming Appointments</ThemedText>
          {appointments.filter(apt => apt.status === 'upcoming').length === 0 ? (
            <ThemedText style={styles.emptyStateText}>
              No upcoming appointments. Book one to get started!
            </ThemedText>
          ) : (
            appointments
              .filter(apt => apt.status === 'upcoming')
              .map(renderAppointmentCard)
          )}
        </View>

        <View style={[styles.section, styles.pastAppointmentsSection]}>
          <ThemedText style={styles.sectionTitle}>Past Appointments</ThemedText>
          {appointments.filter(apt => apt.status !== 'upcoming').length === 0 ? (
            <ThemedText style={styles.emptyStateText}>
              No past appointments. Book one to get started!
            </ThemedText>
          ) : (
            <View style={styles.pastAppointmentsContainer}>
              {appointments
                .filter(apt => apt.status !== 'upcoming')
                .map(renderAppointmentCard)}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBookingModalVisible}
        onRequestClose={() => setIsBookingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Book New Appointment</ThemedText>
            
            {/* Test Selection */}
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Select Test</ThemedText>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowTestOptions(true)}
              >
                <ThemedText style={styles.selectedValueText}>{selectedTest}</ThemedText>
                <Ionicons name="chevron-down" size={20} color="#1A202C" />
              </TouchableOpacity>
            </View>

            {/* Date Selection */}
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Select Date</ThemedText>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowDatePicker(true)}
              >
                <ThemedText style={styles.selectedValueText}>{selectedDate.toLocaleDateString()}</ThemedText>
                <Ionicons name="calendar" size={20} color="#1A202C" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Time Slot Selection */}
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Select Time Slot</ThemedText>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowTimeSlots(true)}
              >
                <ThemedText style={styles.selectedValueText}>{selectedTimeSlot.label}</ThemedText>
                <Ionicons name="chevron-down" size={20} color="#1A202C" />
              </TouchableOpacity>
              
              {/* Add this recommendation section */}
              <View style={styles.recommendationContainer}>
                <View style={styles.recommendationLine} />
                <ThemedText style={styles.recommendationText}>
                  {TEST_OPTIONS.find(test => test.name === selectedTest)?.note || 'Select a test to see recommendations'}
                </ThemedText>
              </View>
            </View>

            {/* Location Selection */}
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Select Laboratory</ThemedText>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowLocations(true)}
              >
                <View>
                  <ThemedText style={styles.selectedValueText}>{selectedLocation.name}</ThemedText>
                  <ThemedText style={styles.addressText}>{selectedLocation.address}</ThemedText>
                </View>
                <Ionicons name="chevron-down" size={20} color="#1A202C" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsBookingModalVisible(false)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleBookAppointment}
              >
                <ThemedText style={styles.confirmButtonText}>Book</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Test Options Modal */}
      <Modal
        visible={showTestOptions}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Select Test</ThemedText>
            <ScrollView style={styles.optionsList}>
              {TEST_OPTIONS.map((test) => (
                <TouchableOpacity
                  key={test.name}
                  style={styles.optionItem}
                  onPress={() => handleTestSelect(test)}
                >
                  <View style={styles.testOptionHeader}>
                    <ThemedText style={styles.optionText}>{test.name}</ThemedText>
                    <ThemedText style={styles.priceText}>₱{test.price}</ThemedText>
                  </View>
                  <ThemedText style={styles.optionDescription}>{test.description}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowTestOptions(false)}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Slots Modal */}
      <Modal
        visible={showTimeSlots}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Select Time Slot</ThemedText>
            <ScrollView style={styles.optionsList}>
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={styles.optionItem}
                  onPress={() => {
                    setSelectedTimeSlot(slot);
                    setShowTimeSlots(false);
                  }}
                >
                  <ThemedText style={styles.optionText}>{slot.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowTimeSlots(false)}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal
        visible={showLocations}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Select Laboratory</ThemedText>
            <ScrollView style={styles.optionsList}>
              {LAB_LOCATIONS.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.locationItem}
                  onPress={() => handleLocationSelect(location)}
                >
                  <ThemedText style={styles.locationName}>{location.name}</ThemedText>
                  <ThemedText style={styles.locationAddress}>{location.address}</ThemedText>
                  <View style={styles.availableTests}>
                    <ThemedText style={styles.availableTestsLabel}>Available Tests:</ThemedText>
                    <ThemedText style={styles.availableTestsList}>
                      {location.availableTests.join(', ')}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowLocations(false)}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Reschedule Appointment</ThemedText>
            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowDatePicker(true)}
              >
                <ThemedText style={styles.selectedValueText}>
                  {selectedDate.toLocaleDateString()}
                </ThemedText>
                <Ionicons name="calendar" size={20} color="#1A202C" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  themeVariant="light"
                  textColor="#1A202C"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
              )}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmReschedule}
              >
                <ThemedText style={styles.confirmButtonText}>Confirm</ThemedText>
              </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C', // Darker header title
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21AEA8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1A202C', // Darker section title
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C', // Darker test name color
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  appointmentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#4A5568', // Darker detail text
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  rescheduleButton: {
    backgroundColor: '#E6FFFD',
  },
  cancelButton: {
    backgroundColor: '#FFF5F5',
  },
  rescheduleText: {
    color: '#21AEA8',
    fontSize: 14,
  },
  cancelText: {
    color: '#E53E3E',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A202C', // Darker title color
  },
  formGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C', // Darker label color
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    backgroundColor: '#F7FAFC', // Light background for contrast
  },
  selectedValueText: {
    fontSize: 16,
    color: '#1A202C', // Dark, visible text color
    fontWeight: '500',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    marginTop: 8,
    width: '100%',
    maxHeight: 200,
    borderColor: '#CBD5E0',
    borderWidth: 1,
  },
  optionButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#EDF2F7',
  },
  selectedOption: {
    backgroundColor: '#E6FFFD',
  },
  optionText: {
    fontSize: 16,
    color: '#1A202C', // Darker text color
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalCancelButton: {
    backgroundColor: '#EDF2F7',
  },
  confirmButton: {
    backgroundColor: '#21AEA8',
  },
  cancelButtonText: {
    color: '#2D3748', // Darker cancel button text
    fontSize: 14,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  datePickerContainer: {
    width: '100%',
    marginBottom: 16,
  },
  optionsList: {
    width: '100%',
    maxHeight: 300,
    backgroundColor: '#FFFFFF',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0', // Darker border
    backgroundColor: '#FFFFFF',
  },
  testOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
  },
  priceText: {
    fontSize: 16,
    color: '#21AEA8',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#4A5568', // Darker address text
    marginTop: 4,
  },
  locationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    backgroundColor: '#FFFFFF',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A202C',
  },
  locationAddress: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
  },
  availableTests: {
    marginTop: 8,
  },
  availableTestsLabel: {
    fontSize: 12,
    color: '#718096',
  },
  availableTestsList: {
    fontSize: 14,
    color: '#1A202C',
    marginTop: 4,
  },
  emptyStateText: {
    color: '#718096',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  pastAppointmentsSection: {
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    margin: 16,
    marginTop: 0,
  },
  pastAppointmentsContainer: {
    padding: 8,
  },
  recommendationContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  recommendationLine: {
    width: 4,
    height: '100%',
    backgroundColor: '#21AEA8',
    borderRadius: 2,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
});
