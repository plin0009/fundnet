import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Text, StyleSheet, Platform, View } from 'react-native';
import { Colors, Fonts } from '../styles';
import { Attribute } from '../types';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isSmall?: boolean;
}

interface AttributeButtonProps extends ButtonProps {
  value: Attribute;
}

const ButtonComponent = Platform.select({
  ios: TouchableOpacity,
  android: TouchableNativeFeedback,
  default: TouchableOpacity,
});

export const Button = ({ title, onPress, isSmall }: ButtonProps) => {
  return (
    <View style={[styles.wrapper]}>
      <ButtonComponent
        onPress={onPress}
        style={[styles.button, isSmall && styles.buttonSmall]}>
        <Text style={[styles.title, isSmall && styles.titleSmall]}>
          {title}
        </Text>
      </ButtonComponent>
    </View>
  );
};

export const ClickableText = ({ title, onPress }: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.clickableText}>
        <Text style={styles.subtitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const AttributeButton = ({
  title,
  onPress,
  value,
}: AttributeButtonProps) => {
  let color = Colors.background;
  if (value === 'YES') {
    color = Colors.success;
  }
  if (value === 'NO') {
    color = Colors.danger;
  }
  return (
    <View style={styles.attributeWrapper}>
      <ButtonComponent
        onPress={onPress}
        style={[styles.attributeButton, { backgroundColor: color }]}>
        <Text style={styles.attributeTitle}>{title}</Text>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  attributeWrapper: {
    margin: 5,
    borderRadius: 100,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  clickableText: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  attributeButton: { padding: 10, paddingHorizontal: 20 },
  title: {
    fontFamily: Fonts.family,
    fontSize: Fonts.size.larger,
    color: Colors.light,
  },
  subtitle: {
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    color: Colors.link,
  },
  attributeTitle: {
    fontFamily: Fonts.family,
    fontSize: Fonts.size.smaller,
    color: Colors.primary,
  },
  buttonSmall: { paddingVertical: 10 },
  titleSmall: { fontSize: Fonts.size.smaller },
});
