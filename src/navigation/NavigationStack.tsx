import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {LoginScreen} from '../screens/Authentication/LoginScreen';
import {InitialLoadingScreen} from '../screens/InitialLoading';
import {RestaurantMenu} from '../screens/RestaurantMenu/RestaurantMenu';
import {CartScreen} from '../screens/Cart/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NavigationStack() {
  return (
    <Stack.Navigator
      initialRouteName="InitialLoadingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="InitialLoadingScreen"
        component={InitialLoadingScreen}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}
