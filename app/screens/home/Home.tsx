import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Content,
  CustomButton,
  TextBtn,
} from '../../components/core/core.styled';
import BudgetService, { Budget } from '../../services/BudgetService';
import {StatusLabel, StatusLabelWrapper, Card, CardPrice} from './style';

const CardItem = ({total, status, createdAt}) => {
  return (
    <Card>
      <CardPrice>R$ {BudgetService.renderPrice(total)}</CardPrice>
      <Text>{BudgetService.renderDate(createdAt)}</Text>
      <StatusLabelWrapper>
        <StatusLabel>{status}</StatusLabel>
      </StatusLabelWrapper>
    </Card>
  );
};

const Home = ({navigation}) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const getBudgets = async () => {
    const result = await BudgetService.getList();
    setBudgets(result.data);
  };

  useEffect(() => {
    setTimeout(() => getBudgets(), 1000);
  }, []);

  return (
    <SafeAreaView>
      <Content>
        <CustomButton onPress={() => navigation.navigate('NewBudget')}>
          <TextBtn>Simular novo orçamento</TextBtn>
        </CustomButton>
        <FlatList
          data={budgets}
          renderItem={({item}: {item: Budget}) => <CardItem {...item} />}
          keyExtractor={(item: Budget, index: number) => index}
        />
      </Content>
    </SafeAreaView>
  );
};

export default Home;
