import { Product } from '../../../../shared/models/product';
import { ShippingService } from '../../../../shared/services/shipping.service';
import { UserDetail, User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductF } from 'src/app/shared/models/productF';
@Component({
	selector: 'app-shipping-details',
	templateUrl: './shipping-details.component.html',
	styleUrls: [ './shipping-details.component.scss' ]
})
export class ShippingDetailsComponent implements OnInit {
	userDetails: User;

	userDetail: UserDetail;

	products: ProductF[];

	constructor(
		authService: AuthService,
		private shippingService: ShippingService,
		productService: ProductService,
		private router: Router
	) {
		/* Hiding products Element */
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'block';
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';

		this.userDetail = new UserDetail();
		this.products = productService.getLocalCartProducts();
		this.userDetails = authService.getLoggedInUser();
	}

	ngOnInit() {}

	updateUserDetails(form: NgForm) {
		const data = form.value;
      console.log(form);
		data['emailId'] = this.userDetails.email;
		data['userId'] = this.userDetails.$key;
		const products = [];

		let totalPrice = 0;

		this.products.forEach((product) => {
			delete product['id'];
			totalPrice += product.price;
			products.push(product);
		});

		data['products'] = products;

		data['totalPrice'] = totalPrice;

		data['shippingDate'] = Date.now();

	//	this.shippingService.createshippings(data);

		this.router.navigate([ 'checkouts', { outlets: { checkOutlet: [ 'billing-details' ] } } ]);
	}
}
