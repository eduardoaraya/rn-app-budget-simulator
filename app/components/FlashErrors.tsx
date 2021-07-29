import React from 'react';
import {Text} from 'react-native';
import {ErrorText, ErrorWrapper} from './core/core.styled';

const FlashErrors = ({errors}: {errors: string[]}) => {
  return (
    <ErrorWrapper>
      {errors.map((error: string, i) => (
        <ErrorText key={i}> - {error}</ErrorText>
      ))}
    </ErrorWrapper>
  );
};

export default FlashErrors;
