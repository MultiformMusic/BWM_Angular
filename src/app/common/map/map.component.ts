import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
import { RentalService } from '../../rental/shared/rental.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat: number;
  lng: number;
  rentalId: string;
  isPositionError: boolean = false;

  @Input() location: string;

  constructor(private mapService: MapService,
              private rentalService: RentalService,
              private ref: ChangeDetectorRef,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.rentalId = params['rentalId'];
      }
    );
  }

  async mapReadyHandler() {

    let result;
    if (this.location.indexOf('undefined') != -1 ) {
      
      result = await this.rentalService.getRentalById(this.rentalId).toPromise();
      this.location = result.city + ', ' + result.street;
    }

    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      () => {
        this.isPositionError = true;
      }
    );
  }
}
