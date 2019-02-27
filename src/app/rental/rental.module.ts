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

const routes: Routes = [
    { path: 'rentals', 
     component: RentalComponent,
     children: [
         { path: '', component: RentalListComponent },
         { path: ':rentalId', component: RentalDetailComponent}
     ]
    }
];


@NgModule({

    declarations: [    
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgPipesModule,
        RouterModule.forChild(routes)
    ],
    providers: [RentalService]
})
export class RentalModule {

}