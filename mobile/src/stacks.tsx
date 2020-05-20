import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MeStackParamList, BulletinsStackParamList } from './types';

import SignupScreen from './screens/SignupScreen';
import BulletinsScreen from './screens/BulletinsScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const MeStack = createStackNavigator<MeStackParamList>();
const BulletinsStack = createStackNavigator<BulletinsStackParamList>();

export const MeStackScreen = () => {
  return (
    <MeStack.Navigator>
      <MeStack.Screen name="Home" component={HomeScreen} />
      <MeStack.Screen name="Signup" component={SignupScreen} />
      <MeStack.Screen name="Login" component={LoginScreen} />
    </MeStack.Navigator>
  );
};

export const BulletinsStackScreen = () => {
  return (
    <BulletinsStack.Navigator>
      <BulletinsStack.Screen name="Bulletins" component={BulletinsScreen} />
    </BulletinsStack.Navigator>
  );
};
