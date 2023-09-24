import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import {NativeScreenProps} from '../../types';
import {ErrorText, PulseButton, ScreenContainer} from '../../GlobalComponents';
import {USER_NAME_SUFFIX} from '../../Constants';

export function LoginScreen(props: NativeScreenProps<'LoginScreen'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInStatus, setSignInStatus] = useState({
    loading: false,
    errorMessage: '',
  });

  const handleUsernameChange = (text: string) => {
    setSignInStatus({...signInStatus, errorMessage: ''});
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setSignInStatus({...signInStatus, errorMessage: ''});
    setPassword(text);
  };

  const onSubmitPressed = async () => {
    let errorMessage = '';

    if (!username) {
      errorMessage = 'We need username to log you in';
      setSignInStatus({...signInStatus, errorMessage: errorMessage});
      return;
    }
    if (!password) {
      errorMessage = 'We need password to log you in';
      setSignInStatus({...signInStatus, errorMessage: errorMessage});
      return;
    }

    const usernameWithDomain = username + USER_NAME_SUFFIX;
    setSignInStatus({loading: true, errorMessage: ''});
    try {
      await auth().signInWithEmailAndPassword(usernameWithDomain, password);
      props.navigation.replace('HomeScreen');
    } catch (signInError: any) {
      errorMessage = 'Something went wrong, try again later please!';
      switch (signInError.code) {
        case 'auth/wrong-password':
          errorMessage = 'You entered wrong password';
          break;
        case 'auth/user-not-found':
        case 'auth/invalid-login': // for now firebase returning invalid-login if user not registered
          errorMessage = 'User not found, try changing password or username';
          break;
      }
    }
    setSignInStatus({loading: false, errorMessage: errorMessage});
  };

  return (
    <ScreenContainer keyboardAvoidingView navigationTitle="Log in">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Your Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <ErrorText value={signInStatus.errorMessage} />
        <PulseButton
          title="Login"
          onPress={onSubmitPressed}
          isLoading={signInStatus.loading}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 12,
    textAlign: 'center',
  },
});
