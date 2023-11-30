import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../types';
import { useAppContext } from '../Contexts/AppContext';

type Props = {
  title?: string;
  canGoBack?: boolean;
  cart?: boolean;
};
export function NavigationBar(props: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getCart } = useAppContext();

  return (
    <View style={styles.container}>
      {props.canGoBack && (
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-back" size={38} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.middleTextContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {props.cart && (
        <TouchableOpacity
          style={{ paddingEnd: 8 }}
          onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={32} />
          {getCart?.length ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartText}>{getCart?.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
  },
  middleTextContainer: {
    flexGrow: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 22,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
