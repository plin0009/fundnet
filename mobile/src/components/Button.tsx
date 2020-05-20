import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  Text,
  StyleSheet,
  Platform,
  View,
  GestureResponderEvent,
} from 'react-native';
import { Colors, Fonts } from '../styles';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const ButtonComponent = Platform.select({
  ios: TouchableOpacity,
  android: TouchableNativeFeedback,
  default: TouchableOpacity,
});

export const Button = ({ title, onPress }: Props) => {
  return (
    <View style={styles.wrapper}>
      <ButtonComponent onPress={onPress} style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </ButtonComponent>
    </View>
  );
};

export const ClickableText = ({ title, onPress }: Props) => {
  return (
    <View style={{}}>
      <TouchableOpacity onPress={onPress} style={styles.clickableText}>
        <Text style={styles.subtitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.family,
    fontSize: Fonts.size.larger,
    color: Colors.light,
  },
  clickableText: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    color: Colors.link,
  },
});
