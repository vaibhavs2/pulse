import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeScreenProps} from '../../types';
import {ScreenContainer} from '../../GlobalComponents';

export function HomeScreen(props: NativeScreenProps<'HomeScreen'>) {
  return (
    <ScreenContainer navigationTitle="Home">
      <Text>HomeScreen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
