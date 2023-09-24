import React from 'react';
import {Text, TextProps} from 'react-native';

export function ErrorText({
  value,
  style,
  ...props
}: TextProps & {value: string}) {
  return (
    <Text
      style={[
        {
          color: 'red',
          fontSize: 12,
          marginVertical: 5,
          textAlign: 'center',
        },
        style,
      ]}
      {...props}>
      {value}
    </Text>
  );
}
