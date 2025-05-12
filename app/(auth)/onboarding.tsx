import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../context/UserContext';

export default function OnboardingScreen() {
  const { updateProfile } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return formData.firstName.trim() !== '' && formData.lastName.trim() !== '';
    }
    return /\S+@\S+\.\S+/.test(formData.email) && /^\d{10}$/.test(formData.phone.replace(/\D/g, ''));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (formData.firstName.trim() && formData.lastName.trim()) {
        setCurrentStep(2);
      } else {
        validateForm();
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Update the profile and mark onboarding as complete
      await updateProfile({
        ...formData,
        hasCompletedOnboarding: true,
      });
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete onboarding. Please try again.');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Welcome to Little Lemon</Text>
      <Text style={styles.stepSubtitle}>Let's get to know you</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, errors.firstName && styles.inputError]}
          value={formData.firstName}
          onChangeText={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
          placeholder="Enter your first name"
          autoCapitalize="words"
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          value={formData.lastName}
          onChangeText={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
          placeholder="Enter your last name"
          autoCapitalize="words"
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Contact Information</Text>
      <Text style={styles.stepSubtitle}>How can we reach you?</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={formData.email}
          onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          value={formData.phone}
          onChangeText={(value) => {
            // Format phone number as user types
            const cleaned = value.replace(/\D/g, '');
            const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            setFormData(prev => ({ ...prev, phone: formatted }));
          }}
          placeholder="(123) 456-7890"
          keyboardType="phone-pad"
          maxLength={14}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Little Lemon</Text>
          <Text style={styles.headerSubtitle}>Mediterranean Cuisine</Text>
        </View>

        {currentStep === 1 ? renderStep1() : renderStep2()}

        <View style={styles.footer}>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, currentStep === 1 && styles.activeStepDot]} />
            <View style={[styles.stepDot, currentStep === 2 && styles.activeStepDot]} />
          </View>

          <TouchableOpacity
            style={[styles.button, !isFormValid() && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!isFormValid()}
          >
            <Text style={[styles.buttonText, !isFormValid() && styles.buttonTextDisabled]}>
              {currentStep === 1 ? 'Next' : 'Get Started'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 30,
    backgroundColor: '#495E57',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 10,
  },
  stepSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
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
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeStepDot: {
    backgroundColor: '#495E57',
  },
  button: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#666',
  },
}); 