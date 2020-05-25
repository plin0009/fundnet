import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts } from '../styles';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrgStackParamList, RootStackParamList } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useQuery } from '@apollo/react-hooks';
import { GET_ORG_ME, OrgMeData } from '../queries';
import { Button, ClickableText } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import Listing from '../components/Listing';

interface OrgScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OrgStackParamList, 'Org'>,
    BottomTabNavigationProp<RootStackParamList, 'Org'>
  >;
}

const OrgScreen = ({ navigation }: OrgScreenProps) => {
  const { data } = useQuery<{ orgMe: OrgMeData }>(GET_ORG_ME);

  return (
    <SafeAreaView style={styles.body}>
      {data && data.orgMe ? (
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Text style={styles.subtitle}>
              {`${data.orgMe.name} @${data.orgMe.handle}`}
            </Text>
            <ClickableText
              title="Sign out"
              onPress={async () => {
                navigation.navigate('Login');
              }}
            />
          </View>
          <ScrollView>
            <Text style={styles.header}>My bulletins</Text>
            {data.orgMe.bulletins.length > 0 ? (
              data.orgMe.bulletins.map((bulletin) => (
                <Listing
                  key={bulletin._id}
                  {...bulletin}
                  onPress={() => {
                    navigation.navigate('Bulletins', {
                      screen: 'Bulletin',
                      initial: false,
                      params: bulletin,
                    });
                  }}
                />
              ))
            ) : (
              <Text style={styles.subheader}>You have no bulletins</Text>
            )}
            <Text style={styles.header}>My postings</Text>
            {data.orgMe.postings.length > 0 ? (
              data.orgMe.postings.map((posting) => (
                <Listing
                  key={posting._id}
                  {...posting}
                  onPress={() => {
                    navigation.navigate('Postings', {
                      screen: 'Posting',
                      initial: false,
                      params: posting,
                    });
                  }}
                />
              ))
            ) : (
              <Text style={styles.subheader}>You have no postings</Text>
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.joinPrompt}>
          <Text style={styles.title}>FundNet</Text>
          <Text style={styles.subtitle}>You aren't signed into FundNet.</Text>
          <Button
            title="Join"
            onPress={() => {
              navigation.navigate('Signup');
            }}
          />
          <ClickableText
            title="Already have an account? Log in"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
          <ClickableText
            title="Not an organization?"
            onPress={() => navigation.navigate('Me')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: Colors.background },
  profile: { flex: 1 },
  joinPrompt: { flex: 1, padding: 40, justifyContent: 'center' },
  profileHeader: { padding: 40, backgroundColor: Colors.white },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.large,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
  header: {
    color: Colors.primary,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.medium,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  subheader: {
    color: Colors.secondary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
    marginHorizontal: 30,
    marginVertical: 10,
  },
});

export default OrgScreen;
