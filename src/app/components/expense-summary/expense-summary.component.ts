import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ENTITY } from 'src/app/enums';
import { currentShortMonth } from 'src/app/helpers';
import { Expense } from 'src/app/models';
import { FirestoreService } from 'src/app/services';

@Component({
  selector: 'app-expense-summary',
  imports: [CurrencyPipe],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.scss',
})
export class ExpenseSummaryComponent {
  today = new Date();
  total = 0;

  constructor(private fireService: FirestoreService) {
    const entity = `${ENTITY.EXPENSE}-${currentShortMonth()}`;

    this.fireService.getAll<Expense>(entity).subscribe((expenses) => {
      this.total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    });
  }
}
