import React, { useCallback } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppContext } from '../Contexts/AppContext';

type Props = {
  productId: number;
  onPress?: () => void;
  style?: ViewStyle;
};
export function FavouriteButton(props: Props) {
  const { wishlist, updateWishlist } = useAppContext();
  const isWishListed = !!wishlist.find(item => item.productId === props.productId);

  const wishlistPressed = useCallback(() => {
    updateWishlist(props.productId);
  }, []);

  return (
    <TouchableOpacity style={props.style} onPress={wishlistPressed}>
      {isWishListed ? (
        <Ionicons name="heart" color={'red'} size={24} />
      ) : (
        <Ionicons name="heart-outline" color={'black'} size={24} />
      )}
    </TouchableOpacity>
  );
}
