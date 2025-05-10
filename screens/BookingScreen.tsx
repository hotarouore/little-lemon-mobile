import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  ConfirmedBooking: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BookingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    date: new Date(),
    time: new Date(),
    guests: '2',
    occasion: 'none',
    name: '',
    email: '',
    phone: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const occasions = ['none', 'birthday', 'anniversary', 'business', 'other'];

  const handleSubmit = () => {
    // Here you would typically handle the form submission
    // For now, we'll just navigate to the confirmation screen
    navigation.navigate('ConfirmedBooking');
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const handleTimeChange = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setFormData(prev => ({ ...prev, time: selectedTime }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Reserve a Table</Text>

        {/* Date Selection */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.inputLabel}>Date</Text>
          <Text style={styles.inputValue}>
            {formData.date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {/* Time Selection */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.inputLabel}>Time</Text>
          <Text style={styles.inputValue}>
            {formData.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>

        {/* Number of Guests */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Number of Guests</Text>
          <TextInput
            style={styles.textInput}
            value={formData.guests}
            onChangeText={(value) => setFormData(prev => ({ ...prev, guests: value }))}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        {/* Occasion Selection */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Occasion</Text>
          <View style={styles.occasionButtons}>
            {occasions.map((occasion) => (
              <TouchableOpacity
                key={occasion}
                style={[
                  styles.occasionButton,
                  formData.occasion === occasion && styles.occasionButtonActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, occasion }))}
              >
                <Text style={[
                  styles.occasionButtonText,
                  formData.occasion === occasion && styles.occasionButtonTextActive
                ]}>
                  {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={formData.name}
            onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={formData.email}
            onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={styles.textInput}
            value={formData.phone}
            onChangeText={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Reserve Table</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={formData.time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  inputValue: {
    fontSize: 16,
    color: '#333',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  occasionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  occasionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  occasionButtonActive: {
    backgroundColor: '#495E57',
  },
  occasionButtonText: {
    color: '#333',
    fontSize: 14,
  },
  occasionButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 