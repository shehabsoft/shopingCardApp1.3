import { User, UserDetail } from "./user";

export class Billing {
  id: number;
  user: User;
  totalPrice: number;
  userDetails: UserDetail;
 
}
