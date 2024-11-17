import { Product } from './product';

export interface ProductDbResponse {
  message: string,
  products: Product[];
}
