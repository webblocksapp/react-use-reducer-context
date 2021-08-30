import axios, { AxiosResponse } from 'axios';
import { ProductHasDiscount } from '../interfaces';

const baseApi = process.env.REACT_APP_BASE_API;

export const useProductHasDiscountApi = () => {
  const findAll = (): Promise<AxiosResponse<ProductHasDiscount[]>> => {
    return axios.get(`${baseApi}/products-has-discount`);
  };

  return { findAll };
};
