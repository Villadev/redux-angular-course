import 'firebase/firestore'
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngresoEgresoService} from "../services/ingreso-egreso.service";
import {IngresoEgreso} from "../models/ingreso-egreso.model";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as uiActions from "../shared/ui.actions";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo = 'ingreso';
  isLoading: boolean;
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.store.select('ui')
        .pipe(takeUntil(this.destroy))
        .subscribe(({isLoading}) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.destroy.complete();
    this.destroy.next();
  }

  guardar() {

    if(this.ingresoEgresoForm.valid) {
      console.log(this.ingresoEgresoForm.value);
      const {descripcion, monto} = this.ingresoEgresoForm.value;

      const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
      this.store.dispatch(uiActions.isLoading());
      this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
          .then((ref) => {
            this.store.dispatch(uiActions.stopLoading());
            this.ingresoEgresoForm.reset();
            Swal.fire('Registro creado', descripcion, 'success');
          })
          .catch(error => {
            this.store.dispatch(uiActions.stopLoading());
            Swal.fire('Error', error.message, 'error');
          });
    }
  }

}
