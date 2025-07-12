import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {COLORS} from '../styles/theme';
import HomeScreen from '../features/home/HomeScreen';
import MapScreen from '../features/map/MapScreen';
import UserDetailScreen from '../features/map/UserDetailScreen';
import { User } from '../types/user';
import NewUserScreen from '../features/cadastro/NewUserScreen';
import UserScreen from '../features/cadastro/UserScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type HomeStackParamList = {
  Home: undefined;
  User: undefined;
  NewUser: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();
const CadastroStack = createStackNavigator();
export type MapStackParamList = {
  Map: undefined;
  UserDetail: { user: User };
};
const MapStack = createStackNavigator<MapStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NewUser"
        component={NewUserScreen}
        options={{
          title: 'Novo Cliente',
          headerStyle: {
            backgroundColor: '#0B4B3C',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="User"
        component={UserScreen}
        options={{
          title: 'Cadastros',
          headerStyle: {
            backgroundColor: '#0B4B3C',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

function CadastroStackScreen() {
  return (
    <CadastroStack.Navigator>
      <CadastroStack.Screen
        name="User"
        component={UserScreen}
        options={{
          title: 'Cadastros',
          headerStyle: {
            backgroundColor: '#0B4B3C',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
    </CadastroStack.Navigator>
  );
}

function MapStackScreen() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <MapStack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{
          title: 'Detalhes do Cliente',
          headerStyle: { backgroundColor: '#0B4B3C' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
        }}
      />
    </MapStack.Navigator>
  );
}

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY,
        tabBarInactiveTintColor: '#999', 
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CadastroTab"
        component={CadastroStackScreen}
        options={{
          title: 'Cadastros',
          tabBarIcon: ({ color, size }) => (
            <Icon name="supervised-user-circle" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapStackScreen}
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
