import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Rental } from "./rental.model";

@Injectable()
export class RentalService {

    private rentals: Rental[] = [
        {
          id: "1", 
          title: 'central appartment', 
          city: 'New York',
          street: 'Times Square',
          category: 'appartment',
          image: 'http://via.placeholder.com/320x250',
          bedrooms: 3,
          description: 'Veyr nice appartment',
          dailyRate: 34,
          shared: false,
          createdAt: '24/12/2017'
        },
        {
          id: "2", 
          title: 'central appartment 2', 
          city: 'Bratislava',
          street: 'Miama',
          category: 'condo',
          image: 'http://via.placeholder.com/320x250',
          bedrooms: 2,
          description: 'Veyr nice appartment',
          dailyRate: 334,
          shared: true,
          createdAt: '24/12/2017'
        },
        {
          id: "3", 
          title: 'central appartment 3', 
          city: 'San Francisco',
          street: 'Main Street',
          category: 'condo',
          image: 'http://via.placeholder.com/320x250',
          bedrooms: 2,
          description: 'Veyr nice appartment',
          dailyRate: 12,
          shared: true,
          createdAt: '24/12/2017'
        },
        {
          id: "4", 
          title: 'central appartment 3', 
          city: 'Berlin',
          street: 'Maupt Strasse',
          category: 'house',
          image: 'http://via.placeholder.com/320x250',
          bedrooms: 9,
          description: 'Veyr nice appartment',
          dailyRate: 33,
          shared: true,
          createdAt: '24/12/2017'
        },
      ];


    public getRentalById(rentalId: string): Observable<Rental> {
     
        return new Observable<Rental>(
            (observer) => {
                setTimeout(() => {
                    const foundRental = this.rentals.find((rental) => {
                        return rental.id === rentalId;
                    });

                    return observer.next(foundRental);

                }, 500);
            }
        );
    }

    public getRentals(): Observable<Rental[]> {

        return new Observable<Rental[]>((observer) => {
            setTimeout( () => {
                observer.next(this.rentals);
            }, 1000);
        });
    }
}