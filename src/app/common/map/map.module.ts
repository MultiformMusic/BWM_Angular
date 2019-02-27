
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports:[
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyASxKk2jUYQi3s2KpznQ-Nf45P-p-QK6Kg'
      }),
      CommonModule
  ],
  exports: [
    MapComponent
  ],
  providers: [MapService, CamelizePipe]

})
export class MapModule { }
