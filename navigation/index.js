import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';


import Welcome from '../screens/Welcome';
import Garages from '../screens/Garages';
import Vehicles from '../screens/Vehicles';
import NewVehicle from '../screens/NewVehicle';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import Map from '../screens/Map';
import NewGarage from '../screens/NewGarage';
import Browse from '../screens/Browse';
// import Product from '../screens/Product';
import Settings from '../screens/Settings';
// import Brow from '../screens/Brow';
// import Explore from'../screens/Explore';

import { theme } from '../constants';

const screens = createStackNavigator({
  Welcome,
  Vehicles,
  NewVehicle,
  Login,
  SignUp,
  Forgot,
  Map,
  Garages,
  NewGarage,
  Browse,
  // Product,
  // Brow,
  Settings,
  // Explore,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
});

export default createAppContainer(screens);