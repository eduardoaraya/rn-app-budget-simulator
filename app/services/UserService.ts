import {UserType} from '../shared/UserType';
import api from './api';

const update = async (data: UserType) => await api.post('user/update', data);

export default {
  update,
};
