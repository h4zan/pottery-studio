import axios from 'axios';
import { ICategory, IProduct } from '../models/IProduct';
import { IFaq } from '../models/IFaq';
import { IWorkshop } from '../models/IWorkshop';

export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '',
  headers: {
    Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
    Accept: 'application/json',
  },
});

export const makeRequest = async <T>(
  endpoint: string,
  baseURL: string = ''
): Promise<T> => {
  try {
    const response = await customAxios.get<{ data: T }>(
      `${baseURL}${endpoint}`
    );
    /*     console.log(response.data);
     */ return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (): Promise<IProduct[]> => {
  return await makeRequest<IProduct[]>('/products?populate=*');
};

export const getProductById = async (id: number): Promise<IProduct> => {
  return await makeRequest<IProduct>(`/products/${id}?populate=*`);
};

export const getImages = async (): Promise<IProduct[]> => {
  const uploadUrl = import.meta.env.VITE_APP_UPLOAD_URL;

  if (!uploadUrl) {
    throw new Error(
      'VITE_APP_UPLOAD_URL is not defined in the environment variables.'
    );
  }

  return await makeRequest<IProduct[]>('/products?populate=*', uploadUrl);
};

export const getCategories = async (): Promise<ICategory[]> => {
  return await makeRequest<ICategory[]>('/categories');
};

export const getFaqs = async (): Promise<IFaq[]> => {
  return await makeRequest<IFaq[]>('/faqs?populate=*');
};

export const getWorkshops = async (): Promise<IWorkshop[]> => {
  return await makeRequest<IWorkshop[]>('/workshops?populate=*');
};
