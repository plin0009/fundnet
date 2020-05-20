import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { MeStackParamList } from 'src/types';
import { SafeAreaView } from 'react-native';

interface Props {
  navigation: StackNavigationProp<MeStackParamList, 'Login'>;
}
const LoginScreen = ({ navigation }: Props) => {
  return <SafeAreaView></SafeAreaView>;
};

export default LoginScreen;
