import React from 'react';
import {View} from 'react-native';
import {Input, InputWrapper, Label} from '../../components/core/core.styled';
import {UserType} from '../../shared/UserType';
import {FieldProfile} from './fields';

const RenderField = ({
  profileData,
  item,
  onChangeValue,
}: {
  profileData: UserType;
  item: FieldProfile;
  onChangeValue: Function;
}) => {
  if (item.fields?.length) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flexDirection: 'row'}}>
        {item.fields?.map((child, i) => (
          // eslint-disable-next-line react-native/no-inline-styles
          <InputWrapper style={{flex: 1}} key={i}>
            <Label>{child.title}</Label>
            <Input
              secureTextEntry={!!child.secureTextEntry}
              onChangeText={value => {
                onChangeValue({
                  ...profileData,
                  [child.field?.toString()]: value.toString(),
                });
              }}
              value={
                child.field !== undefined
                  ? profileData[child.field]?.toString()
                  : ''
              }
            />
          </InputWrapper>
        ))}
      </View>
    );
  } else {
    return (
      <InputWrapper>
        <Label>{item.title}</Label>
        <Input
          secureTextEntry={!!item.secureTextEntry}
          onChangeText={value => {
            onChangeValue({
              ...profileData,
              [item.field]: value.toString(),
            });
          }}
          value={
            item.field !== undefined ? profileData[item.field]?.toString() : ''
          }
        />
      </InputWrapper>
    );
  }
};

export default RenderField;
