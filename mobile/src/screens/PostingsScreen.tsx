import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts } from '../styles';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  PostingsStackParamList,
  RootStackParamList,
  daysOfWeek,
  timesOfDay,
  DayOfWeek,
} from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useQuery } from '@apollo/react-hooks';
import { GET_POSTINGS, PostingData, GET_ME, MeData } from '../queries';
import { Switch, ScrollView } from 'react-native-gesture-handler';
import Listing from '../components/Listing';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PostingsStackParamList, 'Postings'>,
    BottomTabNavigationProp<RootStackParamList, 'Postings'>
  >;
}
const PostingsScreen = ({ navigation }: Props) => {
  const { data } = useQuery<{ postings: PostingData[] }>(GET_POSTINGS);
  const { data: meData } = useQuery<{ me: MeData }>(GET_ME);

  const [filtering, setFiltering] = useState<boolean>(false);

  const me = (meData && meData.me) || null;

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>Postings</Text>
        <View style={[styles.filterBox, me === null && styles.disabled]}>
          <Text style={styles.subtitle}>Filter postings to fit me</Text>
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
            Create an account to show relevant postings only.
          </Text>
        )}
      </View>
      <ScrollView>
        {data && data.postings
          ? data.postings
              .filter((posting) => {
                if (filtering && me) {
                  // location filtering
                  // availability filtering
                  let totalCount = 0;
                  let meCount = 0;
                  if (
                    posting.filters.availabilities &&
                    posting.filters.availabilities[0]
                  ) {
                    (Object.keys(daysOfWeek) as Array<DayOfWeek>).forEach(
                      (day) => {
                        timesOfDay.forEach((time) => {
                          if (
                            posting.filters.availabilities[0][day][time] ===
                            'YES'
                          ) {
                            totalCount++;
                            if (me.availability[day][time] !== 'NO') {
                              meCount++;
                            }
                          }
                        });
                      },
                    );
                    if (totalCount && !meCount) {
                      return false;
                    }
                  }
                }
                return true;
              })
              .map((posting) => (
                <Listing
                  {...posting}
                  onPress={() => {
                    navigation.navigate('Posting', posting);
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

export default PostingsScreen;
