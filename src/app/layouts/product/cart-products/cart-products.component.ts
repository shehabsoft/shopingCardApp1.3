import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { ProductF } from 'src/app/shared/models/productF';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';
import { CleaningFee } from 'src/app/shared/models/cleaningFee';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
	selector: 'app-cart-products',
	templateUrl: './cart-products.component.html',
	styleUrls: [ './cart-products.component.scss' ]
})
export class CartProductsComponent implements OnInit {
	cartProducts: ProductsSeller[];
  showDataNotFound = true;
  cleaningFlages: CleaningFee[];
  cleaningFeeID: number;
	// Not Found Message
	messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Products to Cart';

	constructor(private productService: ProductService) {}

  ngOnInit() {

    this.cartProducts = this.productService.getLocalCartProducts();
    this.getCleaningFlages();
	}

	removeCartProduct(product: Product) {
		this.productService.removeLocalCartProduct(product);

		// Recalling
		this.getCartProduct();
  } 
  updatequantity(product: ProductF) {
    console.log("update" + product.quantity);
    this.productService.updateQuantityOnLocalStorage(product);
  }

  onOptionsSelected(product: ProductF ,value: number) {
    console.log("the selected value is " + value + product);
    this.cleaningFeeID = value;
    console.log("Fee ID" + this.cleaningFeeID);
    product.cleaningFee.id = this.cleaningFeeID;
    for (let i = 0; i < this.cleaningFlages.length; i++) {
      if (this.cleaningFeeID == this.cleaningFlages[i].id) {
        product.cleaningFee = this.cleaningFlages[i];
      }
    }

    this.productService.updateFeesOnLocalStorage(product)
  }
  update(e) {
    //this.cleaningFeeID = selectedCleaningId;
  //  console.log("Fee ID" + this.cleaningFeeID);
   // product.cleaningFee.id = selectedCleaningId;
   // product.cleaningFee.id = selectedCleaningId;
    //this.productService.updateFeesOnLocalStorage(product);
   // this.productService.update();

  }
	getCartProduct() {
      this.cartProducts = this.productService.getLocalCartProducts();
      console.log(this.cartProducts);
  }

  getCleaningFlages() {

    this.productService.getCleaningFees().subscribe(response => {

      this.cleaningFlages = response;

    });
    
 
  }
}
