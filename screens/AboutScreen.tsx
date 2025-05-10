import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/restaurant.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Our Story</Text>
        <Text style={styles.text}>
          Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. The restaurant features a locally-sourced menu with seasonal specials.
        </Text>

        <Text style={styles.title}>Our Mission</Text>
        <Text style={styles.text}>
          We strive to provide our guests with an exceptional dining experience by offering fresh, high-quality ingredients prepared with care and served in a warm, welcoming atmosphere.
        </Text>

        <Text style={styles.title}>Our Team</Text>
        <Text style={styles.text}>
          Our team of passionate chefs and staff work together to create memorable dining experiences for our guests. We take pride in our attention to detail and commitment to excellence.
        </Text>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Location</Text>
          <Text style={styles.infoText}>123 Main Street</Text>
          <Text style={styles.infoText}>Chicago, IL 60601</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Hours</Text>
          <Text style={styles.infoText}>Monday - Friday: 11:00 AM - 10:00 PM</Text>
          <Text style={styles.infoText}>Saturday - Sunday: 10:00 AM - 11:00 PM</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Contact</Text>
          <Text style={styles.infoText}>Phone: (555) 123-4567</Text>
          <Text style={styles.infoText}>Email: info@littlelemon.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
}); 