import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {isLoading, stopLoading} from "../../shared/ui.actions";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
    registroForm: FormGroup;
    isLoading: boolean;
    destroy: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder,
                private store: Store<AppState>,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.registroForm = this.fb.group({
            nombre: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        this.store.select('ui')
            .pipe(takeUntil(this.destroy))
            .subscribe(ui => {
                this.isLoading = ui.isLoading;
            });
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }

    crearUsuario() {
        if (this.registroForm.valid) {
            // Swal.fire({
            //     title: 'Espere por favor!',
            //     didOpen: () => {
            //         Swal.showLoading()
            //     }
            // });

            this.store.dispatch(isLoading());

            const {nombre, correo, password} = this.registroForm.value;
            this.authService.crearUsuario(nombre, correo, password)
                .then(credenciales => {
                    // Swal.close();
                    this.store.dispatch(stopLoading());
                    this.router.navigate(['/']);
                }).catch((error) => {
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
