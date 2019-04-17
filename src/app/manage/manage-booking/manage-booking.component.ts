import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../payment/shared/payment.service';

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];
  payments: any[];

  constructor(private bookingService: BookingService,
              private paymentService: PaymentService) { }

  ngOnInit() {

    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    );

    this.getPendingPayments();

  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (payments: any) => {
        console.log(payments);
        this.payments = payments;
      },
      (errors) => {
      }
    );
  }


  acceptPayment(payment) {
    this.paymentService.acceptPayment(payment).subscribe(
      (json) => {
        payment.status = 'paid';
      },
      (error) => {
        
      }
    );
  }

  declinePayment(payment) {
    this.paymentService.declinePayment(payment).subscribe(
      (json) => {
        debugger;
        payment.status = 'declined';
      },
      (error) => {
        
      }
    );
  }

}
