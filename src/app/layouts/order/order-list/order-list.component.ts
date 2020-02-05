import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  orderId: number;
  ngOnInit() {
    this.orderId = 1653;
    this.orderService.getOrder(this.orderId).subscribe(response => {
      console.log(response);

    });
  }

}
