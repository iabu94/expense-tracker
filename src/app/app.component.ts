import { Component } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, map, Observable } from 'rxjs';
import { ExpenseListComponent } from './components';
import { COMMON, ENTITY } from './enums';
import { Expense, Suggestion, Summary } from './models';
import { FirestoreService } from './services';

interface ViewModel {
  expenses: Expense[];
  summary: Summary;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  today = new Date();
  commonEnum = COMMON;

  expenseForm = this.fb.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(1)]],
    type: ['D', Validators.required],
    date: [this.today, Validators.required]
  });

  vm$: Observable<ViewModel>;
  suggestions$: Observable<Suggestion[]>;
  expenseTotal = 0;

  constructor(private firestore: Firestore,
    private fireService: FirestoreService,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    public dialog: MatDialog) {

    // Get All Sugeestions
    this.suggestions$ = this.fireService.getAll<Suggestion>(ENTITY.SUGGESTION);

    // Get month Summary
    const summary$ = fireService.getById<Summary>(ENTITY.SUMMARY, this.getSummaryId());

    // Get All Expenses
    const expenses$ = fireService.getAll<Expense>(ENTITY.EXPENSE);

    // Set the View Model
    this.vm$ = combineLatest([expenses$, summary$]).pipe(
      map(([expenses, summary]) => ({
        expenses,
        summary
      }))
    );
  }

  addExpense() {
    if (this.f.description.value === 'Add-on') {
      const exp: Expense  = {
        amount: Number(this.f.amount.value) * -1,
        date: new Date(),
        description: '- Savings',
        type: 'S'
      };
      this.addExp(exp);
    }
    this.addExp(this.expenseForm.value);
  }

  addExp(expense: Expense | any) {
    this.fireService.add(ENTITY.EXPENSE, expense).then(
      () => {
        this.expenseForm.reset();
        this.f.type.patchValue('D');
        this.f.date.patchValue(this.today);
        this.snackBar.open('Saved successfully.', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['snack-bar']
        })
      },
      () => console.log('failed')
    );
  }

  changeDescription = (suggestion: any) => this.f.description.patchValue(suggestion);

  get f() {
    return this.expenseForm.controls;
  }

  dateNext() {
    this.today.setDate(this.today.getDate() + 1);
    this.f.date.patchValue(this.today);
  }
  datePrev() {
    this.today.setDate(this.today.getDate() - 1);
    this.f.date.patchValue(this.today);
  }
  getSummaryId(): string {
    const today = new Date();
    let id = '';
    if (today.getDate() >= 25) {
      id = `${today.getFullYear()}${today.getMonth() + 1}-${today.getFullYear()}${today.getMonth() + 2}`;
    } else {
      id = `${today.getFullYear()}${today.getMonth()}-${today.getFullYear()}${today.getMonth() + 1}`;
    }
    return id;
  }
  getTotalExpense(expenses: Expense[]) {
    return expenses.filter(e => e.type === 'D').reduce((sum, current) => sum + current.amount, 0);
  }
  getBalance(salary: number, expenses: Expense[]) {
    return salary - expenses.filter(e => e.type === 'D' || e.type === 'S')
      .reduce((sum, current) => sum + current.amount, 0);
  }
  getSavings(expenses: Expense[]) {
    return expenses.filter(e => e.type === 'S').reduce((sum, current) => sum + current.amount, 0);
  }
  getSumOf(expenses: Expense[], field: COMMON) {
    return expenses
      .filter(e => e.description === field.toString())
      .reduce((sum, current) => sum + current.amount, 0);
  }
  finalDue(toBePaid: number, expenses: Expense[], field: COMMON) {
    return toBePaid - this.getSumOf(expenses, field);
  }
  getAmexDue(amexDue: number, expenses: Expense[]) {
    return amexDue - expenses
      .filter(e => e.description === COMMON.AMEX.toString())
      .reduce((sum, current) => sum + current.amount, 0);
  }
  getHSBCDue(hsbcDue: number, expenses: Expense[]) {
    return hsbcDue - expenses
      .filter(e => e.description === COMMON.HSBC.toString())
      .reduce((sum, current) => sum + current.amount, 0);
  }
  viewAllExpenses(expenses: Expense[]) {
    this.dialog.open(ExpenseListComponent, {
      data: {
        expenses
      },
    });
  }

  // Get All
  getAll() {
    collectionData(
      collection(this.firestore, ENTITY.EXPENSE)
    );
  }

  // Get By Id
  get(id: string) {
    const customerRef = doc(this.firestore, 'customers', id);
    docData(customerRef, { idField: id }).subscribe((data) =>
      console.log(data)
    );
  }

  // Create
  add() {
    const collectionRef = collection(this.firestore, ENTITY.EXPENSE);
    addDoc(collectionRef, {}).then(() =>
      console.log('added')
    );
  }

  // Update
  update(id: string) {
    const customerRef = doc(this.firestore, ENTITY.EXPENSE, id);
    updateDoc(customerRef, {}).then(() =>
      console.log('updated')
    );
  }

}
