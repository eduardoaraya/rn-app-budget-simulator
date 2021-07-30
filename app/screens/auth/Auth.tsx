import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import {
  Input,
  Content,
  InputWrapper,
  CustomButton,
  TextBtn,
} from '../../components/core/core.styled';

import {useAuth} from '../../contexts/AuthContext';

const Auth = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const authenticate = async () => {
    isLoading(true);
    try {
      if (!email || !password) {
        return;
      }
      await auth.signIn({email, password});
      setTimeout(() => navigation.navigate('Home'), 1000);
    } catch (_error) {
      Alert.alert(_error.response.data.message);
    } finally {
      isLoading(false);
    }
  };

  const register = async () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView>
      <Content>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <>
            <InputWrapper>
              <Input
                placeholder="E-mail"
                onChangeText={(text: string) => setEmail(text)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                secureTextEntry={true}
                placeholder="Senha"
                onChangeText={(text: string) => setPassword(text)}
              />
            </InputWrapper>
            <InputWrapper>
              <CustomButton onPress={() => authenticate()}>
                <TextBtn>Entrar</TextBtn>
              </CustomButton>
              <CustomButton onPress={() => register()}>
                <TextBtn>Registre-se</TextBtn>
              </CustomButton>
            </InputWrapper>
          </>
        )}
      </Content>
    </SafeAreaView>
  );
};

export default Auth;
