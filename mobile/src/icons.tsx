import React from 'react';
import { Svg, Circle, Rect } from 'react-native-svg';
import { RootStackParamList } from './types';

interface Props {
  name: keyof RootStackParamList;
  focused: boolean;
  color: string;
  size: number;
}

interface IconProps {
  color: string;
  size: number;
}

export const getTabBarIcon = ({ name, color, size }: Props) => {
  return TabBarIcons[name]({ color, size });
};

const TabBarIcons: Record<
  keyof RootStackParamList,
  (props: IconProps) => Element
> = {
  Bulletins: ({ color, size }) => (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="50" fill={color} />
    </Svg>
  ),
  Postings: ({ color, size }) => (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="25" fill={color} />
    </Svg>
  ),
  Org: ({ color, size }) => (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Rect x="25" y="25" width="50" height="50" fill={color} />
    </Svg>
  ),
  Me: ({ color, size }) => (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Rect x="0" y="0" width="100" height="100" fill={color} />
    </Svg>
  ),
};
