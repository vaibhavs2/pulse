import React from 'react';

import {useNavigation, CommonActions} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import UserService from '../Service/UserService';

type Props = {
  title?: string;
  canGoBack?: boolean;
  canLogout?: boolean;
};
export function NavigationBar(props: Props) {
  const navigation = useNavigation();

  const onLogoutPressed = async () => {
    await UserService.userLogOut();
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });

    navigation.dispatch(resetAction);
  };

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

      {props.canLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPressed}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
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
  logoutButton: {paddingHorizontal: 5},
  logoutText: {fontWeight: 'bold'},
});
