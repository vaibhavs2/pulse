import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Cart, CuisineItem} from '../types';
import {CART_KEY} from '../Constants';

const defaultAppState = {
  getCart: {} as Cart | undefined,
  addItemToCart: (shopId: string, cusineId: string, item: CuisineItem) => {},
};

const _AppContext = createContext(defaultAppState);
export const useAppContext = () => useContext(_AppContext);

type Props = {children: ReactNode};

export function AppContext(props: Props) {
  const [getCart, setCart] = useState<Cart>();

  useEffect(() => {
    hydrateCartFromStorage();
  }, []);

  const storeLocally = async (cart: Cart) => {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      // saving error
    }
  };

  const hydrateCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_KEY);
      if (storedCart !== null) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      // error reading value
    }
  };

  const addItemToCart = (
    shopId: string,
    cusineId: string,
    item: CuisineItem,
  ) => {
    if (!getCart) {
      addItemForShop(shopId, cusineId, item);
      return;
    }
    if (getCart.shopId != shopId) {
      Alert.alert(
        'You need to clear the cart to add this',
        'You can add items from single shop',
        [
          {text: 'OK'},
          {
            text: 'Add it',
            onPress: () => {
              addItemForShop(shopId, cusineId, item);
            },
          },
        ],
      );
      return;
    }
    const index = getCart.items.findIndex(
      addedItem => addedItem.itemId === item.itemId,
    );

    if (index == -1) {
      getCart.items.push({...item, count: 1, cusineId});
    } else {
      getCart.items[index].count++;
    }
    setCart({...getCart});
    storeLocally(getCart);
  };

  const addItemForShop = async (
    shopId: string,
    cusineId: string,
    item: CuisineItem,
  ) => {
    const cart = {shopId, items: [{...item, cusineId, count: 1}]};
    setCart(cart);
    storeLocally(cart);
  };

  return (
    <_AppContext.Provider
      value={{
        addItemToCart,
        getCart,
      }}>
      {props.children}
    </_AppContext.Provider>
  );
}
