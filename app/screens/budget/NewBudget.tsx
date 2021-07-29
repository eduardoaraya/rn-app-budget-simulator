import React from 'react';
import {useState, useEffect} from 'react';
import {Modal, SafeAreaView, View} from 'react-native';
import {
  Content,
  CustomButton,
  Input,
  Label,
  TextBtn,
  InputWrapper,
} from '../../components/core/core.styled';
import ProfesionalService from '../../services/ProfesionalService';
import BudgetService, {
  budgetProfessional,
  budgetRequest,
} from '../../services/BudgetService';
import {ModalView, TitleModal, TotalText} from './style';
import {NavigationProp} from '@react-navigation/native';
import FlashErrors from '../../components/FlashErrors';

type ProfessionalState = {
  [key: string]: {
    id: string;
    amount: string;
  };
};

type BudgetState = {
  professionals: ProfessionalState;
  amountDays: number;
};

type ModalState = {
  showModal: boolean;
  total: string;
};

const NewBudget = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [professionals, setProfessionals] = useState([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [budgetResult, setBudgetResult] = useState<ModalState>({
    showModal: false,
    total: '0',
  });
  const [dataBudget, setDataBudget] = useState<BudgetState>({
    professionals: {},
    amountDays: 0,
  });

  useEffect(() => {
    ProfesionalService.getAll().then(({data}) => setProfessionals(data ?? []));
  }, []);

  const changeValueByProfessional = (
    data: budgetProfessional,
    amount: string,
  ) => {
    dataBudget.professionals[data.id] = {
      id: data.id,
      amount,
    };
    setDataBudget({...dataBudget});
  };

  const getData = (): budgetRequest => ({
    amountDays: dataBudget.amountDays,
    professionals: Object.values(dataBudget.professionals),
  });

  const simulateBudget = async () => {
    try {
      const result = await BudgetService.simulateBudget(getData());
      setBudgetResult({
        ...budgetResult,
        total: result.data?.total,
        showModal: true,
      });
    } catch (_error) {
      // TODO: handle Errors
      setErrors(_error.response?.data?.message);
    }
  };

  const closeModal = async () => {
    setBudgetResult({
      ...budgetResult,
      showModal: false,
    });
  };

  const saveBudget = async () => {
    try {
      await BudgetService.saveBudget(getData());
      closeModal();
      navigation.navigate('Home');
    } catch (_error) {
      // TODO: handle Errors
      // console.log(_error.response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <Content>
        <Modal
          animationType="slide"
          presentationStyle="fullScreen"
          visible={budgetResult.showModal}>
          <ModalView>
            <TitleModal>Total do seu orçamento:</TitleModal>
            <TotalText>R$ {budgetResult.total}</TotalText>
            <InputWrapper>
              <CustomButton onPress={saveBudget}>
                <TextBtn>Confirmar Orçamento</TextBtn>
              </CustomButton>
              <CustomButton typeButton="danger" onPress={closeModal}>
                <TextBtn>Fechar</TextBtn>
              </CustomButton>
            </InputWrapper>
          </ModalView>
        </Modal>
        {professionals.map((profesional: any, i: number) => (
          <InputWrapper key={i}>
            <Label>{profesional.name}</Label>
            <Input
              keyboardType="numeric"
              placeholder={profesional.name}
              onChangeText={(amount: string) =>
                changeValueByProfessional(profesional, amount)
              }
            />
          </InputWrapper>
        ))}
        <InputWrapper>
          <Label>Quantidade de dias</Label>
          <Input
            keyboardType="numeric"
            onChangeText={(amount: string) =>
              setDataBudget({
                ...dataBudget,
                amountDays: parseInt(amount, 10),
              })
            }
          />
        </InputWrapper>
        <FlashErrors errors={errors} />
        <InputWrapper>
          <CustomButton onPress={simulateBudget}>
            <TextBtn>Simular</TextBtn>
          </CustomButton>
        </InputWrapper>
      </Content>
    </SafeAreaView>
  );
};

export default NewBudget;
