import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductF } from 'src/app/shared/models/productF';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';

@Component({
	selector: 'app-cart-calculator',
	templateUrl: './cart-calculator.component.html',
	styleUrls: [ './cart-calculator.component.scss' ]
})
export class CartCalculatorComponent implements OnInit, OnChanges {
  @Input() products: ProductsSeller[];

	totalValue = 0;
	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.products;

		const products: ProductsSeller[] = dataChanges.currentValue;
		this.totalValue = 0;
		products.forEach((productseller) => {
          this.totalValue += productseller.product.price * productseller.product.quantity;
		});
	}

	ngOnInit() {}
}
