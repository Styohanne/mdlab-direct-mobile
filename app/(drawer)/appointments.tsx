import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Modal, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function AppointmentsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedTestLabel, setSelectedTestLabel] = useState('Choose a test...');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(9); // October (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedScheduleLabel, setSelectedScheduleLabel] = useState('Choose a schedule...');
  const [selectedLocation, setSelectedLocation] = useState('MDLAB Direct - Main Branch');
  const [showTestPicker, setShowTestPicker] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const tests = [
    { label: 'Urinalysis (Complete Urine Examination) - ₱200', value: 'urinalysis' },
    { label: 'X-Ray Chest (PA) - ₱600', value: 'xray' },
    { label: 'Fasting Blood Sugar (FBS) - ₱150', value: 'fbs' },
    { label: 'Lipid Profile - ₱450', value: 'lipid' },
    { label: 'Complete Blood Count (CBC) - ₱350', value: 'cbc' },
  ];

  const schedules = [
    { label: '7:00 AM - 10:00 AM (Morning - Fasting Tests)', value: 'morning' },
    { label: '1:00 PM - 4:00 PM (Afternoon - After Lunch)', value: 'afternoon' },
  ];

  const locations = [
    'MDLAB Direct - Main Branch',
    'MDLAB Direct - North Branch',
    'MDLAB Direct - South Branch',
  ];

  const handleBookAppointment = () => {
    // Handle booking logic here
    setModalVisible(false);
    // Reset form
    setSelectedTest('');
    setSelectedTestLabel('Choose a test...');
    setSelectedDate(null);
    setSelectedSchedule('');
    setSelectedScheduleLabel('Choose a schedule...');
  };

  const selectTest = (test: typeof tests[0]) => {
    setSelectedTest(test.value);
    setSelectedTestLabel(test.label);
    setShowTestPicker(false);
  };

  const selectSchedule = (schedule: typeof schedules[0]) => {
    setSelectedSchedule(schedule.value);
    setSelectedScheduleLabel(schedule.label);
    setShowSchedulePicker(false);
  };

  const selectLocation = (location: string) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      if (selectedYear > 2025) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      }
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      if (selectedYear < 2031) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      }
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    const today = new Date();
    const isCurrentMonth = today.getMonth() === selectedMonth && today.getFullYear() === selectedYear;
    const currentDay = today.getDate();

    // Day headers
    const headers = dayNames.map((day, index) => (
      <View key={`header-${index}`} style={styles.calendarDay}>
        <ThemedText style={styles.dayHeader}>{day}</ThemedText>
      </View>
    ));

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay}>
          <ThemedText style={styles.emptyDay}></ThemedText>
        </View>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      const isToday = isCurrentMonth && day === currentDay;
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={styles.calendarDay}
          onPress={() => setSelectedDate(day)}
        >
          <View style={[
            styles.dayCircle,
            isSelected && styles.selectedDay,
            isToday && !isSelected && styles.todayDay
          ]}>
            <ThemedText style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isToday && !isSelected && styles.todayDayText
            ]}>
              {day}
            </ThemedText>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity 
            onPress={goToPreviousMonth}
            disabled={selectedYear === 2025 && selectedMonth === 0}
            style={styles.monthNavButton}
          >
            <Ionicons 
              name="chevron-back" 
              size={20} 
              color={selectedYear === 2025 && selectedMonth === 0 ? '#9CEEBE' : '#FFFFFF'} 
            />
          </TouchableOpacity>
          <ThemedText style={styles.calendarMonth}>
            {monthNames[selectedMonth]} {selectedYear}
          </ThemedText>
          <TouchableOpacity 
            onPress={goToNextMonth}
            disabled={selectedYear === 2031 && selectedMonth === 11}
            style={styles.monthNavButton}
          >
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={selectedYear === 2031 && selectedMonth === 11 ? '#9CEEBE' : '#FFFFFF'} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          {headers}
          {days}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>My Appointments</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Schedule and manage your appointments</ThemedText>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.titleRow}>
            <View>
              <ThemedText style={styles.pageTitle}>My Appointments</ThemedText>
              <ThemedText style={styles.pageSubtitle}>Manage your upcoming and past appointments</ThemedText>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="calendar" size={16} color="#FFFFFF" />
              <ThemedText style={styles.bookButtonText}>Book New Appointment</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Upcoming Appointments */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Upcoming Appointments</ThemedText>
            
            <View style={styles.row}>
              {/* First Appointment Card */}
              <View style={styles.appointmentCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.dateBadge}>
                    <ThemedText style={styles.dateDay}>10</ThemedText>
                    <ThemedText style={styles.dateMonth}>OCT</ThemedText>
                  </View>
                  <View style={styles.statusBadge}>
                    <ThemedText style={styles.statusText}>pending</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.appointmentTitle}>Urinalysis (Complete Urine Examination)</ThemedText>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={14} color="#718096" />
                  <ThemedText style={styles.detailText}>7:00 AM</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={14} color="#718096" />
                  <ThemedText style={styles.detailText}>MDLAB Direct - Main Branch</ThemedText>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.rescheduleButton}>
                    <ThemedText style={styles.rescheduleButtonText}>Reschedule</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton}>
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Second Appointment Card */}
              <View style={styles.appointmentCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.dateBadge}>
                    <ThemedText style={styles.dateDay}>07</ThemedText>
                    <ThemedText style={styles.dateMonth}>OCT</ThemedText>
                  </View>
                  <View style={styles.statusBadge}>
                    <ThemedText style={styles.statusText}>pending</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.appointmentTitle}>Lipid Profile</ThemedText>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={14} color="#718096" />
                  <ThemedText style={styles.detailText}>13:00 AM</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={14} color="#718096" />
                  <ThemedText style={styles.detailText}>MDLAB Direct - Main Branch</ThemedText>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.rescheduleButton}>
                    <ThemedText style={styles.rescheduleButtonText}>Reschedule</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton}>
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Third Appointment - Single Row */}
            <View style={styles.appointmentCard}>
              <View style={styles.cardHeader}>
                <View style={styles.dateBadge}>
                  <ThemedText style={styles.dateDay}>09</ThemedText>
                  <ThemedText style={styles.dateMonth}>OCT</ThemedText>
                </View>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>pending</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.appointmentTitle}>Urinalysis (Complete Urine Examination)</ThemedText>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={14} color="#718096" />
                <ThemedText style={styles.detailText}>7:00 AM</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={14} color="#718096" />
                <ThemedText style={styles.detailText}>MDLAB Direct - Main Branch</ThemedText>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.rescheduleButton}>
                  <ThemedText style={styles.rescheduleButtonText}>Reschedule</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Past Appointments */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Past Appointments</ThemedText>
            
            <View style={styles.pastCard}>
              <View style={styles.pastCardContent}>
                <ThemedText style={styles.pastTitle}>Urinalysis (Complete Urine Examination)</ThemedText>
                <ThemedText style={styles.pastDetails}>October 3, 2025 • 7:00 AM • MDLAB Direct - Main Branch</ThemedText>
              </View>
              <View style={[styles.statusBadge, styles.cancelledBadge]}>
                <ThemedText style={styles.statusText}>cancelled</ThemedText>
              </View>
            </View>

            <View style={styles.pastCard}>
              <View style={styles.pastCardContent}>
                <ThemedText style={styles.pastTitle}>X-Ray Chest (PA)</ThemedText>
                <ThemedText style={styles.pastDetails}>October 2, 2025 • 7:00 AM • MDLAB Direct - Main Branch</ThemedText>
              </View>
              <View style={styles.statusBadge}>
                <ThemedText style={styles.statusText}>pending</ThemedText>
              </View>
            </View>

            <View style={styles.pastCard}>
              <View style={styles.pastCardContent}>
                <ThemedText style={styles.pastTitle}>Urinalysis (Complete Urine Examination)</ThemedText>
                <ThemedText style={styles.pastDetails}>September 30, 2025 • 7:00 AM • MDLAB Direct - Main Branch</ThemedText>
              </View>
              <View style={styles.statusBadge}>
                <ThemedText style={styles.statusText}>pending</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Appointment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Book an Appointment</ThemedText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#2D3748" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Test Type */}
              <View style={styles.formGroup}>
                <ThemedText style={styles.label}>Test Type</ThemedText>
                <TouchableOpacity 
                  style={styles.dropdownButton}
                  onPress={() => setShowTestPicker(!showTestPicker)}
                >
                  <ThemedText style={[styles.dropdownText, !selectedTest && styles.placeholderText]}>
                    {selectedTestLabel}
                  </ThemedText>
                  <Ionicons name={showTestPicker ? "chevron-up" : "chevron-down"} size={20} color="#718096" />
                </TouchableOpacity>
                {showTestPicker && (
                  <View style={styles.dropdownList}>
                    {tests.map((test) => (
                      <TouchableOpacity
                        key={test.value}
                        style={styles.dropdownItem}
                        onPress={() => selectTest(test)}
                      >
                        <ThemedText style={styles.dropdownItemText}>{test.label}</ThemedText>
                        {selectedTest === test.value && (
                          <Ionicons name="checkmark" size={20} color="#21AEA8" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Calendar */}
              <View style={styles.formGroup}>
                <ThemedText style={styles.label}>Select Date</ThemedText>
                {renderCalendar()}
              </View>

              {/* Time Schedule */}
              <View style={styles.formGroup}>
                <ThemedText style={styles.label}>Select Time Schedule</ThemedText>
                <TouchableOpacity 
                  style={styles.dropdownButton}
                  onPress={() => setShowSchedulePicker(!showSchedulePicker)}
                >
                  <ThemedText style={[styles.dropdownText, !selectedSchedule && styles.placeholderText]}>
                    {selectedScheduleLabel}
                  </ThemedText>
                  <Ionicons name={showSchedulePicker ? "chevron-up" : "chevron-down"} size={20} color="#718096" />
                </TouchableOpacity>
                {showSchedulePicker && (
                  <View style={styles.dropdownList}>
                    {schedules.map((schedule) => (
                      <TouchableOpacity
                        key={schedule.value}
                        style={styles.dropdownItem}
                        onPress={() => selectSchedule(schedule)}
                      >
                        <ThemedText style={styles.dropdownItemText}>{schedule.label}</ThemedText>
                        {selectedSchedule === schedule.value && (
                          <Ionicons name="checkmark" size={20} color="#21AEA8" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <View style={styles.infoBox}>
                  <ThemedText style={styles.infoText}>
                    Morning schedule is recommended for fasting blood tests. Afternoon schedule is for non-fasting tests or after meals.
                  </ThemedText>
                </View>
              </View>

              {/* Location */}
              <View style={styles.formGroup}>
                <ThemedText style={styles.label}>Select Location</ThemedText>
                <TouchableOpacity 
                  style={styles.dropdownButton}
                  onPress={() => setShowLocationPicker(!showLocationPicker)}
                >
                  <ThemedText style={styles.dropdownText}>
                    {selectedLocation}
                  </ThemedText>
                  <Ionicons name={showLocationPicker ? "chevron-up" : "chevron-down"} size={20} color="#718096" />
                </TouchableOpacity>
                {showLocationPicker && (
                  <View style={styles.dropdownList}>
                    {locations.map((location) => (
                      <TouchableOpacity
                        key={location}
                        style={styles.dropdownItem}
                        onPress={() => selectLocation(location)}
                      >
                        <ThemedText style={styles.dropdownItemText}>{location}</ThemedText>
                        {selectedLocation === location && (
                          <Ionicons name="checkmark" size={20} color="#21AEA8" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <ThemedText style={styles.modalCancelText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalBookButton}
                  onPress={handleBookAppointment}
                >
                  <ThemedText style={styles.modalBookText}>Book Appointment</ThemedText>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    alignItems: 'center',
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
  bookButton: {
    backgroundColor: '#21AEA8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flex: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#21AEA8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#21AEA8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#21AEA8',
    lineHeight: 28,
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#21AEA8',
  },
  statusBadge: {
    backgroundColor: '#21AEA8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cancelledBadge: {
    backgroundColor: '#48BB78',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  appointmentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#718096',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#4299E1',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F56565',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  pastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pastCardContent: {
    flex: 1,
    marginRight: 12,
  },
  pastTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#21AEA8',
    marginBottom: 4,
  },
  pastDetails: {
    fontSize: 12,
    color: '#718096',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#2D3748',
    flex: 1,
  },
  placeholderText: {
    color: '#A0AEC0',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    overflow: 'scroll',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#2D3748',
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#2C5282',
    fontStyle: 'italic',
  },
  // Calendar Styles
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  calendarHeader: {
    backgroundColor: '#21AEA8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  monthNavButton: {
    padding: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  dayHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#718096',
  },
  emptyDay: {
    fontSize: 14,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#2D3748',
  },
  selectedDay: {
    backgroundColor: '#21AEA8',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  todayDay: {
    backgroundColor: '#E0F2F1',
  },
  todayDayText: {
    color: '#21AEA8',
    fontWeight: '600',
  },
  // Modal Actions
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#2D3748',
    fontSize: 15,
    fontWeight: '600',
  },
  modalBookButton: {
    flex: 1,
    backgroundColor: '#21AEA8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBookText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
