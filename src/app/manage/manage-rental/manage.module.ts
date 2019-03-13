
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { ManageComponent } from '../manage.component';
import { ManageBookingComponent } from '../manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental.component';
import { AuthGuard } from '../../auth/shared/auth.guard';
import { RentalService } from '../../rental/shared/rental.service';
import { BookingService } from '../../booking/shared/booking.service';
import { FormatDatePipe } from '../../common/pipes/format-date.pipe';
import { ManageRentalBookingComponent } from './manage-rental-booking/manage-rental-booking.component';


const routes: Routes = [{
        path: 'manage',
        component: ManageComponent,
        children: [
            { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] },
            { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] },
        ]
    }
];

@NgModule({

  declarations: [
    ManageComponent,
    ManageBookingComponent,
    ManageRentalComponent,
    FormatDatePipe,
    ManageRentalBookingComponent
  ],

  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule.forChild(routes),
  ],

  providers: [AuthGuard, RentalService, BookingService],

})
export class ManageModule { }
