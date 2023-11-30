import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ErrorText} from './ErrorText';

type Props = {error: string; onRetryPressed: () => void};
export function LoadingError(props: Props) {
  return (
    <View style={styles.container}>
      {!!props.error ? (
        <>
          <ErrorText value={props.error} />
          <TouchableOpacity onPress={props.onRetryPressed}>
            <Text style={styles.retry}>Refetch!</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retry: {color: 'green', textDecorationLine: 'underline'},
});
