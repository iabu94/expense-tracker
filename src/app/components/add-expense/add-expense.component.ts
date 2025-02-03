import { Component, computed, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ENTITY } from 'src/app/enums';
import { FirestoreService } from 'src/app/services';

@Component({
  selector: 'app-add-expense',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent {
  expenseForm: FormGroup;
  today = new Date();

  descriptions = signal<string[]>([]);
  filterDescriptionKey = signal('');

  filteredDescriptions = computed(() =>
    this._filter(this.filterDescriptionKey())
  );

  constructor(private fb: FormBuilder, private fireService: FirestoreService) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: [, Validators.required],
      date: [this.today, Validators.required],
    });

    this.loadDescriptions();

    // Setup autocomplete filtering
    this.expenseForm
      .get('description')!
      .valueChanges.subscribe((key) => this.filterDescriptionKey.set(key));
  }

  addExpense() {
    const entity = `${ENTITY.EXPENSE}-${this.getSelectedMonthName()}`;
    this.fireService.add(entity, this.expenseForm.value);
  }

  prevDay() {
    const currentDate = this.expenseForm.get('date')?.value;
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    this.expenseForm.patchValue({ date: previousDay });
  }

  nextDay() {
    const currentDate = this.expenseForm.get('date')?.value;
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    this.expenseForm.patchValue({ date: nextDay });
  }

  private getSelectedMonthName(): string {
    return this.expenseForm.controls['date'].value
      .toLocaleString('en-US', { month: 'short' })
      .toLocaleLowerCase();
  }

  private loadDescriptions() {
    this.fireService.getAll<{ name: string }>(ENTITY.SUGGESTION).subscribe({
      next: (data) => {
        this.descriptions.set(data.map((d) => d.name).sort());
      },
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.descriptions().filter((description) =>
      description.toLowerCase().includes(filterValue)
    );
  }
}
