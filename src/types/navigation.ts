import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Product} from './ProductTypes';

export type RootStackParamList = {
  HomeScreen: undefined;
  InitialLoadingScreen: undefined;
  ProductDetailScreen: {product: Product};
  CartScreen: undefined;
};

export type NativeScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
