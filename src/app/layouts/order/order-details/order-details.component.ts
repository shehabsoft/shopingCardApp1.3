import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { OrdersProducts } from 'src/app/shared/models/ordersProducts';
 

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  private sub: any;
  order: Order;
  totalSellerValue = 0;
  orderProfitValue = 0;
  constructor(private route: ActivatedRoute, private router: Router,
    private ordertService: OrderService,
    private toastrService: ToastrService, public translate: TranslateService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      console.log("get Order Details with ID " + id);
      this.order = this.ordertService.getLocalOrderById(id);
      console.log(this.order);

      const products: OrdersProducts[] = this.order.ordersProducts;
      this.totalSellerValue = 0;
      this.orderProfitValue = 0;
      products.forEach((productseller) => {
        if (productseller.cleaningFee != null) {
          this.totalSellerValue += productseller.product.sellerPrice * productseller.quantity + (productseller.quantity * 5);
        } else {
          this.totalSellerValue += productseller.product.sellerPrice * productseller.quantity  
        }
       
      });
      this.orderProfitValue= this.order.total - this.totalSellerValue - 30;
    });
  }
  fullFillOrder() {
    this.ordertService.FullFillOrder(this.order).subscribe(response => {
      this.toastrService.success("Order " + response.id + " Has Been Completed ", 'Complete Order');
      
      this.router.navigate(['orders']);


    });
  }

}
