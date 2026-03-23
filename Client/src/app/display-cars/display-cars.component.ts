import { Component, Input } from '@angular/core';
import { CarsComponent } from '../cars/cars.component';
import { Car, CarService } from '../Services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { customer } from '../Services/customer.service.service';
import { Rent, RentService } from '../Services/rent.service'; 
import { PaymentService } from '../Services/payment.service'; 

@Component({
  selector: 'app-display-cars',
  standalone: true,
  imports: [CarsComponent, CommonModule, FormsModule],
  templateUrl: './display-cars.component.html',
  styleUrl: './display-cars.component.css'
})
export class DisplayCarsComponent {
  @Input() user: customer | null = null; 

  arr: Car[] = [];
  filteredArr: Car[] = [];
  filterSeats: number | null = null;
  filterLevel: number | null = null;
  maxPrice: number | null = null;
  selectedCar: Car | null = null;

  // שינוי כאן: הגדרה כ-any והוספת codePayment
  rentModel: any = {
    codeCar: 0,
    codeCustomer: 0,
    startDate: new Date(),
    endDate: new Date(),
    goal: '',
    codePayment: 0 // עכשיו הוא קיים ולא תהיה שגיאה
  };

  paymentModel = {
    creaditCard: '',
    validity: '',
    cvc: null
  };
  constructor(
    private service: CarService,
    private rentService: RentService,
    private paymentService: PaymentService
  ) {
    this.service.getCarsList().subscribe(data => {
      this.arr = data;
      this.filteredArr = data;
    });
  }

  applyFilters() {
    this.filteredArr = this.arr.filter(car => {
      let isMatch = true;
      if (this.filterSeats && car.numSeats !== this.filterSeats) isMatch = false;
      if (this.filterLevel && car.level !== this.filterLevel) isMatch = false;
      if (this.maxPrice && car.priceForDay > this.maxPrice) isMatch = false;
      return isMatch;
    });
  }

  clearFilters() {
    this.filterSeats = null;
    this.filterLevel = null;
    this.maxPrice = null;
    this.filteredArr = this.arr;
  }

  onCarPicked(car: Car) {
    this.selectedCar = car;
    this.rentModel.codeCar = car.code;
    
    // בדיקה גמישה לשם השדה (Id או id)
    const userId = (this.user as any)?.id || (this.user as any)?.Id;
    if (userId) {
      this.rentModel.codeCustomer = userId;
    }
  }

  onSubmitRent() {
    if (!this.selectedCar || !this.user) {
      alert("נא לבחור רכב ולהתחבר למערכת");
      return;
    }

    // חילוץ ה-ID בצורה בטוחה כדי למנוע את השגיאה האדומה בתמונה
    const userId = (this.user as any).id || (this.user as any).Id;

    this.paymentService.addPayment(this.paymentModel).subscribe({
      next: (paymentId: number) => {
        if (paymentId > 0) {
          
          const finalData = {
            ...this.rentModel,
            codePayment: paymentId,
            codeCar: this.selectedCar!.code,
            codeCustomer: userId // שימוש במשתנה שחילצנו
          };

          this.rentService.addRent(finalData as any).subscribe({
            next: (res) => {
              alert("ההשכרה נוספה בהצלחה!");
              this.selectedCar = null;
            },
            error: (err) => alert("התשלום עבר אך ההשכרה נכשלה")
          });

        } else {
          alert("התשלום נדחה");
        }
      },
      error: (err) => alert("שגיאה בתקשורת")
    });
  }
}