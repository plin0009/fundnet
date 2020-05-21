import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MeStackParamList } from 'src/types';
import { Colors, Fonts } from '../styles';
import { Button, ClickableText } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

declare const global: { HermesInternal: null | {} };

interface Props {
  navigation: StackNavigationProp<MeStackParamList, 'Home'>;
}
const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.form}>
        <Text style={styles.title}>FundNet</Text>
        <Text style={styles.subtitle}>You aren't signed into FundNet.</Text>
        <Button
          title="Join"
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
  body: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: { flex: 1, padding: 40, justifyContent: 'center' },
  engine: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    color: '#0009',
    fontFamily: Fonts.family,
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.large,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
});

export default HomeScreen;
