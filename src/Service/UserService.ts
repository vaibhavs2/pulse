import auth from '@react-native-firebase/auth';

class UserService {
  getCurrentUser() {
    return auth().currentUser;
  }
}

export default new UserService();
