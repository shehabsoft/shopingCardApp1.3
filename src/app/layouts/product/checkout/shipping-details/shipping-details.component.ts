import { Product } from '../../../../shared/models/product';
import { ShippingService } from '../../../../shared/services/shipping.service';
import { UserDetail, User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductF } from 'src/app/shared/models/productF';
import { Billing } from 'src/app/shared/models/billing';
@Component({
	selector: 'app-shipping-details',
	templateUrl: './shipping-details.component.html',
	styleUrls: [ './shipping-details.component.scss' ]
})
export class ShippingDetailsComponent implements OnInit {
	user: User;

	userDetail: UserDetail;

	products: ProductF[];

	constructor(
		authService: AuthService,
		private shippingService: ShippingService,
		private productService: ProductService,
		private router: Router
	) {
		/* Hiding products Element */
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'block';
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';
      this.userDetail = new UserDetail;
	
      this.products = productService.getLocalCartProducts();

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

		this.products.forEach((product) => {
		//	delete product['id'];
			totalPrice += product.price;
			products.push(product);
		});

		data['products'] = products;

		data['totalPrice'] = totalPrice;

      data['shippingDate'] = Date.now();
      console.log("Start Calling Backend");
      this.billing = new Billing;
      this.billing.userDetails = this.userDetail;
      this.billing.totalPrice = totalPrice;
      this.billing.user = this.user;
      console.log(this.user);


      this.shippingService.createshippings(this.billing, this.products).subscribe((response) => {
      
        this.productService.setLocalOrder(response);
        this.router.navigate(['checkouts', { outlets: { checkOutlet: ['billing-details'] } }]);

      }

      )
       

	
	}
}
