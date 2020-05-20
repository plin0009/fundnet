import 'react-native-gesture-handler';
import React from 'react';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './src/types';

import { StatusBar } from 'react-native';
import { MeStackScreen, BulletinsStackScreen } from './src/stacks';

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

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen name="Bulletins" component={BulletinsStackScreen} />
          <Stack.Screen name="Me" component={MeStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
