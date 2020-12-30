import { CleaningFee } from "./cleaningFee";
import { User } from "./user";

export class ProductF {
  $key: string;
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  sellerPrice: number;
  quantity: number;
  details: string;
  updated_at: Date;
  imgUrl: string;
  file: FormData;
  category: string;
  imgData: Blob;
  cleaningFee: CleaningFee;
  user: User;
  status: number;


}
