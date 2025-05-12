import { Redirect, Stack } from 'expo-router';
import { useUser } from '../../context/UserContext';

export default function AuthLayout() {
  const { profile } = useUser();

  // If the user has completed onboarding, redirect to the main app
  if (profile?.hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  // For new users, show the onboarding screen
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="onboarding" 
        options={{
          headerShown: false,
          animation: 'none'
        }} 
      />
    </Stack>
  );
} 