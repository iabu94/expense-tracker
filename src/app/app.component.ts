import { Component } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-tracker';
  collection$: Observable<any>;

  constructor(private firestore: Firestore) {
    this.collection$ = collectionData(
      collection(this.firestore, 'expense')
    );
  }
}
