import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock available times - in a real app, this would come from an API
const availableTimes = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

export default function BookingScreen() {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    guests: '',
    occasion: '',
    name: '',
    email: '',
    phone: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    if (!formData.guests || parseInt(formData.guests) < 1 || parseInt(formData.guests) > 10) {
      newErrors.guests = 'Please enter a valid number of guests (1-10)';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically handle the form submission
      // For now, we'll just navigate to the confirmation screen
      router.push('../confirmed-booking');
    }
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
      const timeString = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setFormData(prev => ({ ...prev, time: timeString }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reserve a Table</Text>
      </View>

      <View style={styles.form}>
        {/* Date Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>
              {formData.date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
              style={Platform.OS === 'ios' ? styles.iosPicker : undefined}
            />
          )}
        </View>

        {/* Time Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.inputText}>
              {formData.time || 'Select a time'}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              style={Platform.OS === 'ios' ? styles.iosPicker : undefined}
            />
          )}
          {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        </View>

        {/* Number of Guests */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Guests</Text>
          <TextInput
            style={[styles.input, errors.guests && styles.inputError]}
            placeholder="Enter number of guests (1-10)"
            value={formData.guests}
            onChangeText={(value) => setFormData(prev => ({ ...prev, guests: value }))}
            keyboardType="numeric"
            maxLength={2}
          />
          {errors.guests && <Text style={styles.errorText}>{errors.guests}</Text>}
        </View>

        {/* Occasion */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Occasion (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter occasion"
            value={formData.occasion}
            onChangeText={(value) => setFormData(prev => ({ ...prev, occasion: value }))}
          />
        </View>

        {/* Contact Information */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Reserve Table</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#F4CE14',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#495E57',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iosPicker: {
    height: 200,
    marginTop: 10,
  },
}); 