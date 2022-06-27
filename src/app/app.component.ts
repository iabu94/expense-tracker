import { Component } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
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
  collection$: Observable<any>;
  suggestions$: Observable<Suggestion[]>;

  constructor(private firestore: Firestore, private fireService: FirestoreService) {
    this.collection$ = collectionData(
      collection(this.firestore, ENTITY.EXPENSE)
    );

    // Get All Sugeestions
    this.suggestions$ = this.fireService.getAll<Suggestion>(ENTITY.SUGGESTION)
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
