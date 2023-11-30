import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';
import { CartScreen } from '../screens/Cart/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NavigationStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}
