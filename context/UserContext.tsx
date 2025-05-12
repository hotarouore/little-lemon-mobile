import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasCompletedOnboarding: boolean;
};

type UserContextType = {
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  clearProfile: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'userProfile';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const newProfile = { ...profile, ...data } as UserProfile;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProfile(null);
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 