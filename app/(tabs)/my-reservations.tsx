import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKINGS_KEY = 'bookings';

type Booking = {
  id: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  status: string;
  name: string;
  email: string;
  phone: string;
};

export default function MyReservationsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem(BOOKINGS_KEY);
      const parsedBookings = stored ? JSON.parse(stored) : [];
      // Sort by date (newest first)
      parsedBookings.sort((a: Booking, b: Booking) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBookings(parsedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    loadBookings();
  }, []));

  const handleCancelBooking = async (bookingId: string) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Find the booking to update
              const updatedBookings = bookings.map(booking => 
                booking.id === bookingId 
                  ? { ...booking, status: 'cancelled' } 
                  : booking
              );
              
              // Save updated bookings
              await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
              
              // Refresh bookings list
              setBookings(updatedBookings);
            } catch (error) {
              console.error('Error cancelling booking:', error);
              Alert.alert('Error', 'Could not cancel your reservation. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleModifyBooking = (booking: Booking) => {
    // For now, redirect to book page to create a new booking
    // In a more advanced app, we would prefill the form with the booking details
    router.push('/book');
  };

  const renderReservation = ({ item }: { item: Booking }) => (
    <View style={[
      styles.reservationCard,
      item.status === 'cancelled' && styles.cancelledCard
    ]}>
      <View style={styles.reservationHeader}>
        <Text style={styles.reservationDate}>
          {new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <View style={[
          styles.statusBadge,
          item.status === 'confirmed' ? styles.confirmedBadge : 
          item.status === 'cancelled' ? styles.cancelledBadge : styles.pendingBadge
        ]}>
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.reservationDetails}>
        <Text style={styles.detailText}>Time: {item.time}</Text>
        <Text style={styles.detailText}>Guests: {item.guests}</Text>
        <Text style={styles.detailText}>Occasion: {item.occasion}</Text>
        <Text style={styles.detailText}>Name: {item.name}</Text>
        <Text style={styles.detailText}>Contact: {item.phone}</Text>
      </View>

      {item.status !== 'cancelled' && (
        <View style={styles.reservationActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleCancelBooking(item.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.modifyButton]}
            onPress={() => handleModifyBooking(item)}
          >
            <Text style={styles.modifyButtonText}>Modify</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Reservations</Text>
        <TouchableOpacity
          style={styles.newReservationButton}
          onPress={() => router.push('/book')}
        >
          <Text style={styles.newReservationButtonText}>New Reservation</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.emptyState}>
          <Text>Loading reservations...</Text>
        </View>
      ) : bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderReservation}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.reservationsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No reservations found</Text>
          <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => router.push('/book')}
          >
            <Text style={styles.emptyStateButtonText}>Make a Reservation</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#495E57',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 15,
  },
  newReservationButton: {
    backgroundColor: '#F4CE14',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  newReservationButtonText: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservationsList: {
    padding: 20,
  },
  reservationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelledCard: {
    opacity: 0.7,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reservationDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  confirmedBadge: {
    backgroundColor: '#4CAF50',
  },
  pendingBadge: {
    backgroundColor: '#FFC107',
  },
  cancelledBadge: {
    backgroundColor: '#dc3545',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reservationDetails: {
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  reservationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  modifyButton: {
    backgroundColor: '#495E57',
  },
  cancelButtonText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '500',
  },
  modifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 