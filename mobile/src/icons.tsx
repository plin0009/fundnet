import React, { ReactNode } from 'react';
import { Svg, Circle, Rect } from 'react-native-svg';

interface Props {
  name: string;
  focused: boolean;
  color: string;
  size: number;
}

interface IconProps {
  color: string;
  size: number;
}

export const getTabBarIcon = ({ name, color, size }: Props) => {
  return Icons[name]({ color, size });
};

const Icons: Record<string, (props: IconProps) => ReactNode> = {
  Bulletins: ({ color, size }) => (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="50" fill={color} />
    </Svg>
  ),
  Me: ({ color, size }) => (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Rect x="0" y="0" width="100" height="100" fill={color} />
    </Svg>
  ),
};
