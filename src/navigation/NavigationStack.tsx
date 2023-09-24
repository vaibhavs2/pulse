import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {LoginScreen} from '../screens/Authentication/LoginScreen';
import {InitialLoadingScreen} from '../screens/InitialLoading';
import {UploadStoreImages} from '../screens/UploadStoreImage/UploadStoreImage';

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
      <Stack.Screen name="UploadStoreImages" component={UploadStoreImages} />
    </Stack.Navigator>
  );
}
