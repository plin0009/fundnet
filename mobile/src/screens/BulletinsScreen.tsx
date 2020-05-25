import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BulletinsStackParamList,
  RootStackParamList,
  Attributes,
  attributes,
} from '../types';
import { Colors, Fonts } from '../styles';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import { GET_BULLETINS, BulletinData, MeData, GET_ME } from '../queries';
import Listing from '../components/Listing';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<BulletinsStackParamList, 'Bulletins'>,
    BottomTabNavigationProp<RootStackParamList, 'Bulletins'>
  >;
}
const BulletinsScreen = ({ navigation }: Props) => {
  const { data } = useQuery<{ bulletins: BulletinData[] }>(GET_BULLETINS);
  const { data: meData } = useQuery<{ me: MeData }>(GET_ME);

  const [filtering, setFiltering] = useState<boolean>(false);

  const me = (meData && meData.me) || null;

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>Bulletins</Text>
        <View style={[styles.filterBox, me === null && styles.disabled]}>
          <Text style={styles.subtitle}>Filter bulletins to fit me</Text>
          <Switch
            value={filtering}
            onValueChange={(newValue) => setFiltering(() => newValue)}
            thumbColor={Colors.light}
            trackColor={{ false: Colors.link, true: Colors.success }}
            ios_backgroundColor={Colors.link}
            disabled={me === null}
          />
        </View>
        {me === null && (
          <Text style={styles.note}>
            Create an account to show relevant bulletins only.
          </Text>
        )}
      </View>
      <ScrollView>
        {data && data.bulletins
          ? data.bulletins
              .filter((bulletin) => {
                if (filtering && me !== null) {
                  if (
                    bulletin.filters.maxAge &&
                    me.minAge &&
                    me.minAge > bulletin.filters.maxAge
                  ) {
                    return false;
                  }
                  if (
                    bulletin.filters.minAge &&
                    me.maxAge &&
                    me.maxAge < bulletin.filters.minAge
                  ) {
                    return false;
                  }
                  if (
                    bulletin.filters.maxIncome &&
                    me.income &&
                    me.income > bulletin.filters.maxIncome
                  ) {
                    return false;
                  }
                  if (
                    bulletin.filters.minIncome &&
                    me.income &&
                    me.income < bulletin.filters.minIncome
                  ) {
                    return false;
                  }

                  const attributesList = Object.keys(attributes) as Array<
                    Attributes
                  >;
                  for (let i = 0; i < attributesList.length; i++) {
                    const attribute = attributesList[i];
                    if (
                      bulletin.filters[attribute] === 'NO' &&
                      me[attribute] === 'YES'
                    ) {
                      return false;
                    }
                    if (
                      bulletin.filters[attribute] === 'YES' &&
                      me[attribute] === 'NO'
                    ) {
                      return false;
                    }
                  }
                  if (
                    bulletin.filters.employmentHours.length &&
                    bulletin.filters.employmentHours.indexOf(
                      me.employmentHours,
                    ) !== -1 &&
                    me.employmentHours
                  ) {
                    return false;
                  }
                  if (
                    bulletin.filters.employmentStatus.length &&
                    bulletin.filters.employmentStatus.indexOf(
                      me.employmentStatus,
                    ) !== -1 &&
                    me.employmentStatus
                  ) {
                    return false;
                  }
                }
                return true;
              })
              .map((bulletin) => (
                <Listing
                  key={bulletin._id}
                  {...bulletin}
                  onPress={() => {
                    navigation.navigate('Bulletin', bulletin);
                  }}
                />
              ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.large,
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
  },
  note: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.smaller,
  },
  headerBox: {
    padding: 40,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabled: { opacity: 0.6 },
});
export default BulletinsScreen;
