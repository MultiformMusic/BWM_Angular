import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from './../../environments/environment';

@Component({
  selector: 'bwm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  stripe: any;
  elements: any;

  @ViewChild('cardNumber') cardNumbRef: ElementRef;
  @ViewChild('cardExp') cardExpRef: ElementRef;
  @ViewChild('cardCvc') cardCvcRef: ElementRef;

  @Output() paymentConfirmed = new EventEmitter();

  cardNumber: any;
  cardExp: any;
  cardCvc: any;

  error: string = '';
  isValidatingCard: boolean = false;
  token: any = null;

  constructor() { 

    this.stripe = Stripe(environment.STRIPE_OK);
    this.elements = this.stripe.elements();
  }

  ngOnInit() {

    this.cardNumber = this.elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumbRef.nativeElement);

    this.cardExp = this.elements.create('cardExpiry');
    this.cardExp.mount(this.cardExpRef.nativeElement);

    this.cardCvc = this.elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcRef.nativeElement);

    this.cardNumber.addEventListener('change', this.onChange);
    this.cardExp.addEventListener('change', this.onChange);
    this.cardCvc.addEventListener('change', this.onChange);
  }

  ngOnDestroy() {

    this.cardNumber.removeEventListener('change', this.onChange);
    this.cardExp.removeEventListener('change', this.onChange);
    this.cardCvc.removeEventListener('change', this.onChange);

    this.cardNumber.destroy();
    this.cardExp.destroy();
    this.cardCvc.destroy();
  }

  onChange = ({error}) => {

    if (error) {
      this.error = error.message;
    } else {
      this.error = '';
    }
  }

  async onSubmit() {

    this.isValidatingCard = true;

    const { token, error } = await this.stripe.createToken(this.cardNumber);

    this.isValidatingCard = false;

    if (error) {
      console.error(error);
    } else {
      this.token = token;
      this.paymentConfirmed.next(token);
    }
  }

  isCardValid(): boolean {
    return this.cardNumber._complete && this.cardExp._complete && this.cardCvc._complete;
  }

}

const style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',

    '::placeholder': {
      color: '#CFD7E0',
    },
  },
};