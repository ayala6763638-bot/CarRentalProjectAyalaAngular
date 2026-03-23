import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // חשוב ל-ngIf
import { LoginComponent } from '../app/customers/login-component/login-component.component';
import { DisplayCarsComponent } from './display-cars/display-cars.component';
import { customer } from './Services/customer.service.service';
import { RentalHistoryComponent } from "./rental-history/rental-history.component";
import { Register } from "../app/customers/register/register";
import { AboutComponent } from "../app/about/about.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule, LoginComponent, DisplayCarsComponent, RentalHistoryComponent,Register , AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentTab: string = 'history';
  title = 'cars_service';
  
  // משתנה שמחזיק את המשתמש המחובר (בהתחלה הוא ריק)
  currentUser: customer | null = null;
  // פונקציה שתקרא כשהמשתמש מתחבר בהצלחה
  onUserLogin(user: customer) {
    console.log("משתמש התחבר:", user);
    this.currentUser = user;
    this.currentTab = 'history';
  }

  switchTab(tabName: string) {
    this.currentTab = tabName;
  }
}