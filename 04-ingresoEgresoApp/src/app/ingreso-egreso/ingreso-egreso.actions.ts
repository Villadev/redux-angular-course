import {createAction, props} from "@ngrx/store";
import {IngresoEgreso} from "../models/ingreso-egreso.model";

export const unsetItems = createAction('[IngresoEgreso] unsetItems');
export const setItems = createAction(
    '[IngresoEgreso] setItems',
    props<{items: IngresoEgreso[]}>()
);
