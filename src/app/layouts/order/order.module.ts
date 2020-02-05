import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderRoutes } from "./order.routing";
@NgModule({
  imports: [CommonModule, RouterModule.forChild(OrderRoutes)],
  declarations: [
    OrderListComponent,
    OrderDetailsComponent
     
  ],
  exports: [OrderListComponent]
})
export class OrderModule { }
