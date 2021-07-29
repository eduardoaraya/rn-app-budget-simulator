import api from './api';

export type Budget = {
  id: number;
  total: string;
  createdAt: string;
  status: string;
};

export type calcBudget = {
  total: string;
};

export type budgetProfessional = {
  id: string;
};

export type budgetRequest = {
  professionals: budgetProfessional[];
  amountDays: number;
};

const simulateBudget = async (
  data: budgetRequest,
): Promise<{
  data: calcBudget;
}> => api.post('/budget/simulate', data);

const saveBudget = async (data: budgetRequest) =>
  api.post('/budget/create', data);

const getList = async (): Promise<{
  data: Budget[];
}> => api.get('/budget/list');

const renderPrice = (total: number) =>
  (total / 100).toFixed(2).replace('.', ',');

const renderDate = (date: string): string => {
  const dateObject = new Date(date);
  return `${dateObject.getDate()}/${
    dateObject.getMonth() > 9
      ? dateObject.getMonth()
      : '0' + (dateObject.getMonth() + 1)
  }/${dateObject.getFullYear()}`;
};

export default {simulateBudget, saveBudget, getList, renderPrice, renderDate};
