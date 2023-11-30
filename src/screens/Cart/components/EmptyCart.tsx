import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationBar, ScreenContainer } from '../../../GlobalComponents';

type Props = { onPress: () => void };
export function EmptyCart(props: Props) {
  return (
    <ScreenContainer canGoback>
      <View style={styles.container}>
        <Text style={styles.message}>Cart is empty</Text>
        <Button title="See Products" onPress={props.onPress} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: 'gray',
  },
});
