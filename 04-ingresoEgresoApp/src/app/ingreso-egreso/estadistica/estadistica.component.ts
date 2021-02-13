import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IngresoEgreso} from "../../models/ingreso-egreso.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Label, MultiDataSet} from "ng2-charts";
import {AppStateWithIngresoEgreso} from "../ingreso-egreso.reducer";

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos = 0;
  egresos = 0;
  totalIngreos = 0;
  totalEgresos = 0;

  private destroySubs: Subject<boolean> = new Subject<boolean>();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithIngresoEgreso>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
        .pipe(takeUntil(this.destroySubs))
        .subscribe(({items}) => {
      this.generarEstadistica(items);
    });
  }

  ngOnDestroy() {
    this.destroySubs.next();
    this.destroySubs.complete();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalIngreos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    items.forEach((item) => {
      if(item.tipo === 'ingreso') {
        this.totalIngreos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });

    this.doughnutChartData = [[this.totalIngreos, this.totalEgresos]];
  }
}
