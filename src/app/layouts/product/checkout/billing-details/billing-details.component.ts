import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../shared/models/product';
import { BillingService } from '../../../../shared/services/billing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserDetail } from '../../../../shared/models/user';
import { AuthServiceLocal } from '../../../../shared/services/auth.service.local';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductF } from 'src/app/shared/models/productF';
import { Order } from 'src/app/shared/models/order';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';

@Component({
	selector: 'app-billing-details',
	templateUrl: './billing-details.component.html',
	styleUrls: [ './billing-details.component.scss' ]
})
export class BillingDetailsComponent implements OnInit {
	userDetails: User;
	products: ProductsSeller[];
	userDetail: UserDetail;
  totalPrice: number;
  order: Order;
	constructor(
      private authService: AuthServiceLocal,
		private billingService: BillingService,
		private productService: ProductService,
		private router: Router
	) {
		/* Hiding Shipping Tab Element */
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'block';
		document.getElementById('resultTab').style.display = 'none';

		this.userDetail = new UserDetail();
		this.products = productService.getLocalCartProducts();
		this.userDetails = authService.getLoggedInUser();
	}

  ngOnInit() {
    this.totalPrice = 0;
    this.products = this.productService.getLocalCartProducts();
    this.userDetails = this.authService.getLoggedInUser();
    this.order = this.productService.getLocalOrder();

    console.log("Start from Herer" + this.order.id);

    let total = 0;
    let totalPacakging = 0;
    let totalCleaning = 0;

    this.products.forEach((productseller: ProductsSeller) => {
      console.log(productseller);
      totalPacakging += 5 * productseller.product.quantity;
      total += (productseller.product.price * productseller.product.quantity);
      totalCleaning += productseller.product.cleaningFee.feeAmount * productseller.product.quantity;


    });
    this.totalPrice += total + totalCleaning + totalPacakging;
      }

	updateUserDetails(form: NgForm) {
		const data = form.value;
 
	  

	 
     // this.productService.resetLocalCartProducts();
     // this.billingService.createBillings(data, products);

      this.router.navigate(['checkouts', { outlets: { checkOutlet: ['result'] } }]);
     // this.productService.resetLocalCartProducts();
	}
}
