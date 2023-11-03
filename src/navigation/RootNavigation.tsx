import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {NavigationStack} from './NavigationStack';
import {AppContext} from '../Contexts/AppContext';

export function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AppContext>
  );
}
