import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Usuario} from "../../models/usuario.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
    user: Usuario;
    destroySubs: Subject<boolean> = new Subject<boolean>();

    constructor(private authService: AuthService,
                private store: Store<AppState>,
                private router: Router) {
    }

    ngOnInit(): void {
        this.store.select('auth')
            .pipe(takeUntil(this.destroySubs))
            .subscribe(({user}) => {
                this.user = user;
            });
    }

    ngOnDestroy() {
        this.destroySubs.next();
        this.destroySubs.complete();
    }

    logout() {
        this.authService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
