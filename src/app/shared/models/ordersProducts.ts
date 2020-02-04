import { ProductF } from "./productF";
import { CleaningFee } from "./cleaningFee";

export class OrdersProducts {
  
  id: number;
 
  status: number;
 
  quantity: number;
  creationDate: Date;

  product: ProductF;

  cleaningFee: CleaningFee;

  cleaningFeeId: number;
 
}
