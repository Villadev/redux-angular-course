import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";
import {Usuario} from "../models/usuario.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {setUser, unsetUser} from "../auth/auth.actions";
import {Subscription} from "rxjs";
import {unsetItems} from "../ingreso-egreso/ingreso-egreso.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  private _user: Usuario;

  constructor(private auth: AngularFireAuth,
              private store: Store<AppState>,
              public firestore: AngularFirestore) { }

  get user() {
    return this._user;
  }

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      if(fUser) {
        this.userSubscription = this.firestore.doc(`${fUser.uid}/usuario`).valueChanges()
            .subscribe(firestoreUser => {
              const user = Usuario.fromFirestore(firestoreUser);
              this._user = user;
              this.store.dispatch(setUser({user}));
            });
      } else {
        this._user = null;
        if(this.userSubscription){
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(unsetUser());
        this.store.dispatch(unsetItems());
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
