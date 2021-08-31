import axios, { AxiosResponse } from 'axios';
import { ProductDiscount } from '../interfaces';

const baseApi = process.env.REACT_APP_BASE_API;

export const useProductDiscountApi = () => {
  const findAll = (): Promise<AxiosResponse<ProductDiscount[]>> => {
    return axios.get(`${baseApi}/products-discounts`);
  };

  return { findAll };
};
