import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Attribute, attributes, Attributes } from '../types';
import Textbox from './Textbox';
import { Fonts, Colors } from '../styles';
import { AttributeButton, Button } from './Button';

interface BasicInfoData {
  minAge?: number | null;
  maxAge?: number | null;
  homeOwner?: Attribute;
  autoOwner?: Attribute;
  student?: Attribute;
  veteran?: Attribute;
  pregnant?: Attribute;
  parent?: Attribute;
  physicalCondition?: Attribute;
  mentalCondition?: Attribute;
}
interface Props extends BasicInfoData {
  saveEdits: (edits: string) => void;
}

const EditBasicInfo = (props: Props) => {
  const [edits, setEdits] = useState<BasicInfoData>({});

  return (
    <View style={styles.box}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Basic info</Text>
        <Button
          title="Save changes"
          isSmall
          onPress={() => {
            props.saveEdits(JSON.stringify(edits));
          }}
        />
      </View>

      <Text style={styles.header}>Age</Text>
      <View style={styles.ageBox}>
        <View style={styles.ageTextboxWrapper}>
          <Textbox
            label="Min"
            isSmall
            isNumeric
            value={'' + (edits.minAge || props.minAge)}
            setValue={(text) => {
              setEdits((e) => {
                const newMinAge =
                  text === '' ? null : isNaN(+text) ? e.minAge : +text;
                return { ...e, minAge: newMinAge };
              });
            }}
          />
        </View>
        <View style={styles.ageTextboxWrapper}>
          <Textbox
            label="Max"
            isSmall
            isNumeric
            value={'' + (edits.maxAge || props.maxAge)}
            setValue={(text) => {
              setEdits((e) => {
                const newMaxAge =
                  text === '' ? null : isNaN(+text) ? e.maxAge : +text;
                return { ...e, maxAge: newMaxAge };
              });
            }}
          />
        </View>
      </View>
      <Text style={styles.header}>Attributes</Text>
      <View style={styles.attributeBox}>
        {(Object.keys(attributes) as Array<Attributes>).map((key) => (
          <AttributeButton
            key={key}
            title={attributes[key]}
            onPress={() => {
              setEdits((e) => {
                const oldValue = e[key] || props[key];
                let newValue = 'YES';
                if (oldValue === 'YES') {
                  newValue = 'NO';
                } else if (oldValue === 'NO') {
                  newValue = 'UNSPECIFIED';
                }
                return { ...e, [key]: newValue };
              });
            }}
            value={edits[key] || props[key] || Attribute.unspecified}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 40,
  },
  ageBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageTextboxWrapper: {
    width: '45%',
  },
  header: {
    color: Colors.secondary,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.medium,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attributeBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.larger,
    flexShrink: 1,
  },
});

export default EditBasicInfo;
