import 'react-native-gesture-handler';
import React from 'react';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './src/types';

import { StatusBar } from 'react-native';
import { MeStackScreen, BulletinsStackScreen } from './src/stacks';
import { Fonts, Colors } from './src/styles';
import { getTabBarIcon } from './src/icons';

const serverPort = 8000;

const httpLink = createHttpLink({
  uri: `http://localhost:${serverPort}`,
  credentials: 'include',
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
});

const Stack = createBottomTabNavigator<RootStackParamList>();

const tabBarOptions: BottomTabBarOptions = {
  labelStyle: {
    fontFamily: Fonts.family,
  },
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.secondary,
  style: {
    backgroundColor: Colors.background,
  },
  showLabel: false,
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator tabBarOptions={tabBarOptions}>
          <Stack.Screen
            name="Bulletins"
            component={BulletinsStackScreen}
            options={{
              tabBarIcon: (props) =>
                getTabBarIcon({ name: 'Bulletins', ...props }),
            }}
          />
          <Stack.Screen
            name="Me"
            component={MeStackScreen}
            options={{
              tabBarIcon: (props) => getTabBarIcon({ name: 'Me', ...props }),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
