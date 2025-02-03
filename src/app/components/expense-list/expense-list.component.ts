import { CdkScrollable } from '@angular/cdk/scrolling';
import { CurrencyPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { ENTITY } from 'src/app/enums';
import { currentShortMonth } from 'src/app/helpers';
import { FirestoreService } from 'src/app/services';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx';
import { Expense } from '../../models';

interface DialogData {
  expenses: Expense[];
}

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  standalone: true,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    NgClass,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatButton,
    NgIf,
    CurrencyPipe,
    DatePipe,
  ],
})
export class ExpenseListComponent implements AfterViewInit {
  dataSource = new MatTableDataSource(this.data.expenses);
  displayedColumns: string[] = ['date', 'description', 'amount'];
  selectedRowId: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fireService: FirestoreService,
    private snackbar: SnackbarService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async deleteRow() {
    const entity = `${ENTITY.EXPENSE}-${currentShortMonth()}`;
    await this.fireService.delete(entity, this.selectedRowId);
    this.snackbar.show('Deleted successfully.!');
    this.selectedRowId = '';
  }

  exportToExcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: WorkSheet = utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    writeFile(wb, `${new Date().toDateString()}.xlsx`);
  }
}
