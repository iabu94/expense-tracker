import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, doc, docData, addDoc } from '@angular/fire/firestore';
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

  getById<T>(entity: ENTITY, id: string) {
    const customerRef = doc(this.firestore, entity, id);
    return docData(customerRef, { idField: id }) as Observable<T>;
  }

  add<T>(entity: ENTITY, model: T) {
    const collectionRef = collection(this.firestore, entity);
    return addDoc(collectionRef, model);
  }
}
