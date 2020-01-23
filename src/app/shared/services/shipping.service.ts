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
import { Observable } from "rxjs";
 
import { catchError, tap, map } from 'rxjs/operators';
import { OrdersProducts } from "../models/ordersProducts";
import { User } from "../models/user";
import { Country } from "../models/country";
import { ProductService } from "./product.service";
import { ProductsSeller } from "../models/productsSeller";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var $: any;
declare var toastr: any;
const apiUrl = "http://localhost:8090/Order/";
@Injectable({
  providedIn: "root"
})
export class ShippingService {
  shippings: AngularFireList<Billing>;
  shipping: AngularFireObject<Billing>;
  country: Country;
  order: Order;
  orderObservable: Observable<Order>;
  constructor(private db: AngularFireDatabase, private http: HttpClient, private productService: ProductService) {
    this.getshippings();
  }

 

  getshippings() {
    this.shippings = this.db.list("shippings");
    return this.shippings;
  }

  getshippingById(key: string) {
    this.shipping = this.db.object("products/" + key);
    return this.shipping;
  }

 

  deleteshipping(key: string) {
    this.shippings.remove(key);
  }
  createdOrder: Order;
  ordersProducts: OrdersProducts[];
  ordersProduct: OrdersProducts;
  arr: ProductF[] = [];
  createshippings(data: Billing, productList: ProductsSeller[]): Observable<Order>{
   
    this.order = new Order;
    this.country = new Country;
    this.country.id = 2;  
    this.order.status = 1;
    this.order.country = this.country;
    this.order.user = data.user;
    this.order.address1 = data.user.address;
    this.order.address2 = data.userDetails.address2;
   
   
    this.order.zip = data.userDetails.zip;
    this.ordersProducts = [];
    let total = 0;
    productList.forEach((productseller: ProductsSeller) => {
      console.log(productseller);
      total += (productseller.product.price * productseller.product.quantity);
      this.ordersProduct = new OrdersProducts;
      this.ordersProduct.product = productseller.product;
      this.ordersProduct.quantity = productseller.product.quantity;
     
      this.ordersProducts.push(this.ordersProduct);
     }
     );
    
    this.order.total = total;
   this.order.ordersProducts = this.ordersProducts;

    this.orderObservable = this.create(this.order);

    return this.orderObservable;
    
  }

  create(order: Order): Observable<Order> {
    console.log("Before Creation")
    console.log(order);
    return this.http.post<Order>(apiUrl, order, httpOptions).pipe(
      tap(hero => {
        this.createdOrder = hero;
        console.log(hero);
        toastr.success('Order ' + hero.id + ' : is Pending Confirmation', 'Order Creation');


      }
      )
    );


  }
}
