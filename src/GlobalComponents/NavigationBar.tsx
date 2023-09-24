import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  title?: string;
  canGoBack?: boolean;
};
export function NavigationBar(props: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {props.canGoBack && (
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-back" size={38} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.middleTextContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
  },
  middleTextContainer: {
    flexGrow: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 22,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
