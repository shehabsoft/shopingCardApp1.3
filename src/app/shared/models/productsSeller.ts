import { ProductF } from "./productF";
import { User } from "./user";
import { CleaningFee } from "./cleaningFee";
 

export class ProductsSeller {
 
  id: number;
 
  sale: number;
  
  updateDate: Date;
  creationDate: Date;
  user: User;
  product: ProductF;
  cleaningFee: CleaningFee;
}
