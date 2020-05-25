import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, OrgStackParamList } from 'src/types';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../styles';
import { Button, ClickableText } from '../components/Button';
import Textbox from '../components/Textbox';
import { useMutation } from '@apollo/react-hooks';
import { AuthData, AuthVars, ORG_LOGIN } from '../queries';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OrgStackParamList, 'Login'>,
    BottomTabNavigationProp<RootStackParamList, 'Org'>
  >;
}
const OrgLoginScreen = ({ navigation }: Props) => {
  const [handleInput, setHandleInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const [login] = useMutation<{ orgLogin: AuthData }, AuthVars>(ORG_LOGIN, {
    variables: {
      handle: handleInput,
      pass: passInput,
    },
  });
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.form}>
        <Text style={styles.title}>Sign in to FundNet</Text>
        <Text style={styles.subtitle}>
          By signing in to FundNet, you can create, manage, and analyze the
          listings you create for the public.
        </Text>
        <Textbox label="Handle" value={handleInput} setValue={setHandleInput} />
        <Textbox
          label="Password"
          isPassword
          value={passInput}
          setValue={setPassInput}
        />
        <Button
          title="Sign in"
          onPress={async () => {
            try {
              await login();
            } catch (e) {
              console.log(JSON.stringify(e));
            }
            console.log('logged in');
            navigation.navigate('Org');
          }}
        />
        <ClickableText
          title="No account yet? Join FundNet"
          onPress={() => navigation.navigate('Signup')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    flex: 1,
    padding: 40,
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.larger,
    textAlign: 'center',
    margin: 20,
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
});

export default OrgLoginScreen;
