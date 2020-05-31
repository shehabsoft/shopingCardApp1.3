import { Product } from '../../../../shared/models/product';
import { ShippingService } from '../../../../shared/services/shipping.service';
import { UserDetail, User } from '../../../../shared/models/user';
import { AuthServiceLocal } from '../../../../shared/services/auth.service.local';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductF } from 'src/app/shared/models/productF';
import { Billing } from 'src/app/shared/models/billing';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';
import { TranslateService } from 'src/app/shared/services/translate.service';
@Component({
	selector: 'app-shipping-details',
	templateUrl: './shipping-details.component.html',
	styleUrls: [ './shipping-details.component.scss' ]
})
export class ShippingDetailsComponent implements OnInit {
	user: User;

	userDetail: UserDetail;

	productsSeller: ProductsSeller[];

	constructor(
      authService: AuthServiceLocal,
		private shippingService: ShippingService,
		private productService: ProductService,
      private router: Router
        , public translate: TranslateService
	) {
		/* Hiding products Element */
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'block';
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';
      this.userDetail = new UserDetail;
	
      this.productsSeller = productService.getLocalCartProducts();

      this.user = authService.getLoggedInUser();
    
	}

  ngOnInit() { }
  billing: Billing;
	updateUserDetails(form: NgForm) {
		const data = form.value;
      console.log(data);
		data['emailId'] = this.user.email;
		data['userId'] = this.user.id;
		const products = [];

      let totalPrice = 0;
      let totalCleaning = 0;
      let totalPacakging = 0;
     
 
      this.productsSeller.forEach((productSeller) => {
		//	delete product['id'];
         totalPrice += productSeller.product.price * productSeller.product.quantity;
         totalCleaning += productSeller.product.cleaningFee.feeAmount;
        products.push(productSeller);
      });
      totalPacakging = products.length * 5;
      totalPrice +=  totalCleaning;
      totalPrice += totalPacakging;

		data['products'] = products;

		data['totalPrice'] = totalPrice;

      data['shippingDate'] = Date.now();
      console.log("Start Calling Backend");
      this.billing = new Billing;
      this.billing.userDetails = this.userDetail;
      this.billing.totalPrice = totalPrice;
      this.billing.user = this.user;
      console.log(this.user);


      this.shippingService.createshippings(this.billing, this.productsSeller).subscribe((response) => {
      
        this.productService.setLocalOrder(response);
        this.router.navigate(['checkouts', { outlets: { checkOutlet: ['billing-details'] } }]);

      }

      )
       

	
	}
}
