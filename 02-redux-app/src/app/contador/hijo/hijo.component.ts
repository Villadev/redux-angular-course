import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducers";
import * as actions from "../contador.actions";

@Component({
  selector: "app-hijo",
  templateUrl: './hijo.component.html',
  styles: []
})
export class HijoComponent implements OnInit{
  public contador;

  constructor(private store: Store<AppState>) {
  }

  public ngOnInit() {
    this.store.select('contador')
        .subscribe((contador) => this.contador = contador)
  }

  public multiplicar() {
    this.store.dispatch(actions.multiplicar({numero: 2}));
  }

  public dividir() {
    this.store.dispatch(actions.dividir({numero: 2}));
  }

}
