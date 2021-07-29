import api from './api';

const getAll = async () => api.get('/professional/list');

export default {getAll};
