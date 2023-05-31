import { Epub } from './Epub';
import { Pdf } from './Pdf';

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  accessViewStatus: string;
}
