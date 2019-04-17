import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { HelperService } from '../common/service/helper.service';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking/shared/booking.service';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { PaymentModule } from '../payment/payment.module';

const routes: Routes = [
    { path: 'rentals', 
     component: RentalComponent,
     children: [
         { path: '', component: RentalListComponent },
         { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
         { path: ':rentalId', component: RentalDetailComponent },
         { path: ':city/homes', component: RentalSearchComponent }
     ]
    }
];


@NgModule({

    declarations: [    
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule,
        PaymentModule,
        RouterModule.forChild(routes)
    ],
    providers: [RentalService, HelperService, BookingService]
})
export class RentalModule {

}