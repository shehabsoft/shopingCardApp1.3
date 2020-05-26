import { Product } from '../../../shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { ProductF } from 'src/app/shared/models/productF';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.scss' ]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	private sub: any;
  product: ProductF;
  productSeller: ProductsSeller;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
      private toastrService: ToastrService
     
	) {
		this.product = new ProductF();
	}

	ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          const id = params['id']; // (+) converts string 'id' to a number
          console.log("get produt Details with ID " + id);
          this.productSeller = this.productService.getLocalProductById(id);
     
        this.product = this.productSeller.product;
        console.log("Selected Product :" + this.product);
		});
	}

	getProductDetail(id: string) {
		// this.spinnerService.show();
      this.productService.getProduct(id).subscribe(hero => {
        console.log(hero);
        this.product = hero;

        console.log("Product Details " + this.product.nameEn);
      });
		 
	}

	addToCart(product: ProductsSeller) {
		this.productService.addToCart(product);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
