import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Product } from '../../../types';
import { FavouriteButton } from '../../../GlobalComponents';
import { Price } from '../../../GlobalComponents/Price';

type Props = {
  onPress: (product: Product) => void;
} & Product;

export function ProductItem({ onPress, ...props }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(props)} style={styles.container}>
      <Image source={{ uri: props.thumbnail }} style={styles.image} />
      <View>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {props.title}
        </Text>
        <Price price={props.price} discountPercentage={props.discountPercentage} />
        <View style={styles.horizontal}>
          <Text>{props.rating}</Text>
          <Ionicons name="star" style={styles.star} />
          <Text>Rating</Text>
        </View>
      </View>
      <FavouriteButton style={styles.favouriteBtn} productId={props.id} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
  },
  image: { width: '100%', height: 150 },
  favouriteBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  horizontal: { flexDirection: 'row', alignItems: 'center' },
  star: { marginHorizontal: 5 },
});
