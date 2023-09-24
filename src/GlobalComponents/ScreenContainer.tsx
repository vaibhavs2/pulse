import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  Edge,
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {NavigationBar} from './NavigationBar';

type Props = {
  children: React.ReactNode;
  keyboardAvoidingView?: boolean;
  contentContainerStyle?: ViewStyle;
  noDefaultPadding?: boolean;
  safeAreaViewProps?: NativeSafeAreaViewProps;
  navigationTitle?: string;
  canGoback?: boolean;
  noNavigationBar?: boolean;
  /** default :- ["top" , "right" , "bottom" , "left"] */
  SafeEdges?: Array<Edge>;
};
export function ScreenContainer(props: Props) {
  return (
    <SafeAreaView
      edges={props.SafeEdges}
      style={styles.container}
      {...props.safeAreaViewProps}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      {props.noNavigationBar == true ? null : (
        <NavigationBar
          title={props.navigationTitle}
          canGoBack={props.canGoback}
        />
      )}
      {props.keyboardAvoidingView ? (
        <KeyboardAvoidingView
          behavior={Platform.select({android: undefined, default: 'padding'})}
          style={[
            styles.container,
            !props.noDefaultPadding && styles.paddHorizontal,
            props.contentContainerStyle,
          ]}>
          {props.children}
        </KeyboardAvoidingView>
      ) : (
        <View
          style={[
            styles.container,
            !props.noDefaultPadding && styles.paddHorizontal,
            props.contentContainerStyle,
          ]}>
          {props.children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  paddHorizontal: {paddingHorizontal: 12},
});
