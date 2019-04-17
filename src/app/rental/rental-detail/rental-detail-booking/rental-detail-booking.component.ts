import { Component, OnInit, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment';
import { Rental } from '../../shared/rental.model';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from '../../../auth/shared/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit, OnChanges {

  //@Input() price: number;
  //@Input() bookings: Booking[];
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

  daterange: any = {};
  bookedOutDates: any[] = [];
  newBooking: Booking;
  modalRef: any;
  errors: any[] = [];

  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidate.bind(this)
  };

  constructor(private helperService: HelperService,
              private bookingService: BookingService,
              private modalService: NgbModal,
              private toastService: ToastrService,
              public auth: AuthService) { }

  ngOnInit() {
    this.newBooking = new Booking();
  }

  ngOnChanges() {
    this.getBookedOutDates();
  }

  private checkForInvalidate(date) {
    const dateFormat = this.helperService.formatBookingDate(date);
    return this.bookedOutDates.includes(dateFormat) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {

    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach(
        (booking: Booking) => {
          const datesRange  =  this.helperService.getBookingRangeOfDates(booking.startAt, booking.endAt);
          this.bookedOutDates.push(...datesRange);
        }
      )
    }

  }

  private addNewBookedDates(bookingData: any) {
    const datesRange  =  this.helperService.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...datesRange);
  }

  private resetDatePicker() {

    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {

    console.log(this.newBooking);
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {

    this.newBooking.rental = this.rental;
    console.log(this.newBooking);
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingDatas: any) => {
        console.log("createBooking bookingDatas = ", bookingDatas);
        this.addNewBookedDates(bookingDatas);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastService.success('Booking has been successfully created', 'Success');
      },
      (errorResponse: any) => {
        console.log("createBooking err = ", errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  public selectedDate(value: any, datepicker?: any) {

    this.options.autoUpdateInput = true;
      this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
      this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
      this.newBooking.days = -(value.start.diff(value.end, 'days'));
      this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

  onPaymentConfirmed(paymentToken: any) {
    debugger;
    this.newBooking.paymentToken = paymentToken;
  }
}
