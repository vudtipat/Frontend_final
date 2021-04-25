import * as React from 'react';
import Constants from 'expo-constants';
import { Image, View ,Text ,AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default class Splash extends React.Component {
    constructor(props)
    {
      super(props)
      setTimeout(() => {
        const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
        });
        this.props.navigation.dispatch(resetAction);
      }, 1000)
      this.state = {
        notification:false,
        expoPushToken:''
      }
      this.notificationListener = React.createRef();
      this.responseListener = React.createRef();
    }

    componentDidMount() {
      this.registerForPushNotificationsAsync().then(token => this.setState({expoPushToken:token}));
  
      // This listener is fired whenever a notification is received while the app is foregrounded
      this.notificationListener.current = Notifications.addNotificationReceivedListener(noti => {
        this.setState({notification:noti});
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
    }
  
    componentWillUnmount() {
      Notifications.removeNotificationSubscription(this.notificationListener);
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  
    registerForPushNotificationsAsync = async() => {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        alert('Must use physical device for Push Notifications');
      }
  
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      await AsyncStorage.setItem(
        'token',token
      );
      return token;
    }
    
    render() {
      return (
        <View style={{flex: 1, backgroundColor:'#8606AB'}}>
            <View style={{flex:0.9,width: '100%',justifyContent: 'center',alignItems: 'center'}}>
              <Image 
                  style={{width:500, height:500}}
                  source={require("./image/logo.png")}
              />
            </View>
        </View>
      );
    }
  }
