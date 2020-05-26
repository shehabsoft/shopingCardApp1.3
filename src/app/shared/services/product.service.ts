import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { AuthServiceLocal } from './auth.service.local';
import { ToastrService } from './toastr.service';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ProductF } from '../models/productF';
import { EventEmitter } from 'events';
import { Order } from '../models/order';
import { ProductsSeller } from '../models/productsSeller';
import { CleaningFee } from '../models/cleaningFee';
import { Constant } from "../models/constant"; 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'} )
};
const apiUrl = Constant.API_ENDPOINT+"Product/";

@Injectable()
export class ProductService {
  productsObs: Observable<ProductsSeller[]>;
  products: ProductsSeller[];
  product: ProductF = new ProductF;
 
	// favouriteProducts
	favouriteProducts: AngularFireList<FavouriteProduct>;
	cartProducts: AngularFireList<FavouriteProduct>;

	// NavbarCounts
	navbarCartCount = 0;
	navbarFavProdCount = 0;

	constructor(
		private db: AngularFireDatabase,
		private authService: AuthServiceLocal,
      private toastrService: ToastrService, private http: HttpClient
	) {
		
      this.getProducts().subscribe((heros) => {
        this.products = heros;
      });
      this.calculateLocalFavProdCounts();
      this.calculateLocalCartProdCounts();
     // this.resetLocalCartProducts();
   
	}
  getProducts1(): Observable<ProductsSeller[]> {
    return this.http.get<ProductsSeller[]>(apiUrl, httpOptions).pipe(
      tap(heroes => console.log(heroes))
      

    );
  }

  getCleaningFees(): Observable<CleaningFee[]> {
    const url = Constant.API_ENDPOINT + '/CleaningFee/';
    return this.http.get<CleaningFee[]>(url, httpOptions).pipe(
      tap(heroes => console.log(heroes))

          );
  }

 
  getProducts(): Observable<ProductsSeller[]> {
		////this.products = this.db.list('products');
      // return this.products;
    this.productsObs = this.getProducts1();
   
    this.productsObs.subscribe(heros => {
      localStorage.setItem('item_list', JSON.stringify(heros));
      console.log("products List " + JSON.stringify(heros));
    });

    console.log("products List " + this.productsObs);
      return this.productsObs;
  }
  getLocalProductById(id:number): ProductsSeller {
    let productSellerList: ProductsSeller[];
    let productSerller: ProductsSeller;
    productSellerList = JSON.parse(localStorage.getItem('item_list'));
    for (let i = 0; i < productSellerList.length; i++) {
      if (productSellerList[i].product.id == id) {
        productSerller = productSellerList[i];
        break;
      }
    }

    return productSerller;
  }

