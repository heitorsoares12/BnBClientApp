import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import MapScreen from '../features/map/MapScreen';
import NewUserScreen from '../features/cadastro/NewUserScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type HomeStackParamList = {
  Home: undefined;
  NewUser: undefined;
};

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <HomeStackNavigator.Navigator>
    <HomeStackNavigator.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Usuários'}}
    />
    <HomeStackNavigator.Screen
      name="NewUser"
      component={NewUserScreen}
      options={{title: 'Novo Cliente'}}
    />
  </HomeStackNavigator.Navigator>
);

export type AppTabParamList = {
  HomeTab: undefined;
  MapTab: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        title: 'Home',
        tabBarIcon: ({color, size}) => (
          <Icon name="list" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="MapTab"
      component={MapScreen}
      options={{
        title: 'Mapa',
        tabBarIcon: ({color, size}) => (
          <Icon name="map" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppStack;
