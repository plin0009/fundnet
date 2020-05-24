import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../styles';

const PostingsScreen = ({ navigation }: Props) => {
  return <SafeAreaView style={styles.body}></SafeAreaView>;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default PostingsScreen;
