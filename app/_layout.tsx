import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '../context/CartContext';
import { UserProvider, useUser } from '../context/UserContext';

// Inner component that can safely use the useUser hook
function StackNavigator() {
  const { profile } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    // If the user is not logged in and not in the auth group, redirect to onboarding
    if (!profile?.hasCompletedOnboarding && !inAuthGroup) {
      router.replace('/(auth)/onboarding');
    } 
    // If the user is logged in and in the auth group, redirect to the main app
    else if (profile?.hasCompletedOnboarding && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [profile, segments]);

  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: Platform.OS === 'ios' ? 'default' : 'fade',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="book" 
        options={{ 
          title: "Reserve a Table",
          headerStyle: { backgroundColor: '#495E57' },
          headerTintColor: '#F4CE14',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="confirmed-booking" 
        options={{ 
          title: "Booking Confirmed",
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="checkout-confirmation" 
        options={{ 
          title: "Order Confirmed",
          headerShown: false
        }} 
      />
    </Stack>
  );
}

// Root layout component that handles providers
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <UserProvider>
          <SafeAreaView style={styles.container}>
            <StackNavigator />
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </SafeAreaView>
        </UserProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
