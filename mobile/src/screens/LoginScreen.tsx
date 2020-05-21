import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { MeStackParamList } from 'src/types';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../styles';
import { Button, ClickableText } from '../components/Button';
import Textbox from '../components/Textbox';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN, AuthData, AuthVars } from '../queries';

interface Props {
  navigation: StackNavigationProp<MeStackParamList, 'Login'>;
}
const LoginScreen = ({ navigation }: Props) => {
  const [handleInput, setHandleInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const [login] = useMutation<{ login: AuthData }, AuthVars>(LOGIN, {
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
          By signing in to FundNet, you'll see the content that's relevant to
          you.
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
            await login();
            console.log('logged in');
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
    fontFamily: Fonts.family,
    fontSize: Fonts.size.larger,
    textAlign: 'center',
    margin: 20,
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
});

export default LoginScreen;
