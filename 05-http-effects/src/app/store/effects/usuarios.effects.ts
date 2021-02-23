import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess} from "../actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {UsuarioService} from "../../services/usuario.service";
import {of} from "rxjs";

@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions,
                private usuarioService: UsuarioService) {}

    cragarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuarios),
            mergeMap(
                () => this.usuarioService.getUsers()
                    .pipe(
                        map(users => {

                            return cargarUsuariosSuccess({usuarios: users})
                        }),
                        catchError(err => of(cargarUsuariosError({payload: err})))
                    )
            )
        )
    );
}
