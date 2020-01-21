import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../../../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductF } from 'src/app/shared/models/productF';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
declare var $: any;
declare var toastr: any;
@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	products: ProductF[];
	date: number;
	totalPrice = 0;
  tax = 30;
  order: Order;

  constructor(private productService: ProductService, private router: Router) {
		/* Hiding Billing Tab Element */
		document.getElementById('productsTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'block';

		this.products = productService.getLocalCartProducts();

      this.products.forEach((product) => {
        this.totalPrice += product.price * product.quantity;
		});

		this.date = Date.now();
	}

	ngOnInit() { }
  completeOrder() {
    this.downloadReceipt();
    this.order = this.productService.getLocalOrder();
    toastr.success('Order ' + this.order.id + 'is Created successfully', 'Order Creation');
    this.productService.resetLocalCartProducts();
    this.router.navigate(['products/all-products']);

  }
	downloadReceipt() {
		const data = document.getElementById('receipt');
		// console.log(data);

		html2canvas(data).then((canvas) => {
			// Few necessary setting options
			const imgWidth = 208;
			const pageHeight = 295;
			const imgHeight = canvas.height * imgWidth / canvas.width;
			const heightLeft = imgHeight;

			const contentDataURL = canvas.toDataURL('image/png');
			const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
			const position = 0;
			pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
			pdf.save('invoice.pdf'); // Generated PDF
		});
	}
}
