import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  InitialLoadingScreen: undefined;
  RestaurantMenu: {name: string; storeId: string};
  CartScreen: undefined;
};

export type NativeScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
