import { AccessInfo } from './AccessInfo';
import { Book } from './Book';
import { SaleInfo } from './SaleInfo';

export interface Volume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: Book;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}
