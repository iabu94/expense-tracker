import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ENTITY } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getAll<T>(entity: ENTITY) {
    return collectionData(
      collection(this.firestore, entity)
    ) as Observable<T[]>;
  }
}
