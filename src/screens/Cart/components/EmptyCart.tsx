import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationBar} from '../../../GlobalComponents';

type Props = {onPress: () => void};
export function EmptyCart(props: Props) {
  return (
    <View style={{flex: 1}}>
      <NavigationBar canGoBack />
      <View style={styles.container}>
        <Text style={styles.message}>Cart is empty</Text>
        <Button title="See Restaurants" onPress={props.onPress} />
      </View>
    </View>
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
