import { ProductService } from '../../../../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../../shared/models/product';
import { ProductF } from 'src/app/shared/models/productF';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {
	checkoutProducts: ProductsSeller[];
  totalCleaning = 0;
  totalPrice = 0;
  totalPacakging = 0;
  constructor(productService: ProductService, public translate: TranslateService) {
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';
 
		const products = productService.getLocalCartProducts();

      this.checkoutProducts = products;
     
      products.forEach((productSeller) => {
        this.totalPrice += productSeller.product.price * productSeller.product.quantity;
        this.totalPacakging += 5 * productSeller.product.quantity;
        if (productSeller.product.cleaningFee.id != 0) {
          console.log("Cleaning Fee" + productSeller.product.cleaningFee);
          this.totalCleaning += productSeller.product.cleaningFee.feeAmount * productSeller.product.quantity;
        } 
       
      });
      this.totalPrice += this.totalCleaning;
      this.totalPrice +=this.totalPacakging;
	}

	ngOnInit() {}
}
