import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
 
import { AuthServiceLocal } from 'src/app/shared/services/auth.service.local';
import { User } from 'src/app/shared/models/user';
import { Order } from 'src/app/shared/models/order';
import { OrdersProducts } from 'src/app/shared/models/ordersProducts';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: OrderService, private authService: AuthServiceLocal) { }
  orderId: number;
  user: User;
  orders: Order[];
  totalSellerValue = 0;
  orderProfitValue = 0;
  packagePriceValue = 0;
  totalCleaning = 0;
  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.orderService.getOrders(this.user.id).subscribe(response => {
      console.log(response);
      this.orders = response;
      this.totalSellerValue = 0;
      this.orderProfitValue = 0;
      this.packagePriceValue = 0;
      this.totalCleaning = 0;
      this.orders.forEach(order => {
        const products: OrdersProducts[] = order.ordersProducts;
 
        products.forEach((productseller) => {
          this.packagePriceValue += (productseller.quantity * 5);
          if (productseller.cleaningFee.id != 3 && productseller.cleaningFee.feeAmount>0) {//  3 is id for no cleaning
            this.totalSellerValue += productseller.product.sellerPrice * productseller.quantity;
            this.totalCleaning += (productseller.quantity * 5);
          } else {
            this.totalSellerValue += productseller.product.sellerPrice * productseller.quantity
          }
          this.orderProfitValue += (productseller.product.price * productseller.quantity) - (productseller.product.sellerPrice * productseller.quantity)

        });

      });
      

    });
    this.orderService.getOrder(this.orderId).subscribe(response => {
      console.log(response);

    });
  }

}
