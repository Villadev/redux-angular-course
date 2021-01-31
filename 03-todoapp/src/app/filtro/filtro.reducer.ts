import {createReducer, on} from "@ngrx/store";
import {filtrosVarios, setFiltro} from "./filtro.actions";

const estadoInicial: filtrosVarios = 'todos';

const _filtroReducer = createReducer(estadoInicial,
    on(setFiltro, (state, {filtro}) => filtro)
);

export function filtroReducer(state, action) {
    return _filtroReducer(state, action)
}
