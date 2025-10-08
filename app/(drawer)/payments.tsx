import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { schedulePaymentNotification, schedulePaymentConfirmationNotification } from '@/utils/notifications';
import { generateReceiptPDF } from '@/utils/pdfGenerator';

export default function PaymentsScreen() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'paid'>('pending');

  // Mock payment data
  const [pendingPayments] = useState([
    {
      id: 1,
      testName: 'Complete Blood Count (CBC)',
      date: 'September 28, 2025',
      amount: 450.00,
      status: 'pending',
      dueDate: 'October 15, 2025',
    },
    {
      id: 2,
      testName: 'Lipid Profile',
      date: 'September 15, 2025',
      amount: 850.00,
      status: 'pending',
      dueDate: 'October 5, 2025',
    },
  ]);

  const [paidPayments] = useState([
    {
      id: 3,
      testName: 'Urinalysis',
      date: 'August 20, 2025',
      amount: 350.00,
      status: 'paid',
      paidDate: 'August 22, 2025',
      receiptNumber: 'MDLAB-2025-0823',
      paymentMethod: 'Cash - Walk-in',
    },
    {
      id: 4,
      testName: 'Blood Sugar Test',
      date: 'July 10, 2025',
      amount: 250.00,
      status: 'paid',
      paidDate: 'July 12, 2025',
      receiptNumber: 'MDLAB-2025-0712',
      paymentMethod: 'Cash - Walk-in',
    },
  ]);

  // Send payment reminders for pending payments
  useEffect(() => {
    const sendPaymentReminders = async () => {
      // In production, this would be triggered by your backend
      // Uncomment to test:
      // const overduePayment = pendingPayments.find(p => new Date(p.dueDate) < new Date());
      // if (overduePayment) {
      //   await schedulePaymentNotification(overduePayment.amount, overduePayment.dueDate);
      // }
    };
    
    sendPaymentReminders();
  }, []);

  const calculateTotalPending = () => {
    return pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const handlePayAtOffice = (payment: any) => {
    Alert.alert(
      'Payment Instructions',
      `Please visit MDLAB Direct office to pay ₱${payment.amount.toFixed(2)} for ${payment.testName}.\n\n📍 Location: MDLAB Direct Office, Nueva Vizcaya\n🕒 Office Hours: Mon-Sat, 8:00 AM - 5:00 PM\n\n⚠️ Walk-in payments only. Please bring this payment reference.`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const handlePrintReceipt = async (payment: any) => {
    if (payment.status !== 'paid') {
      Alert.alert('Error', 'Receipt is only available for paid transactions.');
      return;
    }

    try {
      await generateReceiptPDF({
        receiptNumber: payment.receiptNumber,
        patientName: 'Renz Ramos',
        date: payment.paidDate,
        testName: payment.testName,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
      });
    } catch (error) {
      console.error('Error generating receipt:', error);
    }
  };

  const handleViewReceipt = (payment: any) => {
    Alert.alert(
      'Receipt Details',
      `Receipt Number: ${payment.receiptNumber}\n` +
      `Test: ${payment.testName}\n` +
      `Amount: ₱${payment.amount.toFixed(2)}\n` +
      `Payment Date: ${payment.paidDate}\n` +
      `Payment Method: ${payment.paymentMethod}`,
      [
        {
          text: 'Print Receipt',
          onPress: () => handlePrintReceipt(payment),
        },
        {
          text: 'Close',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Payments</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Manage your test payments and receipts</ThemedText>
        </View>

        <View style={styles.mainContent}>
          {/* Payment Notice Card */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              <Ionicons name="information-circle" size={24} color="#21AEA8" />
            </View>
            <View style={styles.noticeContent}>
              <ThemedText style={styles.noticeTitle}>Walk-In Payments Only</ThemedText>
              <ThemedText style={styles.noticeText}>
                Please visit our office to complete your payment. We accept cash payments during office hours.
              </ThemedText>
            </View>
          </View>

          {/* Balance Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <ThemedText style={styles.summaryLabel}>Total Pending</ThemedText>
                <ThemedText style={styles.summaryAmount}>₱{calculateTotalPending().toFixed(2)}</ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <ThemedText style={styles.summaryLabel}>Pending Bills</ThemedText>
                <ThemedText style={styles.summaryCount}>{pendingPayments.length}</ThemedText>
              </View>
            </View>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'pending' && styles.tabActive]}
              onPress={() => setSelectedTab('pending')}
            >
              <ThemedText style={[styles.tabText, selectedTab === 'pending' && styles.tabTextActive]}>
                Pending ({pendingPayments.length})
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'paid' && styles.tabActive]}
              onPress={() => setSelectedTab('paid')}
            >
              <ThemedText style={[styles.tabText, selectedTab === 'paid' && styles.tabTextActive]}>
                Paid ({paidPayments.length})
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Pending Payments Tab */}
          {selectedTab === 'pending' && (
            <View style={styles.paymentsList}>
              {pendingPayments.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="checkmark-circle-outline" size={64} color="#CBD5E0" />
                  <ThemedText style={styles.emptyTitle}>No Pending Payments</ThemedText>
                  <ThemedText style={styles.emptyText}>All your bills are paid!</ThemedText>
                </View>
              ) : (
                pendingPayments.map((payment) => (
                  <View key={payment.id} style={styles.paymentCard}>
                    <View style={styles.paymentHeader}>
                      <View style={styles.paymentIcon}>
                        <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
                      </View>
                      <View style={styles.paymentInfo}>
                        <ThemedText style={styles.paymentTitle}>{payment.testName}</ThemedText>
                        <ThemedText style={styles.paymentDate}>Test Date: {payment.date}</ThemedText>
                        <View style={styles.dueDateContainer}>
                          <Ionicons name="time-outline" size={14} color="#E53E3E" />
                          <ThemedText style={styles.dueDate}>Due: {payment.dueDate}</ThemedText>
                        </View>
                      </View>
                    </View>
                    <View style={styles.paymentAmount}>
                      <ThemedText style={styles.amountLabel}>Amount Due:</ThemedText>
                      <ThemedText style={styles.amountValue}>₱{payment.amount.toFixed(2)}</ThemedText>
                    </View>
                    <TouchableOpacity 
                      style={styles.payButton}
                      onPress={() => handlePayAtOffice(payment)}
                    >
                      <Ionicons name="cash-outline" size={20} color="#FFFFFF" />
                      <ThemedText style={styles.payButtonText}>Pay at Office</ThemedText>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Paid Payments Tab */}
          {selectedTab === 'paid' && (
            <View style={styles.paymentsList}>
              {paidPayments.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="receipt-outline" size={64} color="#CBD5E0" />
                  <ThemedText style={styles.emptyTitle}>No Payment History</ThemedText>
                  <ThemedText style={styles.emptyText}>Your paid transactions will appear here</ThemedText>
                </View>
              ) : (
                paidPayments.map((payment) => (
                  <View key={payment.id} style={styles.paymentCard}>
                    <View style={styles.paymentHeader}>
                      <View style={[styles.paymentIcon, styles.paymentIconPaid]}>
                        <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                      </View>
                      <View style={styles.paymentInfo}>
                        <ThemedText style={styles.paymentTitle}>{payment.testName}</ThemedText>
                        <ThemedText style={styles.paymentDate}>Test Date: {payment.date}</ThemedText>
                        <View style={styles.paidBadge}>
                          <ThemedText style={styles.paidBadgeText}>PAID</ThemedText>
                        </View>
                      </View>
                    </View>
                    <View style={styles.receiptInfo}>
                      <View style={styles.receiptRow}>
                        <ThemedText style={styles.receiptLabel}>Receipt No:</ThemedText>
                        <ThemedText style={styles.receiptValue}>{payment.receiptNumber}</ThemedText>
                      </View>
                      <View style={styles.receiptRow}>
                        <ThemedText style={styles.receiptLabel}>Payment Date:</ThemedText>
                        <ThemedText style={styles.receiptValue}>{payment.paidDate}</ThemedText>
                      </View>
                      <View style={styles.receiptRow}>
                        <ThemedText style={styles.receiptLabel}>Amount Paid:</ThemedText>
                        <ThemedText style={[styles.receiptValue, styles.receiptAmount]}>
                          ₱{payment.amount.toFixed(2)}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.receiptActions}>
                      <TouchableOpacity 
                        style={styles.receiptButton}
                        onPress={() => handleViewReceipt(payment)}
                      >
                        <Ionicons name="eye-outline" size={18} color="#21AEA8" />
                        <ThemedText style={styles.receiptButtonText}>View Receipt</ThemedText>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.receiptButton}
                        onPress={() => handlePrintReceipt(payment)}
                      >
                        <Ionicons name="print-outline" size={18} color="#21AEA8" />
                        <ThemedText style={styles.receiptButtonText}>Print</ThemedText>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}
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
  noticeCard: {
    backgroundColor: '#E8F5F3',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#21AEA8',
  },
  noticeIcon: {
    marginRight: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#21AEA8',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 13,
    color: '#2D3748',
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: '#21AEA8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#21AEA8',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  paymentsList: {
    gap: 12,
  },
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  paymentIcon: {
    backgroundColor: '#21AEA8',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentIconPaid: {
    backgroundColor: '#48BB78',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 6,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueDate: {
    fontSize: 12,
    color: '#E53E3E',
    fontWeight: '600',
  },
  paidBadge: {
    backgroundColor: '#C6F6D5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  paidBadgeText: {
    color: '#22543D',
    fontSize: 11,
    fontWeight: '700',
  },
  paymentAmount: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: '#718096',
  },
  amountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  payButton: {
    backgroundColor: '#21AEA8',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  receiptInfo: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  receiptLabel: {
    fontSize: 13,
    color: '#718096',
  },
  receiptValue: {
    fontSize: 13,
    color: '#2D3748',
    fontWeight: '600',
  },
  receiptAmount: {
    color: '#48BB78',
    fontSize: 16,
  },
  receiptActions: {
    flexDirection: 'row',
    gap: 8,
  },
  receiptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#E8F5F3',
    borderRadius: 6,
  },
  receiptButtonText: {
    color: '#21AEA8',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#718096',
  },
});
