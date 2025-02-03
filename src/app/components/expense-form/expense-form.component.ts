import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-expense-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatIcon,
    MatDatepickerModule,
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent {
  expenseForm: FormGroup;
  today = new Date();

  constructor() {
    this.expenseForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      type: new FormControl('D', Validators.required),
      date: new FormControl(new Date(), Validators.required),
    });
  }

  addExpense() {
    console.log(this.expenseForm.value);
  }

  get f() {
    return this.expenseForm.controls;
  }
  dateNext() {
    this.today.setDate(this.today.getDate() + 1);
    this.f['date'].patchValue(this.today);
  }
  datePrev() {
    this.today.setDate(this.today.getDate() - 1);
    this.f['date'].patchValue(this.today);
  }
}
