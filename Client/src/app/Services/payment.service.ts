import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Payment {
  code?: number;
  creaditCard: string;
  validity: string;
  cvc: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  urlPayment = "http://localhost:53191/api/payment";

  constructor(private http: HttpClient) { }
  
 // payment.service.ts

addPayment(newPayment: Payment): Observable<number> { // שינוי ל-number
  // אנחנו מסירים את ה-responseType: 'text' כי השרת מחזיר כעת מספר JSON
  return this.http.post<number>(`${this.urlPayment}/insertpayment`, newPayment);
}
}
