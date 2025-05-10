import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Book: undefined;
  About: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/hero-image.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <Text style={styles.heroText}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => navigation.navigate('Book')}
          >
            <Text style={styles.reserveButtonText}>Reserve a Table</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Specials Section */}
      <View style={styles.specialsSection}>
        <Text style={styles.sectionTitle}>This Week's Specials</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Special items will be added here */}
        </ScrollView>
      </View>

      {/* Testimonials Section */}
      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Testimonial items will be added here */}
        </ScrollView>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Little Lemon</Text>
        <Text style={styles.aboutText}>
          Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment.
        </Text>
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.aboutButtonText}>Learn More</Text>
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
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  reserveButton: {
    backgroundColor: '#F4CE14',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  reserveButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  specialsSection: {
    paddingVertical: 20,
  },
  testimonialsSection: {
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  aboutSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  aboutButton: {
    backgroundColor: '#495E57',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 