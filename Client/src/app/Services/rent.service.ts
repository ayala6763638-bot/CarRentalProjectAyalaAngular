import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Rent {
  code?: number;
  codeCar: number;
  codeCustomer: number;
  startDate: Date;
  endDate: Date;
  goal: string;
  // תוסיף את השורה הזו:
  codePayment: number; 
}

@Injectable({
  providedIn: 'root'
})
export class RentService {
  urlRent = "http://localhost:53191/api/rent";
  constructor(private http: HttpClient) { }

  getRentHistoryByCustomerId(customerId: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.urlRent}/getrentbycustomerid/${customerId}`);
  }

  addRent(newRent: any): Observable<any> {
    // שים לב: הורדתי את ה-responseType כי השרת מחזיר מחרוזת פשוטה וזה עלול לבלבל
    return this.http.post(`${this.urlRent}/insertrent`, newRent);
}
}

