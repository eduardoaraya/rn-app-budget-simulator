import React, {useState} from 'react';
import {useEffect} from 'react';
import {Alert, FlatList, SafeAreaView} from 'react-native';
import {
  Content,
  CustomButton,
  InputWrapper,
  TextBtn,
} from '../../components/core/core.styled';
import {UserType} from '../../shared/UserType';
import {ProfileFields} from './fields';
import AsyncStorage from '@react-native-community/async-storage';
import {USER_STORAGE} from '../../contexts/AuthContext';
import RenderField from './RenderField';
import UserService from '../../services/UserService';
import FlashErrors from '../../components/FlashErrors';

const Profile: React.FC = () => {
  const [errors, setErrors] = useState([]);
  const [profileData, setProfileData] = useState<UserType>({
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
  });

  const getUserData = async () => {
    const storageData = await AsyncStorage.getItem(USER_STORAGE);
    if (storageData) {
      const data = JSON.parse(storageData);
      setProfileData(data);
    }
  };

  const updateProfile = async () => {
    try {
      await UserService.update(profileData);
      await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(profileData));
      setErrors([]);
      Alert.alert('Sucesso', 'Seus dados foram atualizados!');
    } catch (_err) {
      setErrors(
        _err.response?.data?.message instanceof Array
          ? _err.response?.data?.message
          : [_err.response?.data?.message],
      );
    }
  };

  const onChangeValue = (data: UserType) => {
    setProfileData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView>
      <Content>
        <FlatList
          data={ProfileFields}
          keyExtractor={(_, index: number) => index}
          renderItem={({item}) => (
            <RenderField
              profileData={profileData}
              onChangeValue={onChangeValue}
              item={item}
            />
          )}
          ListFooterComponent={() => (
            <>
              <FlashErrors errors={errors} />
              <InputWrapper>
                <CustomButton onPress={updateProfile}>
                  <TextBtn>Atualizar</TextBtn>
                </CustomButton>
              </InputWrapper>
            </>
          )}
        />
      </Content>
    </SafeAreaView>
  );
};

export default Profile;
