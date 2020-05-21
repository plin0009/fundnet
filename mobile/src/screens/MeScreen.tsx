import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { MeStackParamList } from '../types';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME, MeData, LOGOUT } from '../queries';
import { Button, ClickableText } from '../components/Button';

interface Props {
  navigation: StackNavigationProp<MeStackParamList, 'Me'>;
}
const MeScreen = ({ navigation }: Props) => {
  const { data } = useQuery<{ me: MeData }>(GET_ME);
  const [logout, { client }] = useMutation<{ logout: boolean }>(LOGOUT, {
    update: async () => {
      if (client) {
        await client.resetStore();
        navigation.navigate('Login');
      }
    },
  });

  return (
    <SafeAreaView style={styles.body}>
      {data && data.me ? (
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Text style={styles.subtitle}>@{data.me.handle}</Text>
            <Button
              title="Sign out"
              onPress={async () => {
                const l = await logout();
                console.log(l);
              }}
            />
          </View>
          <ScrollView>
            <Text>{JSON.stringify(data.me)}</Text>
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
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profile: { flex: 1 },
  joinPrompt: { flex: 1, padding: 40, justifyContent: 'center' },
  profileHeader: { padding: 40, backgroundColor: Colors.white },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.large,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
});

export default MeScreen;
