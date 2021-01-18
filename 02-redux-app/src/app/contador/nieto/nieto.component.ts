import {AppState} from "../../app.reducers";
import {Store} from "@ngrx/store";
import {Component, OnInit} from "@angular/core";
import {reset} from "../contador.actions";

@Component({
  selector: "app-nieto",
  templateUrl: './nieto.component.html',
  styles: []
})
export class NietoComponent implements OnInit{
  public contador;

  constructor(private store: Store<AppState>) {
  }

  public ngOnInit() {
    this.store.select('contador')
        .subscribe((contador) => this.contador = contador);
  }

  public reset() {
    this.store.dispatch(reset());
  }

}
