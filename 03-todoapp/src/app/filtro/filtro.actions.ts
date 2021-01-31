import {createAction, props} from "@ngrx/store";

export type filtrosVarios = 'todos' | 'completados' | 'pendientes';

export const setFiltro = createAction(
    '[Filtro] Set Filtro',
    props<{filtro: filtrosVarios}>()
    );
