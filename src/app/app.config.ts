import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"recetario-f521a","appId":"1:1056492103842:web:660057320a005016734ffb","storageBucket":"recetario-f521a.appspot.com","apiKey":"AIzaSyDZYzUu5oHdoHBBqpDJoJRphfJZr3qI4m0","authDomain":"recetario-f521a.firebaseapp.com","messagingSenderId":"1056492103842","measurementId":"G-S6VCLVE1GZ"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
