import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MeStackParamList } from 'src/types';
import { Colors, Fonts } from '../styles';
import { Button, ClickableText } from '../components/Button';

declare const global: { HermesInternal: null | {} };

interface Props {
  navigation: StackNavigationProp<MeStackParamList, 'Home'>;
}
const HomeScreen = ({ navigation }: Props) => {
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
          title="Join FundNet"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
        <ClickableText
          title="Already have an account? Log in"
          onPress={() => {
            navigation.navigate('Login');
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
