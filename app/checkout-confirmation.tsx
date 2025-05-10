import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CheckoutConfirmationScreen() {
  const { items, getTotalPrice, clearCart } = useCart();

  const handleCompleteOrder = () => {
    clearCart();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Order Ready for Payment</Text>
        
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Payment Instructions</Text>
          <Text style={styles.instructionText}>
            1. Please proceed to the cashier counter
          </Text>
          <Text style={styles.instructionText}>
            2. Show this order to the cashier
          </Text>
          <Text style={styles.instructionText}>
            3. Complete your payment
          </Text>
          <Text style={styles.instructionText}>
            4. Collect your order when ready
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCompleteOrder}
        >
          <Text style={styles.buttonText}>Complete Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 30,
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495E57',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
  },
  instructions: {
    backgroundColor: '#F4CE14',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 16,
    color: '#495E57',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 