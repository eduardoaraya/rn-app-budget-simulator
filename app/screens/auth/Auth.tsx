import React, {useState} from 'react';
import {SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import {
  Input,
  Button,
  Content,
  WrapperInput,
  CustomButton,
  TextBtn,
} from '../../components/core/core.styled';

import {useAuth} from '../../contexts/AuthContext';

const Auth: React.FC = ({navigation}) => {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const authenticate = async () => {
    isLoading(true);
    try {
      await auth.signIn({email, password});
      navigation.navigate('Home');
    } catch (_error) {
      Alert.alert(_error.response.data.message);
    } finally {
      isLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Content>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <>
            <WrapperInput>
              <Input
                placeholder="E-mail"
                onChangeText={(text: string) => setEmail(text)}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                secureTextEntry={true}
                placeholder="Senha"
                onChangeText={(text: string) => setPassword(text)}
              />
            </WrapperInput>
            <WrapperInput>
              <CustomButton onPress={() => authenticate()}>
                <TextBtn>Entrar</TextBtn>
              </CustomButton>
            </WrapperInput>
          </>
        )}
      </Content>
    </SafeAreaView>
  );
};

export default Auth;
