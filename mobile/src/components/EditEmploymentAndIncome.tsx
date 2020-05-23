import React, { useState } from 'react';

import {
  EmploymentHours,
  EmploymentStatus,
  employmentHours,
  employmentStatus,
} from '../types';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../styles';
import { Button } from './Button';
import { Picker } from '@react-native-community/picker';
import Textbox from './Textbox';

interface Props {
  employmentHours?: EmploymentHours;
  employmentStatus?: EmploymentStatus;
  income?: number | null;
}

const EditEmploymentAndIncome = (props: Props) => {
  const [edits, setEdits] = useState<Props>({});

  return (
    <View style={styles.box}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Employment and income</Text>
        <Button
          title="Save changes"
          isSmall
          onPress={() => console.log(JSON.stringify(edits))}
        />
      </View>
      <Text style={styles.header}>Employment hours</Text>
      <Picker
        selectedValue={
          edits.employmentHours || props.employmentHours || 'UNSPECIFIED'
        }
        onValueChange={(itemValue) => {
          setEdits((e) => ({
            ...e,
            employmentHours: itemValue as EmploymentHours,
          }));
        }}>
        {(Object.keys(employmentHours) as Array<EmploymentHours>).map((key) => (
          <Picker.Item key={key} label={employmentHours[key]} value={key} />
        ))}
      </Picker>
      <Text style={styles.header}>Employment status</Text>
      <Picker
        selectedValue={
          edits.employmentStatus || props.employmentStatus || 'UNSPECIFIED'
        }
        onValueChange={(itemValue) => {
          setEdits((e) => ({
            ...e,
            employmentStatus: itemValue as EmploymentStatus,
          }));
        }}>
        {(Object.keys(employmentStatus) as Array<EmploymentStatus>).map(
          (key) => (
            <Picker.Item key={key} label={employmentStatus[key]} value={key} />
          ),
        )}
      </Picker>
      <Text style={styles.header}>Income</Text>
      <Textbox
        label="Annual income estimate"
        isNumeric
        value={
          '' +
          (edits.income !== undefined
            ? edits.income === null
              ? ''
              : edits.income
            : props.income)
        }
        setValue={(text) => {
          setEdits((e) => {
            const newValue =
              text === '' ? null : isNaN(+text) ? e.income : +text;
            return { ...e, income: newValue };
          });
        }}
      />
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
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.larger,
    flexShrink: 1,
  },
  header: {
    color: Colors.secondary,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.medium,
  },
});

export default EditEmploymentAndIncome;
