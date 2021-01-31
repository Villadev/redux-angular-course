import {createAction, props} from "@ngrx/store";

export const crear = createAction(
    '[Todo] Crear todo',
    props<{ texto: string }>()
);

export const toggle = createAction(
    '[Todo] Toggle todo',
    props<{ id: number }>()
);

export const editar = createAction(
    '[Todo] Editar todo',
    props<{ id: number, texto: string }>()
);

export const borrar = createAction(
    '[Todo] Borrar todo',
    props<{ id: number }>()
);

export const borrarCompletados = createAction(
    '[Todo] Borrar completados'
);

export const toggleAll = createAction(
  '[Todo] ToggleAll todo',
    props< {completado: boolean}>()
);
