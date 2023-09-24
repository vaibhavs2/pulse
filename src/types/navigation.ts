import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  InitialLoadingScreen: undefined;
};

export type NativeScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
