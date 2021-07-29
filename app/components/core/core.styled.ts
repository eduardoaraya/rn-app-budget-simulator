import styled from 'styled-components/native';

import Colors from './colors';

export const Input = styled.TextInput`
  background-color: ${Colors.hightLight};
  border: solid 1px ${Colors.primaryColor};
  height: 40px;
`;

export const Button = styled.Button`
  margin-top: 20px;
`;

export const Content = styled.View`
  background: ${Colors.bgColor};
  height: 100%;
  padding: 10px;
`;

export const CustomButton = styled.Pressable`
  width: 100%;
  border-radius: 5px;
  background-color: ${({typeButton}: {typeButton?: string}) =>
    !typeButton || typeButton === 'primary'
      ? Colors.successColor
      : Colors.dangerColor};
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  color: ${Colors.hightLight};
  margin: 5px auto;
  box-shadow: 10px 5px 5px black;
`;

export const TextBtn = styled.Text`
  color: ${Colors.hightLight};
  text-align: center;
  text-transform: uppercase;
`;

export const InputWrapper = styled.View`
  padding: 10px;
  flex-direction: column;
`;

export const Label = styled.Text`
  margin-bottom: 10px;
  font-weight: 900;
`;

export const ErrorWrapper = styled.View`
  margin: 10px;
  padding: 10px;
`;

export const ErrorText = styled.Text`
  color: ${Colors.dangerColor};
  text-transform: capitalize;
  font-weight: 900;
`;
