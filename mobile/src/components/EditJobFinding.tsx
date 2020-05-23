import React, { useState } from 'react';
import {
  Location,
  Availability,
  timesOfDay,
  Attribute,
  DayOfWeek,
  daysOfWeek,
} from '../types';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Fonts } from '../styles';
import { Button, AttributeButton } from './Button';
import Textbox from './Textbox';
import { ScrollView } from 'react-native-gesture-handler';
import { radarSecret } from '../config';

interface Props {
  location?: Location;
  availability?: Availability;
}

const locationToDisplay = (location: Location | null) => {
  if (location === null) {
    return '';
  }
  return `${location.name} (${location.coords.join(', ')})`;
};
const forwardGeocode = async (query: string) => {
  const response = await fetch(
    `https://api.radar.io/v1/geocode/forward?query=${query}`,
    {
      headers: {
        Authorization: radarSecret,
      },
    },
  );
  console.log(response);
  const result = await response.json();
  console.log(result);
  const { addresses } = result;
  const { latitude, longitude, formattedAddress /*confidence*/ } = addresses[0];

  const coords: [number, number] = [latitude, longitude];
  const name = formattedAddress;
  return { coords, name };
};
const EditJobFinding = (props: Props) => {
  const [edits, setEdits] = useState<Props>({});
  const [searchLocationInput, setSearchLocationInput] = useState<string>('');
  const [searchedLocation, setSearchedLocation] = useState<Location | null>(
    null,
  );
  return (
    <View style={styles.box}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Job finding</Text>
        <Button
          title="Save changes"
          isSmall
          onPress={() => console.log(JSON.stringify(edits))}
        />
      </View>
      <Text style={styles.header}>Location</Text>
      <Text style={styles.location}>
        {locationToDisplay(edits.location || props.location || null)}
      </Text>
      <View style={styles.searchLocationRow}>
        <View style={styles.textLeft}>
          <Textbox
            label="Search location"
            isSmall
            value={searchLocationInput}
            setValue={setSearchLocationInput}
          />
        </View>
        <View style={styles.buttonRight}>
          <Button
            title="Search"
            isSmall
            onPress={async () => {
              const locationResult = await forwardGeocode(searchLocationInput);
              // display the location result
              setSearchedLocation(locationResult);
            }}
          />
        </View>
      </View>
      {searchedLocation !== null && (
        <View style={styles.searchedLocationRow}>
          <Text style={[styles.location, styles.textLeft]}>
            {locationToDisplay(searchedLocation)}
          </Text>
          <View style={styles.buttonRight}>
            <Button
              title="Set as location"
              isSmall
              onPress={() => {
                setEdits((e) => ({ ...e, location: searchedLocation }));
              }}
            />
          </View>
        </View>
      )}

      <Text style={styles.header}>Availability</Text>
      <ScrollView style={styles.availabilityTable}>
        <View style={styles.availabilityRow}>
          <View style={styles.availabilityDayTitle} />
          {timesOfDay.map((time) => (
            <Text key={time} style={styles.availabilityTableHeader}>
              {time}
            </Text>
          ))}
        </View>
        {(Object.keys(daysOfWeek) as Array<DayOfWeek>).map((day) => {
          //return <Text>{JSON.stringify(props.availability[day])}</Text>;
          return (
            <View key={day} style={styles.availabilityRow}>
              <Text style={styles.availabilityDayTitle}>
                {daysOfWeek[day].substr(0, 3)}
              </Text>
              {timesOfDay.map((time) => {
                return (
                  <View key={time} style={styles.availabilityTableButton}>
                    <AttributeButton
                      title={''}
                      value={
                        (edits.availability &&
                          edits.availability[day] &&
                          edits.availability[day][time]) ||
                        (props.availability && props.availability[day][time]) ||
                        Attribute.unspecified
                      }
                      onPress={() => {
                        setEdits((e) => {
                          const oldValue =
                            (edits.availability &&
                              edits.availability[day] &&
                              edits.availability[day][time]) ||
                            (props.availability &&
                              props.availability[day][time]);
                          let newValue = 'YES';
                          if (oldValue === 'YES') {
                            newValue = 'NO';
                          } else if (oldValue === 'NO') {
                            newValue = 'UNSPECIFIED';
                          }
                          return {
                            ...e,
                            availability: {
                              ...e.availability,
                              [day]: {
                                ...(e.availability && e.availability[day]),
                                [time]: newValue,
                              },
                            },
                          };
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { padding: 40 },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.larger,
    flexShrink: 1,
  },
  header: {
    color: Colors.secondary,
    fontFamily: Fonts.bold,
    fontSize: Fonts.size.medium,
  },
  location: {
    color: Colors.secondary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.smaller,
    marginVertical: 20,
  },
  searchLocationRow: {
    flexDirection: 'row',
  },
  searchedLocationRow: { flexDirection: 'row', alignItems: 'center' },
  availabilityTable: {
    /*flexDirection: 'row'*/
  },
  availabilityTableHeader: {
    flexGrow: 1,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.smaller,
    color: Colors.secondary,
    textAlign: 'center',
    marginVertical: 10,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDayTitle: {
    color: Colors.secondary,
    fontFamily: Fonts.family,
    fontSize: Fonts.size.smaller,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 10,
    width: '25%',
  },
  availabilityTableButton: { flexGrow: 1 },
  buttonRight: {
    marginLeft: 20,
  },
  textLeft: { flexGrow: 1, flexShrink: 1 },
});

export default EditJobFinding;
