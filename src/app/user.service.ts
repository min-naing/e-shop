import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<AppUser>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<AppUser>('users');
  }

  save(user: firebase.User) {
    return this.usersCollection.doc(user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true });
  }

  get(uid: string): AngularFirestoreDocument<AppUser> {
    return this.usersCollection.doc<AppUser>(uid);
  }
}
