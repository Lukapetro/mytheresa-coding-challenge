import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {DetailsScreen, HomeScreen, WishlistScreen} from 'screens';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Movie Browser',
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Movie Details',
        }}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'My Wishlist',
        }}
      />
    </Stack.Navigator>
  );
};
