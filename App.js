import React from 'react';
import {AsyncStorage, View , Platform} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';
// import * as Permissions from "expo-permissions";
// import { Notifications } from 'expo'




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };

  }

  async componentDidMount() {

    console.disableYellowBox = true;

    // if (Platform.OS === 'android') {
    //   Notifications.createChannelAndroidAsync('orders', {
    //     name: 'Chat messages',
    //     sound: true,
    //   });
    // }

    // Notifications.addListener(this.handleNotification);


    await Font.loadAsync({
      cairo             : require('./assets/fonts/Cairo-Regular.ttf'),
      cairoBold         : require('./assets/fonts/Cairo-Bold.ttf'),
      Roboto            : require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium     : require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });

  }

  //
  // handleNotification = (notification) => {
  //   if (notification && notification.origin !== 'received') {
  //     this.props.navigation.navigate('notifications');
  //   }
  // }


  // async componentWillMount() {
  //
  //   const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //   );
  //
  //   let finalStatus = existingStatus;
  //
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //
  //   if (finalStatus !== 'granted') {
  //     return;
  //   }
  //
  //   const deviceId = await Notifications.getExpoPushTokenAsync();
  //   console.log('deviceIddeviceId' , deviceId)
  //
  //   AsyncStorage.setItem('deviceID', deviceId);
  //
  // }

  render() {

    if (!this.state.isReady) {
      return (
          <View />
      );
    }

    return (
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <Root>
              <AppNavigator />
            </Root>
          </PersistGate>
        </Provider>
    );
  }
}







// Keystore password: 74be81dfdbc34c61bf78a46914e5550e
// Key alias:         QHNoYW1zXzE0L2FrbC1tYW56ZWx5
// Key password:      69a987c791e84941926478c930f44e55
