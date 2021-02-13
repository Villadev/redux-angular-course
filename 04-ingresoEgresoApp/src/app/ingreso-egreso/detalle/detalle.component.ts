import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IngresoEgreso} from "../../models/ingreso-egreso.model";
import {IngresoEgresoService} from "../../services/ingreso-egreso.service";
import Swal from "sweetalert2";
import {AppStateWithIngresoEgreso} from "../ingreso-egreso.reducer";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {
  ingresosEgresos: IngresoEgreso[] = [];

  constructor(private store: Store<AppStateWithIngresoEgreso>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
        .subscribe(({items}) => this.ingresosEgresos = items);
  }

  borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(() => {
      Swal.fire('Borrado', 'Item borrado', 'success');
    }).catch((err) => {
      Swal.fire('Error', err.message, 'error');
    });
  }

}
