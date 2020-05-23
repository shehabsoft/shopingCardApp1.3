import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
 
import { AuthServiceLocal } from 'src/app/shared/services/auth.service.local';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: OrderService, private authService: AuthServiceLocal) { }
  orderId: number;
  user: User;
  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.orderService.getOrders(this.user.id).subscribe(response => {
      console.log(response);

    });
    this.orderService.getOrder(this.orderId).subscribe(response => {
      console.log(response);

    });
  }

}
