import { apiClient } from '../../../api';

/** 示例模块 API */
export const exampleApi = {
  list: () => apiClient.get('/example'),
  create: (payload) => apiClient.post('/example', payload),
};