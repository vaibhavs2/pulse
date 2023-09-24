import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {App} from './src/navigation/RootNavigation';

AppRegistry.registerComponent(appName, () => App);
