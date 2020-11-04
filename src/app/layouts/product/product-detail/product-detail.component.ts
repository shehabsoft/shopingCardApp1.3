import { Product } from '../../../shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { ProductF } from 'src/app/shared/models/productF';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';
import { AuthServiceLocal } from 'src/app/shared/services/auth.service.local';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { Title } from '@angular/platform-browser';

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
      private toastrService: ToastrService,
      public authService: AuthServiceLocal, public translate: TranslateService, private titleService: Title
     
	) {
      this.product = new ProductF();
     
	}

	ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          const id = params['id']; // (+) converts string 'id' to a number
          console.log("get produt Details with ID " + id);
          this.productSeller = this.productService.getLocalProductById(id);
     
        this.product = this.productSeller.product;
        this.setTitle(this.product.nameAr +"  : " + this.product.price +"   جنيه");
        console.log("Selected Product :" + this.product);
		});
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
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
