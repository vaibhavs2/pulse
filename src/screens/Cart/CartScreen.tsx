import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';

import {CartItem} from './components/CartItem';
import {NativeScreenProps} from '../../types';
import {useAppContext} from '../../Contexts/AppContext';
import {EmptyCart} from './components/EmptyCart';
import {ScreenContainer} from '../../GlobalComponents';

type Props = NativeScreenProps<'CartScreen'>;
export function CartScreen(props: Props) {
  const {getCart} = useAppContext();
  if (!getCart) {
    return (
      <EmptyCart
        onPress={() => {
          props.navigation.navigate('HomeScreen');
        }}
      />
    );
  }

  const total = getCart.items.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );
  return (
    <ScreenContainer canGoback navigationTitle="Cart">
      <FlatList
        data={getCart.items}
        keyExtractor={item => item.itemId}
        renderItem={({item}) => <CartItem item={item} />}
      />
      <View style={styles.payContainer}>
        <Text style={styles.totalPrice}>Total Price: ₹{total}</Text>
        <Button
          title="Proceed to Pay"
          onPress={() => console.log('Proceed to pay pressed')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  totalPrice: {
    fontSize: 18,
    textAlign: 'right',
    marginTop: 10,
  },
  payContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
