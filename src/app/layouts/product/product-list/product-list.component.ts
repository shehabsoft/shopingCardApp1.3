import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { AuthServiceLocal } from '../../../shared/services/auth.service.local';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { ProductF } from 'src/app/shared/models/productF';
import { Observable } from 'rxjs';
import { ProductsSeller } from 'src/app/shared/models/productsSeller';
import { TranslateService } from "../../../shared/services/translate.service";

declare var toastr: any;
@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit{
	productList: ProductsSeller[];
	loading = false;
  brands = ['All', 'FISH', 'SHEEP', 'MEAT', 'CLEANING','SWEETS'];
   imageUrl;
	selectedBrand: 'All';

  imageBlobUrl: string | null = null;
	page = 1;
	constructor(
      public authService: AuthServiceLocal,
      private productService: ProductService,
      private toastrService: ToastrService, public translate: TranslateService
	) { }

	ngOnInit() {
		this.getAllProducts();
  }
  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => { });
  }
	getAllProducts() {
		// this.spinnerService.show();
		this.loading = true;
		const x = this.productService.getProducts();
		x.subscribe(
			(product) => {
				this.loading = false;
				// this.spinnerService.hide();
				this.productList = [];
              product.forEach((element) => {
                console.log(element);
                this.productList.push(element);
              
              });
              
			},
			(err) => {
				this.toastrService.error('Error while fetching Products', err);
			}
		);
  }

  getImageUrl(image: Blob): string {
    let reader = new FileReader();
    console.log("image Data :" + image);
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result.toString();
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    return this.imageBlobUrl;
  }

	removeProduct(key: string) {
      this.productService.deleteProduct(key).subscribe(
        (hero) => {
          console.log(hero);
          toastr.success('product  is Deleted successfully', 'Product Deletion');
          this.getAllProducts();
        }
      );
	}

	addFavourite(product: ProductF) {
		this.productService.addFavouriteProduct(product);
	}

	addToCart(product: ProductsSeller) {
		this.productService.addToCart(product);
	}
}
