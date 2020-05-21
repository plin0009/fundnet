import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { MeStackParamList, BulletinsStackParamList } from './types';

import SignupScreen from './screens/SignupScreen';
import BulletinsScreen from './screens/BulletinsScreen';
import LoginScreen from './screens/LoginScreen';
import { Colors, Fonts } from './styles';
import MeScreen from './screens/MeScreen';

const MeStack = createStackNavigator<MeStackParamList>();
const BulletinsStack = createStackNavigator<BulletinsStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.background,
  },
  headerTintColor: Colors.primary,
  headerTitleStyle: {
    fontFamily: Fonts.family,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.family,
  },
};
export const MeStackScreen = () => {
  return (
    <MeStack.Navigator screenOptions={screenOptions}>
      <MeStack.Screen name="Me" component={MeScreen} />
      <MeStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Join' }}
      />
      <MeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Sign in' }}
      />
    </MeStack.Navigator>
  );
};

export const BulletinsStackScreen = () => {
  return (
    <BulletinsStack.Navigator screenOptions={screenOptions}>
      <BulletinsStack.Screen name="Bulletins" component={BulletinsScreen} />
    </BulletinsStack.Navigator>
  );
};
