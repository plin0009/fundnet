import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts } from '../styles';

type Props = {
  label: String;
  value: string;
  setValue: Function;
  isPassword?: boolean;
};

const Textbox = ({ label, value, setValue, isPassword }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textbox}
        value={value}
        onChangeText={(text) => setValue(text)}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  textbox: {
    backgroundColor: Colors.white,
    padding: 20,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  label: {
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    marginBottom: 10,
    color: Colors.primary,
  },
});

export default Textbox;
