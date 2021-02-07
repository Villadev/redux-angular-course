import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {isLoading, stopLoading} from "../../shared/ui.actions";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading: boolean;
    destroy: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder,
                private store: Store<AppState>,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            correo: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.store.select('ui')
            .pipe(takeUntil(this.destroy))
            .subscribe(ui => {
                this.loading = ui.isLoading;
            });
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }

    loginUsuario() {
        if (this.loginForm.valid) {

            this.store.dispatch(isLoading());

            // Swal.fire({
            //     title: 'Espere por favor!',
            //     didOpen: () => {
            //         Swal.showLoading()
            //     }
            // });


            const {correo, password} = this.loginForm.value;
            this.authService.loginUsuario(correo, password)
                .then(usuario => {
                    // Swal.close();
                    this.store.dispatch(stopLoading());
                    this.router.navigate(['/']);
                })
                .catch(error => {
                    this.store.dispatch(stopLoading());
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message
                    })
                });
        }
    }

}
