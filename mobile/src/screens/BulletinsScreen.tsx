import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BulletinsStackParamList } from 'src/types';
import { Colors } from '../styles';

interface Props {
  navigation: StackNavigationProp<BulletinsStackParamList, 'Bulletins'>;
}
const BulletinsScreen = ({ navigation }: Props) => {
  return <SafeAreaView style={styles.body}></SafeAreaView>;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
export default BulletinsScreen;
