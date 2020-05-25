import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BulletinData, ListingData } from '../queries';
import { Colors, Fonts } from '../styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface BulletinProps extends ListingData {
  onPress: () => void;
}

const Listing = ({ title, creator: { name }, onPress }: BulletinProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.light,
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.smaller,
    textAlign: 'center',
  },
  description: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
  },
});
export default Listing;
