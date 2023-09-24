import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
export function HomeScreen(props: Props) {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
