import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class PaymentService {

    constructor(private http: HttpClient) {}

    public getPendingPayments(): Observable<any> {

        return this.http.get('/api/v1/payments');
    }

    public acceptPayment(payment): Observable<any> {
        return this.http.post('/api/v1/payments/accept', payment);
    }

    public declinePayment(payment): Observable<any> {
        return this.http.post('/api/v1/payments/decline', payment);
    }
}