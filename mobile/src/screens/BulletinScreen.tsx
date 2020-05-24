import React from 'react';
import { BulletinData } from '../queries';
import { SafeAreaView, StyleSheet, Text, Linking } from 'react-native';
import { Colors, Fonts } from '../styles';
import { RouteProp } from '@react-navigation/native';
import { BulletinsStackParamList } from '../types';
import { ScrollView } from 'react-native-gesture-handler';
import { ClickableText, Button } from '../components/Button';

interface BulletinScreenProps {
  route: RouteProp<BulletinsStackParamList, 'Bulletin'>;
}

const BulletinScreen = ({ route }: BulletinScreenProps) => {
  const {
    title,
    creator: { name },
    description,
    website,
  } = route.params;

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button
          title={'Visit site'}
          isSmall
          onPress={() => {
            Linking.openURL(website);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 40 },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.larger,
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.medium,
  },
  description: {
    color: Colors.primary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
    marginVertical: 20,
  },
});

export default BulletinScreen;
