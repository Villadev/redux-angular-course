import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {IngresoEgresoService} from "../services/ingreso-egreso.service";
import {setItems} from "../ingreso-egreso/ingreso-egreso.actions";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscriberDestroy: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<AppState>,
                private ingresoEgresoService: IngresoEgresoService) {
    }

    ngOnInit(): void {
        this.store.select('auth')
            .pipe(
                filter((auth) => !!auth.user),
                takeUntil(this.subscriberDestroy)
            )
            .subscribe(({user}) => {
                this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
                    .pipe(takeUntil(this.subscriberDestroy))
                    .subscribe((ingresosEgresosFB) => {
                        this.store.dispatch(setItems({items: ingresosEgresosFB}));
                    });
            });
    }

    ngOnDestroy() {
        this.subscriberDestroy.next();
        this.subscriberDestroy.complete();
    }

}
