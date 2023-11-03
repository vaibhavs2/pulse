import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {CartCuisineItem} from '../../../types';

export function CartItem({item}: {item: CartCuisineItem}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          ₹{item.price} X {item.count}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
});
