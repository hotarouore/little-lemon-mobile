import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Reservation = {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending';
};

type RootStackParamList = {
  Book: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for reservations
const mockReservations: Reservation[] = [
  {
    id: '1',
    date: '2024-03-20',
    time: '19:00',
    guests: 4,
    status: 'confirmed',
  },
  {
    id: '2',
    date: '2024-03-25',
    time: '20:00',
    guests: 2,
    status: 'pending',
  },
];

export default function MyReservationsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const renderReservation = ({ item }: { item: Reservation }) => (
    <View style={styles.reservationCard}>
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
          item.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge
        ]}>
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.reservationDetails}>
        <Text style={styles.detailText}>Time: {item.time}</Text>
        <Text style={styles.detailText}>Guests: {item.guests}</Text>
      </View>

      <View style={styles.reservationActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => {
            // Handle cancellation
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.modifyButton]}
          onPress={() => {
            // Handle modification
          }}
        >
          <Text style={styles.modifyButtonText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Reservations</Text>
        <TouchableOpacity
          style={styles.newReservationButton}
          onPress={() => navigation.navigate('Book')}
        >
          <Text style={styles.newReservationButtonText}>New Reservation</Text>
        </TouchableOpacity>
      </View>

      {mockReservations.length > 0 ? (
        <FlatList
          data={mockReservations}
          renderItem={renderReservation}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.reservationsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No reservations found</Text>
          <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => navigation.navigate('Book')}
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  newReservationButton: {
    backgroundColor: '#495E57',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  newReservationButtonText: {
    color: '#fff',
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