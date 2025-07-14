import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'react-native';
import { getColors } from '../styles/theme';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import NewUserScreen from '../features/cadastro/NewUserScreen';
import UserScreen from '../features/cadastro/UserScreen';
import MapScreen from '../features/map/MapScreen';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={({ navigation, route }) => ({
          headerShown: true,
          title: 'Consultar Organização',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.background,
        })}
      />
      <HomeStack.Screen 
        name="NewUserScreen" 
        component={NewUserScreen} 
        options={({ navigation, route }) => ({
          headerShown: true,
          title: 'Cadastro',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.background,
        })}
      />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NewUserScreen') {
            iconName = focused ? 'account-plus' : 'account-plus-outline';
          } else if (route.name === 'MapaTab') {
            iconName = focused ? 'map' : 'map-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NewUserScreen"
        component={NewUserScreen}
        options={{
          title: 'Cadastro',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="MapaTab"
        component={MapScreen}
        options={{
          title: 'Mapa',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
