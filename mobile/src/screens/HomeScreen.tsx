import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/types';
import {Colors, Fonts} from '../styles';
import {Button} from '../components/Button';

declare const global: {HermesInternal: null | {}};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      {global.HermesInternal == null ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.text}>FundNet</Text>
        <Button
          title="Click me"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    color: '#0009',
    fontFamily: Fonts.family,
  },
  text: {
    fontFamily: Fonts.family,
    fontSize: 30,
  },
});

export default HomeScreen;
