import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

function CartIconWithBadge({ color, size }: { color: string; size: number }) {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <View>
      <Ionicons name="cart-outline" size={size} color={color} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'index') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'menu') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (route.name === 'my-reservations') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'order') {
              return <CartIconWithBadge color={color} size={size} />;
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#495E57',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            height: Platform.OS === 'ios' ? 60 : 60,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: '#495E57',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackgroundContainerStyle: {
            backgroundColor: '#fff',
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="menu" />
        <Tabs.Screen name="my-reservations" />
        <Tabs.Screen name="order" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#F4CE14',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#495E57',
  },
  badgeText: {
    color: '#495E57',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
