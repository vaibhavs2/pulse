import auth from '@react-native-firebase/auth';

class UserService {
  getCurrentUser() {
    return auth().currentUser;
  }
  async userLogOut() {
    await auth().signOut();
  }
}

export default new UserService();
