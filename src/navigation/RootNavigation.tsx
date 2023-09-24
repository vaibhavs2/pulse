import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationStack} from './NavigationStack';

export function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}
