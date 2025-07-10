import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MapScreen from '../features/map/MapScreen';

export type AppTabParamList = {
  HomeStack: undefined;
  Map: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
    </Tab.Navigator>
  );
}
