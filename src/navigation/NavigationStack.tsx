import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {RootStackParamList} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NavigationStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
