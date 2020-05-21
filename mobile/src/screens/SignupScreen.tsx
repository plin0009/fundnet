import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MeStackParamList } from 'src/types';
import Textbox from '../components/Textbox';
import { Fonts, Colors } from '../styles';
import { Button, ClickableText } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP, AuthData, AuthVars } from '../queries';

interface Props {
  navigation: StackNavigationProp<MeStackParamList, 'Signup'>;
}

const SignupScreen = ({ navigation }: Props) => {
  const [handleInput, setHandleInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const [signup] = useMutation<{ signup: AuthData }, AuthVars>(SIGNUP, {
    variables: {
      handle: handleInput,
      pass: passInput,
    },
  });

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.form}>
        <Text style={styles.title}>Join FundNet</Text>
        <Text style={styles.subtitle}>
          Creating an account allows you to save and personalize your
          money-making opportunities.
        </Text>
        <Textbox label="Handle" value={handleInput} setValue={setHandleInput} />
        <Textbox
          label="Password"
          isPassword
          value={passInput}
          setValue={setPassInput}
        />
        <Button
          title="Join"
          onPress={async () => {
            // navigation.navigate('Home');
            await signup();
            console.log('signed up');
          }}
        />
        <ClickableText
          title="Have an account? Log in"
          onPress={() => {
            navigation.navigate('Login');
          }}
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
export default SignupScreen;
