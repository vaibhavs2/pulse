import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Restaurant} from '../../../types';
import {useAppContext} from '../../../Contexts/AppContext';

type Props = {
  onPress: (storeId: string, name: string) => void;
} & Restaurant;

export function RestaurantItem({onPress, ...props}: Props) {
  const {getCart} = useAppContext();
  const itemsAddedFromShop =
    (getCart?.shopId == props.id && getCart.items.length) || 0;
  return (
    <TouchableOpacity
      onPress={() => onPress(props.id, props.name)}
      style={styles.topcontainer}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image source={{uri: props.imageUrl}} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {props.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.infoText}>{props.averageRating} </Text>
            <Ionicons name="star" size={20} />
            <Text style={styles.infoText}> rating</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.infoText}>{props.distance} km</Text>
            <Text style={styles.infoText}> away</Text>
          </View>
          {!!itemsAddedFromShop && (
            <View style={styles.itemAddedContainer}>
              <Text style={styles.itemAdded}>
                {itemsAddedFromShop} item{itemsAddedFromShop == 1 ? '' : 's'}{' '}
                added
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  name: {fontWeight: 'bold', fontSize: 24},
  areaContainer: {flexDirection: 'row'},
  error: {fontWeight: 'bold', color: 'red'},
  infoText: {fontSize: 20},
  image: {width: '100%', height: 150, borderRadius: 12},
  infoContainer: {flex: 1.4, marginStart: 15, paddingEnd: 8},
  container: {flex: 1, flexDirection: 'row'},
  itemAddedContainer: {flex: 1, justifyContent: 'flex-end'},
  itemAdded: {color: 'green', fontWeight: 'bold'},
});
