import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rent, RentService } from '../Services/rent.service';
import { customer } from '../Services/customer.service.service';

@Component({
  selector: 'app-rental-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-history.component.html',
  styleUrl: './rental-history.component.css'
})
export class RentalHistoryComponent implements OnInit, OnChanges {
  @Input() user: customer | null = null;
  rents: Rent[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  // פונקציה שמוודא שאם ה-user השתנה באבא, ההיסטוריה תיטען מחדש
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.loadHistory();
    }
  }

  // בתוך rental-history.component.ts
loadHistory() {
  const customerId = this.user?.id || this.user?.Id; // שימוש בשתי האופציות
  if (customerId) {
    this.rentService.getRentHistoryByCustomerId(customerId).subscribe({
      next: (res) => this.rents = res,
      error: (err) => console.error(err)
    });
  }
}
}