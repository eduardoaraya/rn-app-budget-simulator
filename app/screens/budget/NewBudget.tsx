import React from 'react';
import {useState, useEffect} from 'react';
import {Modal, SafeAreaView} from 'react-native';
import {
  Content,
  CustomButton,
  Input,
  Label,
  TextBtn,
  WrapperInput,
} from '../../components/core/core.styled';
import ProfesionalService from '../../services/ProfesionalService';
import BudgetService, {
  budgetProfessional,
  budgetRequest,
} from '../../services/BudgetService';
import {ModalView, TitleModal, TotalText} from './style';
import {NavigationProp} from '@react-navigation/native';

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
        total: result.data.total,
        showModal: true,
      });
    } catch (_error) {
      // TODO: handle Errors
      // console.log(_error.response.data.message);
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
            <WrapperInput>
              <CustomButton onPress={saveBudget}>
                <TextBtn>Confirmar Orçamento</TextBtn>
              </CustomButton>
              <CustomButton type="danger" onPress={closeModal}>
                <TextBtn>Fechar</TextBtn>
              </CustomButton>
            </WrapperInput>
          </ModalView>
        </Modal>
        {professionals.map((profesional: any, i: number) => (
          <WrapperInput key={i}>
            <Label>{profesional.name}</Label>
            <Input
              placeholder={profesional.name}
              onChangeText={(amount: string) =>
                changeValueByProfessional(profesional, amount)
              }
            />
          </WrapperInput>
        ))}
        <WrapperInput>
          <Label>Quantidade de dias</Label>
          <Input
            onChangeText={(amount: string) =>
              setDataBudget({
                ...dataBudget,
                amountDays: parseInt(amount, 10),
              })
            }
          />
        </WrapperInput>
        <WrapperInput>
          <CustomButton onPress={simulateBudget}>
            <TextBtn>Simular</TextBtn>
          </CustomButton>
        </WrapperInput>
      </Content>
    </SafeAreaView>
  );
};

export default NewBudget;
