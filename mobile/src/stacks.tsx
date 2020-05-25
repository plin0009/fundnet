import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Colors, Fonts } from './styles';

import {
  MeStackParamList,
  OrgStackParamList,
  BulletinsStackParamList,
  PostingsStackParamList,
} from './types';

import SignupScreen from './screens/SignupScreen';
import BulletinsScreen from './screens/BulletinsScreen';
import LoginScreen from './screens/LoginScreen';
import MeScreen from './screens/MeScreen';
import PostingsScreen from './screens/PostingsScreen';
import ListingScreen from './screens/BulletinScreen';
import PostingScreen from './screens/PostingScreen';
import OrgScreen from './screens/OrgScreen';
import OrgSignupScreen from './screens/OrgSignupScreen';
import OrgLoginScreen from './screens/OrgLoginScreen';

const MeStack = createStackNavigator<MeStackParamList>();
const OrgStack = createStackNavigator<OrgStackParamList>();
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

export const OrgStackScreen = () => {
  return (
    <OrgStack.Navigator screenOptions={screenOptions}>
      <OrgStack.Screen
        name="Org"
        component={OrgScreen}
        options={{ title: 'Organization' }}
      />
      <OrgStack.Screen name="Signup" component={OrgSignupScreen} />
      <OrgStack.Screen name="Login" component={OrgLoginScreen} />
    </OrgStack.Navigator>
  );
};
export const BulletinsStackScreen = () => {
  return (
    <BulletinsStack.Navigator screenOptions={screenOptions}>
      <BulletinsStack.Screen name="Bulletins" component={BulletinsScreen} />
      <BulletinsStack.Screen name="Bulletin" component={ListingScreen} />
    </BulletinsStack.Navigator>
  );
};

export const PostingsStackScreen = () => {
  return (
    <PostingsStack.Navigator screenOptions={screenOptions}>
      <PostingsStack.Screen name="Postings" component={PostingsScreen} />
      <PostingsStack.Screen name="Posting" component={PostingScreen} />
    </PostingsStack.Navigator>
  );
};
