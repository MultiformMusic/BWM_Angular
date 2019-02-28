
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
import { constants } from '../config/constants';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports:[
  AgmCoreModule.forRoot({
        apiKey: constants.API_MAP_KEY
      }),
      CommonModule
  ],
  exports: [
    MapComponent
  ],
  providers: [MapService, CamelizePipe]

})
export class MapModule { }
