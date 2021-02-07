import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";
import {Usuario} from "../models/usuario.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {setUser, unsetUser} from "../auth/auth.actions";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;

  constructor(private auth: AngularFireAuth,
              private store: Store<AppState>,
              public firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      if(fUser) {
        this.userSubscription = this.firestore.doc(`${fUser.uid}/usuario`).valueChanges()
            .subscribe(firestoreUser => {
              const user = Usuario.fromFirestore(firestoreUser);
              this.store.dispatch(setUser({user}));
            });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(unsetUser());
      }

    });
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password)
        .then(({user}) => {
          const newUser = new Usuario(user.uid, nombre, user.email);
          return this.firestore.doc(`${user.uid}/usuario`)
              .set({...newUser});
        });
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(fuser => {
      return !!fuser;
    }));
  }
}
