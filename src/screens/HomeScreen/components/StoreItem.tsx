import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {StoreInfo} from '../../../types';

type Props = {
  onPress: (storeId: string) => void;
} & StoreInfo;

export function StoreItem({onPress, ...props}: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress(props.id)}
      style={styles.infoContainer}>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{props.name}</Text>
        <Text>Address: {props.address}</Text>
        <View style={styles.areaContainer}>
          <Text>Area: {props.area}</Text>
          <Text>
            {',  '}Route: {props.route}
          </Text>
        </View>
      </View>
      <Icon name="right" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginVertical: 8,
    borderBottomWidth: 2,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {fontWeight: 'bold'},
  areaContainer: {flexDirection: 'row'},
  error: {fontWeight: 'bold', color: 'red'},
});
