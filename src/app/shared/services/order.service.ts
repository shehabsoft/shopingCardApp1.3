import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductF } from '../models/productF';
import { EventEmitter } from 'events';
import { Order } from '../models/order';
import { ProductsSeller } from '../models/productsSeller';
import { CleaningFee } from '../models/cleaningFee';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://localhost:8090/Order/";

@Injectable()
export class OrderService {
  ordersObs: Observable<Order[]>;
  orders: Order[];
  product: ProductF = new ProductF;
 
 

	// NavbarCounts
	navbarCartCount = 0;
	navbarFavProdCount = 0;

	constructor(
		private db: AngularFireDatabase,
		private authService: AuthService,
      private toastrService: ToastrService, private http: HttpClient 
	) {
		
      this.getOrders().subscribe((heros) => {
        this.orders = heros;
      });
    //  this.calculateLocalFavProdCounts();
     // this.calculateLocalCartProdCounts();
     // this.resetLocalCartProducts();
   
	}
  getOrders1(): Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl, httpOptions).pipe(
      tap(heroes => console.log(heroes))
      

    );
  }
  getOrder(id: number): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(heros => console.log(`fetched product id=${id}`))
    );

  }
  getOrders(): Observable<Order[]> {
		////this.products = this.db.list('products');
      // return this.products;
    this.ordersObs = this.getOrders1();
    this.ordersObs.subscribe(heros => {
      localStorage.setItem('order_list', JSON.stringify(heros));
    });

        
    return this.ordersObs;
  }
  getLocalOrderById(id: number): Order {
    let orderList: Order[];
    let order: Order;
    orderList = JSON.parse(localStorage.getItem('order_list'));
    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].id == id) {
        order = orderList[i];
        break;
      }
    }

    return order;
  }
  confirmOrder(order: Order): Observable<Order> {
    order.status = 2;
    console.log("Before Creation")
    const url = `${apiUrl}/` + order.id;
    return this.http.put<Order>(url, order, httpOptions).pipe(
      tap(hero => {
        console.log(hero);
        this.getOrders().subscribe((heros) => {
          this.orders = heros;
        });

      }
      )
    );


  }
  FullFillOrder(order: Order): Observable<Order> {
    order.status = 3;
    console.log("Before Creation")
    const url = `${apiUrl}/` + order.id;
    return this.http.put<Order>(url, order, httpOptions).pipe(
      tap(hero => {
        console.log(hero);
        this.getOrders().subscribe((heros) => {
          this.orders = heros;
        });

      }
      )
    );


  }

 
   
   
	updateOrder(data: Order) {
	//	this.products.update(data.$key, data);
	}

  deleteOrder(key: string): Observable<Order> {
      const url = `http://localhost:8090/Order/${key}`;

      return this.http.delete<Order>(url, httpOptions).pipe(
        tap(_ => {

          console.log(`deleted product id=${key}`);

          this.getOrders1().subscribe((heros) => {
            this.orders = heros
          });
        })
        
      );
	}

	/*
   ----------  Favourite Product Function  ----------
  */
 
 
 
 
 

 

	/*
   ----------  Cart Product Function  ----------
  */
 

	// Removing cart from local
	removeOrder(order: Order) {
      const orders: Order[] = JSON.parse(localStorage.getItem('order_item'));

      for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === order.id) {
          orders.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
      localStorage.setItem('avct_item', JSON.stringify(orders));

		//this.calculateLocalCartProdCounts();
	}
  resetLocalOrder() {
    let products1: Order[];
    localStorage.setItem('order_item', JSON.stringify(products1));
   // this.calculateLocalCartProdCounts();
  }
	// Fetching Locat CartsProducts
  getLocalCartProducts(): ProductsSeller[] {
    let products1: ProductsSeller[];
    if (localStorage.getItem('avct_item') === "undefined") {

      products1 = [];
    } else {
      products1 = JSON.parse(localStorage.getItem('avct_item'));  }
	 

    return products1;
  }

  // Fetching Locat CartsProducts
  getLocalOrder(): Order{
    let order: Order;
    if (localStorage.getItem('order') === "undefined") {

      order = null;
    } else {
      order = JSON.parse(localStorage.getItem('order'));
    }


    return order;
  }

  setLocalOrder(order:Order) {
    
    localStorage.setItem('order', JSON.stringify(order));
    }

 
   
    
}
 