  createProduct1(data: ProductF): Observable<ProductF> {
    console.log("Before Creation")
    data.id = 1000;
    console.log(data);
    return this.http.post<ProductF>(apiUrl, data, httpOptions).pipe(
      tap(hero => {
        console.log(hero);
        let a: ProductF[];
        a = JSON.parse(localStorage.getItem('item_list')) || [];
        a.push(data);
        localStorage.setItem('item_list', JSON.stringify(a));
        this.getProducts().subscribe((heros) => {
          this.products = heros
        });
      }
      )
    );
  
   
  }
  createProductFinal(data: FormData): Observable<any>{
    console.log("Before Creation")
    let product: ProductF ;
    console.log(data);
    const req = new HttpRequest('POST', apiUrl+'upload', data);


    return this.http.request(req).pipe(
      tap(heros => {
        
        this.getProducts().subscribe((heros) => {
          this.products = heros
        });

      }

      )


    );
        
    

  }
  createProduct(data: ProductF) {

     return  this.createProduct1(data);

	}
  getProduct(id: string): Observable<ProductF> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ProductF>(url).pipe(
      tap(heros => console.log(`fetched product id=${id}`))
    );
    
  }
   
   
	updateProduct(data: ProductF) {
	//	this.products.update(data.$key, data);
	}

  deleteProduct(key: string): Observable<ProductF> {
    const url = `${apiUrl}${key}`;

      return this.http.delete<ProductF>(url, httpOptions).pipe(
        tap(_ => {

          console.log(`deleted product id=${key}`);

          this.getProducts().subscribe((heros) => {
            this.products = heros
          });
        })
        
      );
	}

	/*
   ----------  Favourite Product Function  ----------
  */

	// Get Favourite Product based on userId
	getUsersFavouriteProduct() {
		const user = this.authService.getLoggedInUser();
		this.favouriteProducts = this.db.list('favouriteProducts', (ref) =>
			ref.orderByChild('userId').equalTo(user.$key)
		);
		return this.favouriteProducts;
	}

	// Adding New product to favourite if logged else to localStorage
	addFavouriteProduct(data: ProductF): void {
		let a: ProductF[];
		a = JSON.parse(localStorage.getItem('avf_item')) || [];
		a.push(data);
		this.toastrService.wait('Adding Product', 'Adding Product as Favourite');
		setTimeout(() => {
			localStorage.setItem('avf_item', JSON.stringify(a));
			this.calculateLocalFavProdCounts();
		}, 1500);
	}

	// Fetching unsigned users favourite proucts
	getLocalFavouriteProducts(): ProductF[] {
		const products: ProductF[] = JSON.parse(localStorage.getItem('avf_item')) || [];

		return products;
	}

	// Removing Favourite Product from Database
	removeFavourite(key: string) {
		this.favouriteProducts.remove(key);
	}

	// Removing Favourite Product from localStorage
	removeLocalFavourite(product: ProductF) {
		const products: ProductF[] = JSON.parse(localStorage.getItem('avf_item'));

		for (let i = 0; i < products.length; i++) {
			if (products[i].id === product.id) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem('avf_item', JSON.stringify(products));

		this.calculateLocalFavProdCounts();
	}

	// Returning Local Products Count
	calculateLocalFavProdCounts() {
		this.navbarFavProdCount = this.getLocalFavouriteProducts().length;
	}

	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Product to cart db if logged in else localStorage
	addToCart(data: ProductsSeller): void {
      let a: ProductsSeller[];
      data.product.quantity = 1;
      let cleaningFee =new  CleaningFee;

      cleaningFee.id = 0;
      data.product.cleaningFee = cleaningFee; 
      if (localStorage.getItem('avct_item') === "undefined" || localStorage.getItem('avct_item')===null) {

        a = [];
      } else {
        a = JSON.parse(localStorage.getItem('avct_item')) 
      }
      a.push(data);
      console.log("Cart Items " + data.id);
		this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
		setTimeout(() => {
			localStorage.setItem('avct_item', JSON.stringify(a));
			this.calculateLocalCartProdCounts();
		}, 500);
	}

	// Removing cart from local
	removeLocalCartProduct(product: Product) {
      const products: ProductsSeller[] = JSON.parse(localStorage.getItem('avct_item'));

      for (let i = 0; i < products.length; i++) {
        if (products[i].product.id === product.id) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem('avct_item', JSON.stringify(products));

		this.calculateLocalCartProdCounts();
	}
  resetLocalCartProducts() {
    let products1: ProductsSeller[];
    localStorage.setItem('avct_item', JSON.stringify(products1));
    this.calculateLocalCartProdCounts();
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

 
   
  updateQuantityOnLocalStorage(product: ProductF) {
    const products = this.getLocalCartProducts();
    for (let i = 0; i < products.length; i++) {
      if (product.id === products[i].product.id) {
        products[i].product.quantity = product.quantity;
      }
    }
    localStorage.setItem('avct_item', JSON.stringify(products));

    this.calculateLocalCartProdCounts();

  }
  update() {

  }
  updateFeesOnLocalStorage(product: ProductF) {
    const products = this.getLocalCartProducts();
    for (let i = 0; i < products.length; i++) {
      if (product.id === products[i].product.id) {
        products[i].product.cleaningFee = product.cleaningFee;
      }
    }
    localStorage.setItem('avct_item', JSON.stringify(products));

    this.calculateLocalCartProdCounts();

  }
	// returning LocalCarts Product Count
  calculateLocalCartProdCounts() {

    if (this.getLocalCartProducts() != null) {
      this.navbarCartCount = this.getLocalCartProducts().length;
    }

  }
}

export class FavouriteProduct {
	product: ProductF;
	productId: string;
	userId: string;
}
