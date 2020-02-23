import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from "angularfire2/database";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Billing } from "./../models/billing";
import { Injectable } from "@angular/core";
import { ProductF } from "../models/productF";
import { Order } from "../models/order";
import { OrdersProducts } from "../models/ordersProducts";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';
import { ProductService } from "./product.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
const apiUrl = "https://us-cdbr-iron-east-04.cleardb.net/Order/";
@Injectable({
  providedIn: "root"
})
export class BillingService {
  billings: AngularFireList<Billing>;
  billing: AngularFireObject<Billing>;
  constructor(private db: AngularFireDatabase, private http: HttpClient, private productService: ProductService ) {
    this.getBillings();
  }
  order: Order;
  ordersProducts: OrdersProducts;
  user: User;

  total = 0;
  createBillings(data: Billing, productList: ProductF[]): number {
    //this.productService.resetLocalCartProducts();
    productList.forEach((product: ProductF) => {
 
      this.total += (product.price * product.quantity);
 

 
    }
    );
    return this.total;
  }

  create(order: Order): Observable<Order> {
    console.log("Before Creation")
  
    return this.http.post<Order>(apiUrl, order, httpOptions).pipe(
      tap(hero => {
        console.log(hero);
   
   
      }
      )
    );


  }
   

  getBillings() {
    this.billings = this.db.list("billings");
    return this.billings;
  }

  getBillingById(key: string) {
    this.billing = this.db.object("products/" + key);
    return this.billing;
  }

 

  deleteBilling(key: string) {
    this.billings.remove(key);
  }
}
