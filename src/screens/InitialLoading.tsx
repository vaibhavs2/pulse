import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import {NativeScreenProps} from '../types';

export function InitialLoadingScreen(
  props: NativeScreenProps<'InitialLoadingScreen'>,
) {
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      props.navigation.replace('HomeScreen');
    } else {
      props.navigation.replace('LoginScreen');
    }
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'black'} />
    </View>
  );
}
