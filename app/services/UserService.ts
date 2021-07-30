import {UserType} from '../shared/UserType';
import api from './api';

const update = async (data: UserType) => await api.post('user/update', data);

const save = async (data: UserType) => await api.post('user/create', data);

export default {
  update,
  save,
};
