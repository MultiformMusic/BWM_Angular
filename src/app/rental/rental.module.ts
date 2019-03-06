import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

const routes: Routes = [
    { path: 'rentals', 
     component: RentalComponent,
     children: [
         { path: '', component: RentalListComponent },
         { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard]}
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
        RentalDetailBookingComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        RouterModule.forChild(routes)
    ],
    providers: [RentalService]
})
export class RentalModule {

}