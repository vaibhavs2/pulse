import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { NavigationStack } from './NavigationStack';
import { AppContext } from '../Contexts/AppContext';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
export function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AppContext>
  );
}
