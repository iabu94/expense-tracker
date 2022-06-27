import { Component } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ENTITY } from './enums';
import { Suggestion } from './models';
import { FirestoreService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  expenseForm = this.fb.group({
    description: ['', Validators.required],
    amount: [0, Validators.required],
    type: ['D', Validators.required],
  });

  suggestions$: Observable<Suggestion[]>;

  constructor(private firestore: Firestore,
    private fireService: FirestoreService,
    private fb: FormBuilder) {

    // Get All Sugeestions
    this.suggestions$ = this.fireService.getAll<Suggestion>(ENTITY.SUGGESTION)
  }

  addExpense() {}

  changeDescription = (suggestion: any) => this.f.description.patchValue(suggestion);

  get f() {
    return this.expenseForm.controls;
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
