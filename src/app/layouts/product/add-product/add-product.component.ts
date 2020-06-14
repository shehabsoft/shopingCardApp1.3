import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ProductF } from 'src/app/shared/models/productF';
import { Router } from '@angular/router';
import { AuthServiceLocal } from 'src/app/shared/services/auth.service.local';
import { Category } from 'src/app/shared/models/category';
import { Constant } from 'src/app/shared/models/constant';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');
const apiUrl = Constant.API_ENDPOINT + "Product/";

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: [ './add-product.component.scss' ]
})

export class AddProductComponent implements OnInit {
  product: ProductF = new ProductF();
   category: Category = new Category();
   categoryList: Category[];
   categoryItem: string;
   fileData: File = null;
   previewUrl:any = null;
   fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private productService: ProductService, private router: Router, private authService: AuthServiceLocal, private http: HttpClient) {
 
  }
  data: ProductF = new ProductF();
  ngOnInit() {

    
    this.categoryList= [];
    this.category.name_ar = "FISH";
    this.category.name_en = "FISH";
     this.categoryList.push(this.category);
    this.category = new Category();
    this.category.name_ar = "MEAT";
    this.category.name_en = "MEAT";
    this.categoryList.push(this.category);
     this.category = new Category();
    this.category.name_ar = "CLEANING";
    this.category.name_en = "CLEANING";
    this.categoryList.push(this.category);
    this.category = new Category();
    this.category.name_ar = "SWEETS";
    this.category.name_en = "SWEETS";
    this.categoryList.push(this.category);
  

  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  onOptionsSelected( value: string) {
    console.log("the selected value is " + value + value);
    this.categoryItem = value;

  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit(productForm: NgForm) {
    productForm.value['productId'] = 'PROD_' + shortId.generate();
    productForm.value['productAdded'] = moment().unix();
    productForm.value['ratings'] = Math.floor(Math.random() * 5 + 1);
    if (productForm.value['img_url'] === undefined) {
      productForm.value['img_url'] = '../../../assets/img/estakotha.png';
    }
    
    productForm.value['favourite'] = false;
    console.log(productForm);
    const date = productForm.value['productAdded'];

    this.data.nameAr = productForm.value.name_ar;
    this.data.nameEn = productForm.value.name_en;
    this.data.price = productForm.value.price;
    this.data.details = productForm.value.details;
    this.data.quantity = productForm.value.quantity;
    this.data.category = this.categoryItem;
    this.data.user = this.authService.getLoggedInUser();
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append("product", JSON.stringify(this.data));
 

    return this.productService.createProductFinal(formData).subscribe(
      (hero) => {
        console.log(hero);
        this.product = new ProductF();

        $('#exampleModalLong').modal('hide');

        toastr.success('product ' + this.data.nameEn + 'is added successfully', 'Product Creation');
        this.router.navigate(['products/all-products']);

      });
    
  }
 
	createProduct(productForm: NgForm) {
		productForm.value['productId'] = 'PROD_' + shortId.generate();
		productForm.value['productAdded'] = moment().unix();
		productForm.value['ratings'] = Math.floor(Math.random() * 5 + 1);
      if (productForm.value['img_url'] === undefined) {
        productForm.value['img_url'] = '../../../assets/img/estakotha.png';
		}
      //this.onSubmit();
      productForm.value['favourite'] = false;
      console.log(productForm);
      const date = productForm.value['productAdded'];
      
      this.data.nameAr = productForm.value.name_ar;
      this.data.nameEn = productForm.value.name_en;
      this.data.price = productForm.value.price;
      this.data.details = productForm.value.details;
      this.data.quantity = productForm.value.quantity;
      this.data.category = this.categoryItem;
      this.data.user = this.authService.getLoggedInUser();
     // this.data.img_url =  productForm.value['img_url'];
      this.data.imgUrl = '../../../assets/img/estakotha.png';

      const formData = new FormData();
      formData.append('file', this.fileData);
     
      this.data.file = formData;
      console.log("Image Data " + this.data.file);
      this.productService.createProduct1(this.data).subscribe(
        (hero) => {
          console.log(hero);
          this.product = new ProductF();
         
          $('#exampleModalLong').modal('hide');

          toastr.success('product ' + this.data.nameEn + 'is added successfully', 'Product Creation');
          this.router.navigate(['products/all-products']);

        }
      );

		
	}
}
