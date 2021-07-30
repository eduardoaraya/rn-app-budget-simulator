import React, {useState} from 'react';
import {Alert, FlatList, SafeAreaView} from 'react-native';
import {
  Content,
  CustomButton,
  InputWrapper,
  TextBtn,
} from '../../components/core/core.styled';
import FlashErrors from '../../components/FlashErrors';
import { useAuth } from '../../contexts/AuthContext';
import UserService from '../../services/UserService';
import {UserType} from '../../shared/UserType';
import {RegisterFields} from '../profile/fields';
import RenderField from '../profile/RenderField';

type UserCreate = {
  password: string;
  passwordConfirmation: string;
} & UserType;

const Register: React.FC = ({navigation}) => {
  const {setDataAuthentication} = useAuth();
  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState<UserCreate>({
    name: '',
    email: '',
    cpf: '',
    cnpj: '',
    telephone: '',
    companyName: '',
    addressZipcode: '',
    addressStreet: '',
    addressNumber: null,
    addressComplement: '',
    addressState: '',
    addressCity: '',
    addressDistrict: '',
    password: '',
    passwordConfirmation: '',
  });

  const save = async () => {
    try {
      const result = await UserService.save(userData);
      setErrors([]);
      Alert.alert('Sucesso', 'Bem vindo!');
      await setDataAuthentication(result.data?.token);
      navigation.navigate('Home');
    } catch (_err) {
      setErrors(
        _err.response?.data?.message instanceof Array
          ? _err.response?.data?.message
          : [_err.response?.data?.message],
      );
    }
  };

  const onChangeValue = (data: UserCreate) => {
    setUserData(data);
  };

  return (
    <SafeAreaView>
      <Content>
        <FlatList
          data={RegisterFields}
          keyExtractor={(_, index: number) => index}
          renderItem={({item}) => (
            <RenderField
              profileData={userData}
              onChangeValue={onChangeValue}
              item={item}
            />
          )}
          ListFooterComponent={() => (
            <>
              <FlashErrors errors={errors} />
              <InputWrapper>
                <CustomButton onPress={save}>
                  <TextBtn>Cadastrar</TextBtn>
                </CustomButton>
              </InputWrapper>
            </>
          )}
        />
      </Content>
    </SafeAreaView>
  );
};

export default Register;
