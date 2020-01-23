import { ProductService } from '../../../../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../../shared/models/product';
import { ProductF } from 'src/app/shared/models/productF';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {
	checkoutProducts: ProductsSeller[];

	totalPrice = 0;
	constructor(productService: ProductService) {
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';

		const products = productService.getLocalCartProducts();

		this.checkoutProducts = products;

      products.forEach((productSeller) => {
        this.totalPrice += productSeller.product.price * productSeller.product.quantity;
		});
	}

	ngOnInit() {}
}
