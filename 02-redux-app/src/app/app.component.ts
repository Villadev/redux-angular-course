import {Store} from "@ngrx/store";
import {Component} from "@angular/core";
import {decrementar, incrementar} from "./contador/contador.actions";
import {AppState} from "./app.reducers";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public contador: number;

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe((contador) => {
      console.log(contador);
      this.contador = contador;
    });
  }

  public incrementar() {
    this.store.dispatch(incrementar());
  }

  public decrementar() {
    this.store.dispatch(decrementar());
  }

  public cambioContador(n: number) {
    this.contador = n;
  }
}
