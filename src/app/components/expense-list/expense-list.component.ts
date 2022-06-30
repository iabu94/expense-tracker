import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../../models';

interface DialogData {
  expenses: Expense[]
}

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements AfterViewInit {

  dataSource = new MatTableDataSource(this.data.expenses);
  displayedColumns: string[] = ['date', 'description', 'amount'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
