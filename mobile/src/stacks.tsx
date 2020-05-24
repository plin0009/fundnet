import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Colors, Fonts } from './styles';

import {
  MeStackParamList,
  BulletinsStackParamList,
  PostingsStackParamList,
} from './types';

import SignupScreen from './screens/SignupScreen';
import BulletinsScreen from './screens/BulletinsScreen';
import LoginScreen from './screens/LoginScreen';
import MeScreen from './screens/MeScreen';
import PostingsScreen from './screens/PostingsScreen';
import BulletinScreen from './screens/BulletinScreen';

const MeStack = createStackNavigator<MeStackParamList>();
const BulletinsStack = createStackNavigator<BulletinsStackParamList>();
const PostingsStack = createStackNavigator<PostingsStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.background,
  },
  headerTintColor: Colors.primary,
  headerTitleStyle: {
    fontFamily: Fonts.family.regular,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.family.regular,
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
      <BulletinsStack.Screen name="Bulletin" component={BulletinScreen} />
    </BulletinsStack.Navigator>
  );
};

export const PostingsStackScreen = () => {
  return (
    <PostingsStack.Navigator screenOptions={screenOptions}>
      <PostingsStack.Screen name="Postings" component={PostingsScreen} />
    </PostingsStack.Navigator>
  );
};
