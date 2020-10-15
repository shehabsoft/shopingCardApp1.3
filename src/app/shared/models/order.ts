import { ProductF } from "./productF";
import { Country } from "./country";
import { OrdersProducts } from "./ordersProducts";
import { User } from "./user";

export class Order {
  
  id: number;
 
  status: number;
  address1: string;
  address2: string;
  creationDate: Date;
  ordersProducts: OrdersProducts[];
  total: number;
  updateDate: Date;
  zip: number;
  user: User;
 
}
