import { ProductF } from "./productF";
import { User } from "firebase";

export class ProductsSeller {
 
  id: number;
 
  sale: number;
  
  updateDate: Date;
  creationDate: Date;
  user: User;
  product: ProductF;
}
