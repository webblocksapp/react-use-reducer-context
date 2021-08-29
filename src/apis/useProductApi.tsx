import axios, { AxiosResponse } from 'axios';
import { Product } from '../interfaces';

const baseApi = 'http://localhost:4000';

const useProductApi = () => {
  const findAll = (): Promise<AxiosResponse<Product[]>> => {
    return axios.get(`${baseApi}/products`);
  };

  const create = (product: Product): Promise<AxiosResponse<Product>> => {
    return axios.post(`${baseApi}/products`, product);
  };

  const remove = (id: number): Promise<AxiosResponse<Product>> => {
    return axios.delete(`${baseApi}/products/${id}`);
  };

  return { findAll, create, remove };
};

export default useProductApi;
