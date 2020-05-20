import React from 'react';
import { SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BulletinsStackParamList } from 'src/types';

interface Props {
  navigation: StackNavigationProp<BulletinsStackParamList, 'Bulletins'>;
}
const BulletinsScreen = ({ navigation }: Props) => {
  return <SafeAreaView></SafeAreaView>;
};

export default BulletinsScreen;
