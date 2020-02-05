import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth_gaurd';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
export const OrderRoutes: Routes = [
  {
    path: 'orders',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrderListComponent
      },
      {
        path: 'order/:id',
        component: OrderDetailsComponent
      } 
    ]
  }
];
