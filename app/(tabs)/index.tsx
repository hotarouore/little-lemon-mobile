import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddToCartModal from '../../components/AddToCartModal';
import { useCart } from '../../context/CartContext';
import { menuData, MenuItem } from '../../data/menuData';

// Get specials (first item from each category)
const specialsData = [
  menuData.find(item => item.category === 'starters'),
  menuData.find(item => item.category === 'mains'),
  menuData.find(item => item.category === 'desserts'),
].filter((item): item is MenuItem => item !== undefined);

export default function HomeScreen() {
  const { addItem } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <Text style={styles.heroText}>
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist. Join us for an unforgettable dining experience.
          </Text>
          <Link href="./book" style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Reserve a Table</Text>
          </Link>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1666633050341-5580de071aed?q=80&w=3270&auto=format&fit=crop' }}
          style={styles.heroImage}
        />
      </View>

      {/* Specials Section */}
      <View style={styles.specialsSection}>
        <View style={styles.specialsHeader}>
          <Text style={styles.specialsTitle}>This Week's Specials!</Text>
          <Link href="./menu" style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Online Menu</Text>
          </Link>
        </View>
        <View style={styles.specialsGrid}>
          {specialsData.map((special) => (
            <View key={special.id} style={styles.specialCard}>
              <Image source={{ uri: special.image }} style={styles.specialImage} />
              <View style={styles.specialContent}>
                <View style={styles.specialHeader}>
                  <Text style={styles.specialName}>{special.name}</Text>
                  <Text style={styles.specialPrice}>${special.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.specialDescription}>{special.description}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(special)}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* About Summary Section */}
      <View style={styles.aboutSection}>
        <View style={styles.aboutContent}>
          <View style={styles.aboutText}>
            <Text style={styles.aboutTitle}>Little Lemon</Text>
            <Text style={styles.aboutSubtitle}>Chicago</Text>
            <Text style={styles.aboutDescription}>
              Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails
              in a lively but casual environment. The restaurant features a locally-sourced menu with daily specials.
              We are passionate about providing a unique Mediterranean dining experience with a focus on fresh ingredients and warm hospitality.
            </Text>
          </View>
          <View style={styles.aboutImages}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' }}
              style={styles.aboutImage1}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' }}
              style={styles.aboutImage2}
            />
          </View>
        </View>
      </View>

      <AddToCartModal
        visible={modalVisible}
        onClose={handleCloseModal}
        itemName={selectedItem?.name || ''}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    backgroundColor: '#495E57',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#F4CE14',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heroImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  specialsSection: {
    padding: 20,
  },
  specialsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  specialsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
  },
  menuButton: {
    backgroundColor: '#495E57',
    padding: 10,
    borderRadius: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialsGrid: {
    gap: 20,
  },
  specialCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialImage: {
    width: '100%',
    height: 200,
  },
  specialContent: {
    padding: 15,
  },
  specialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  specialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495E57',
  },
  specialPrice: {
    fontSize: 16,
    color: '#F4CE14',
    fontWeight: 'bold',
  },
  specialDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: '#495E57',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  aboutContent: {
    flexDirection: 'row',
    gap: 20,
  },
  aboutText: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 5,
  },
  aboutSubtitle: {
    fontSize: 18,
    color: '#495E57',
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  aboutImages: {
    flex: 1,
    gap: 10,
  },
  aboutImage1: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  aboutImage2: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});
