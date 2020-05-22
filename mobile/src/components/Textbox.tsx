import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts } from '../styles';

type Props = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  isPassword?: boolean;
  isNumeric?: boolean;
  isSmall?: boolean;
};

const Textbox = ({
  label,
  value,
  setValue,
  isPassword,
  isNumeric,
  isSmall,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, isSmall && styles.labelSmall]}>{label}</Text>
      <TextInput
        style={[styles.textbox, isSmall && styles.textboxSmall]}
        value={value}
        onChangeText={(text) => setValue(text)}
        secureTextEntry={isPassword}
        keyboardType={isNumeric ? 'numeric' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    flexGrow: 1,
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
  labelSmall: { fontSize: Fonts.size.small, marginBottom: 5 },
  textboxSmall: {
    fontSize: Fonts.size.small,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Textbox;
