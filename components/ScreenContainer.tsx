import { Platform, SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  edges?: Edge[];
};

export default function ScreenContainer({ 
  children, 
  scrollable = true, 
  style,
  edges = ['right', 'left'], 
}: Props) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

  const Container = Platform.select({
    ios: () => SafeAreaContext,
    android: () => SafeAreaView,
    default: () => View,
  })();

  const content = (
    <Container style={[styles.container, { backgroundColor }, style]}>
      {children}
    </Container>
  );

  if (scrollable) {
    return (
      <ScrollView 
        style={[styles.scrollView, { backgroundColor }]}
        contentContainerStyle={styles.scrollContent}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
}); 