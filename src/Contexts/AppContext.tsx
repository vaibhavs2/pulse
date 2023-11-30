import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CartItem, Cart, Wishlist } from '../types';
import { CART_KEY } from '../Constants';
import { LayoutAnimation } from 'react-native';

const defaultAppState = {
  getCart: [] as Cart,
  addItemToCart: (item: CartItem) => {},
  reduceItemQuantity: (itemId: number, count: number) => {},
  wishlist: [] as Wishlist,
  updateWishlist: (productId: number) => {},
};

const _AppContext = createContext(defaultAppState);
export const useAppContext = () => useContext(_AppContext);

type Props = { children: ReactNode };

export function AppContext(props: Props) {
  const [getCart, setCart] = useState<Cart>([]);
  const [wishlist, setWishlist] = useState<Wishlist>([]);

  useEffect(() => {
    hydrateCartFromStorage();
  }, []);

  const storeLocally = useCallback(async (cart: Cart) => {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      // saving error
    }
  }, []);

  const hydrateCartFromStorage = useCallback(async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_KEY);
      if (storedCart !== null) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      // error reading value
    }
  }, []);

  const addItemToCart = useCallback(
    (item: CartItem) => {
      if (!getCart) {
        setCart([item]);
        return;
      }

      const index = getCart.findIndex(addedItem => addedItem.id === item.id);

      if (index == -1) {
        getCart.push({ ...item, count: 1 });
      } else {
        getCart[index].count++;
      }
      setCart([...getCart]);
      storeLocally(getCart);
    },
    [getCart],
  );

  const reduceItemQuantity = useCallback(
    (itemId: number, count: number) => {
      if (!getCart) {
        return;
      }
      let updatedCart = getCart;
      if (count == 1) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        updatedCart = getCart.filter(item => item.id !== itemId);
      } else {
        updatedCart = getCart.map(item => {
          if (item.id == itemId) {
            item.count--;
            return { ...item };
          }
          return item;
        });
      }

      setCart(updatedCart);
      storeLocally(updatedCart);
    },
    [getCart],
  );

  const updateWishlist = useCallback(
    (productId: number) => {
      setWishlist(prevWishlist => {
        const index = prevWishlist.findIndex(item => item.productId === productId);
        if (index === -1) {
          return [...prevWishlist, { productId }];
        } else {
          return prevWishlist.filter(item => item.productId !== productId);
        }
      });
    },
    [wishlist],
  );
  return (
    <_AppContext.Provider
      value={{
        addItemToCart,
        getCart,
        reduceItemQuantity,
        wishlist,
        updateWishlist,
      }}>
      {props.children}
    </_AppContext.Provider>
  );
}
