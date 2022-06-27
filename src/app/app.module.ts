import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyCee210mW-D0qam6z7QLttAnhnDXxCcySk",
  authDomain: "expense-tracker-8b68e.firebaseapp.com",
  projectId: "expense-tracker-8b68e",
  storageBucket: "expense-tracker-8b68e.appspot.com",
  messagingSenderId: "610169019875",
  appId: "1:610169019875:web:e1941a96594e61b87854d6",
  measurementId: "G-CP4TT4R0LJ"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
