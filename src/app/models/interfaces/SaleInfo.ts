import { ListPrice } from './ListPrice';

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: ListPrice;
  retailPrice: ListPrice;
  buyLink: string;
}
