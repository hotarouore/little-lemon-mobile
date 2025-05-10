import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Import screens
import AboutScreen from './screens/AboutScreen';
import BookingScreen from './screens/BookingScreen';
import ConfirmedBookingScreen from './screens/ConfirmedBookingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';
import OrderScreen from './screens/OrderScreen';
import SignUpScreen from './screens/SignUpScreen';

// Define types for navigation
type RootStackParamList = {
  MainTabs: undefined;
  About: undefined;
  Login: undefined;
  SignUp: undefined;
  MyReservations: undefined;
  ConfirmedBooking: undefined;
};

type TabParamList = {
  Home: undefined;
  Menu: undefined;
  Book: undefined;
  Order: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Book') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#495E57',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Book" component={BookingScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MyReservations" component={MyReservationsScreen} />
        <Stack.Screen name="ConfirmedBooking" component={ConfirmedBookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 