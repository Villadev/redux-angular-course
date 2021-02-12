import {IngresoEgreso} from "../models/ingreso-egreso.model";
import {createReducer, on} from "@ngrx/store";
import {setItems, unsetItems} from "./ingreso-egreso.actions";

export interface State {
    items: IngresoEgreso[]
}

export const initialState: State = {
    items: []
}

const _ingresoEgresoReducer = createReducer(initialState,
    on(setItems, (state, {items}) => ({...state, items: [...items]})),
    on(unsetItems, state => ({...state, items: []}))
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
