import { Component } from '@angular/core';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
  selector: 'app-home',
  imports: [AddExpenseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
