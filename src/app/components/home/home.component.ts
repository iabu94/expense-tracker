import { Component } from '@angular/core';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ExpenseSummaryComponent } from '../expense-summary/expense-summary.component';
import { ViewSummaryComponent } from '../view-summary/view-summary.component';

@Component({
  selector: 'app-home',
  imports: [AddExpenseComponent, ExpenseSummaryComponent, ViewSummaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
