import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '../../../types';
import { roundedTotalPrice } from '../../../Utils';

type Props = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
};
export const CartItem = ({ item, onIncrease, onDecrease }: Props) => {
  const sellingPrice = roundedTotalPrice(
    item.price - (item.price * (item.discountPercentage || 0)) / 100,
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          {item.discountPercentage ? (
            <Text style={styles.dummyPrice}>${item.price}</Text>
          ) : null}
          <Text style={styles.itemPrice}>
            {sellingPrice} X {item.count} - $
            {roundedTotalPrice(sellingPrice * item.count)}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onDecrease} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemCount}>{item.count}</Text>
          <TouchableOpacity onPress={onIncrease} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
    marginStart: 5,
  },
  discountedPrice: {
    fontSize: 14,
    color: 'green',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1AACAC',
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  dummyPrice: { textDecorationLine: 'line-through', color: '#555' },
});
