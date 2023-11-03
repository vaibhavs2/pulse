import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  isLoading?: boolean;
  title: string;
  onPress: () => void;
} & TouchableOpacityProps;

export function PulseButton({isLoading, title, style, ...props}: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
