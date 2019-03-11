import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CamelizePipe } from "ngx-pipes";

@Injectable()
export class MapService {

    private geoCoder;

    private locationCache: any = { };

    constructor(private camelizePipe: CamelizePipe) {}

    private camelized(value: string): string {
        return this.camelizePipe.transform(value);
    }

    private cacheLocation(location: string, coordinates: any) {

        this.locationCache[this.camelized(location)] = coordinates;
    }

    private isLocationCached(location: string): Boolean {
        return this.locationCache[this.camelized(location)];
    }

    private geocodeLocation(location: string): Observable<any> {

        if (!this.geoCoder) {

            this.geoCoder = new (<any>window).google.maps.Geocoder();
        }

        return new Observable(
            (observer) => {
                this.geoCoder.geocode({ address: location}, (result, status) => {
                
                    if(status === 'OK') {
                        
                        const geometry = result[0].geometry.location;
                        const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
                        this.cacheLocation(location, coordinates);
    
                        observer.next(coordinates);
                    } else {
                        observer.error('Location could not be Geocoded');
                    }
                });
            }
        );
    }

    public getGeoLocation(location: string): Observable<any> {

        if (this.isLocationCached(location)) {

            return Observable.of(this.locationCache[this.camelized(location)]);
        
        } else {

            return this.geocodeLocation(location);
        }
    }

}