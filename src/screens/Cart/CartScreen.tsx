import React, { useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import { CartItem } from './components/CartItem';
import { CartItem as CartItemType, NativeScreenProps } from '../../types';
import { useAppContext } from '../../Contexts/AppContext';
import { EmptyCart } from './components/EmptyCart';
import { ScreenContainer } from '../../GlobalComponents';
import { roundedTotalPrice } from '../../Utils';

type Props = NativeScreenProps<'CartScreen'>;
export function CartScreen(props: Props) {
  const { getCart, reduceItemQuantity, addItemToCart } = useAppContext();
  /**
   * Need to fetch item price every time when user opens the cart screen to see the latest price
   */

  const renderCartItem = ({ item }: { item: CartItemType }) => {
    return (
      <CartItem
        key={`item-cart-item-${item.id}`}
        item={item}
        onDecrease={() => reduceItemQuantity(item.id, item.count)}
        onIncrease={() => addItemToCart(item)}
      />
    );
  };

  if (getCart?.length == 0) {
    return (
      <EmptyCart
        onPress={() => {
          props.navigation.navigate('HomeScreen');
        }}
      />
    );
  }

  const totalPrice = getCart?.reduce((acc, item) => {
    const sellingPrice = item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return roundedTotalPrice(acc + sellingPrice * item.count);
  }, 0);

  return (
    <ScreenContainer canGoback navigationTitle="Cart">
      <FlatList
        data={getCart}
        keyExtractor={item => `cartItem${item.id}`}
        renderItem={renderCartItem}
      />
      <View style={styles.payContainer}>
        <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
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
