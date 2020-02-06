import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
 

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  private sub: any;
  order: Order;
  constructor(private route: ActivatedRoute, private router: Router,
    private ordertService: OrderService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      console.log("get Order Details with ID " + id);
      this.order = this.ordertService.getLocalOrderById(id);
      console.log(this.order);
    });
  }
  fullFillOrder() {
    this.ordertService.FullFillOrder(this.order).subscribe(response => {
      this.toastrService.success("Order " + response.id + " Has Been Completed ", 'Complete Order');
      
      this.router.navigate(['orders']);


    });
  }

}
