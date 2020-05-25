import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { PostingData } from '../queries';

interface PostingProps extends PostingData {}

const Posting = ({}: PostingProps) => {
  return <TouchableWithoutFeedback></TouchableWithoutFeedback>;
};

export default Posting;
