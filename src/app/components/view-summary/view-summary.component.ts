import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ENTITY } from 'src/app/enums';
import { currentShortMonth } from 'src/app/helpers';
import { Expense } from 'src/app/models';
import { FirestoreService } from 'src/app/services';
import { ExpenseListComponent } from '../expense-list/expense-list.component';

@Component({
  selector: 'app-view-summary',
  imports: [MatButton],
  templateUrl: './view-summary.component.html',
  styleUrl: './view-summary.component.scss',
})
export class ViewSummaryComponent {
  fireService = inject(FirestoreService);
  dialog = inject(MatDialog);

  loadSummary() {
    this.fireService
      .getAll<Expense>(`${ENTITY.EXPENSE}-${currentShortMonth()}`)
      .subscribe((expenses) => {
        this.dialog.closeAll();
        this.dialog.open(ExpenseListComponent, {
          data: {
            expenses,
          },
        });
      });
  }
}
