import {createReducer, on} from "@ngrx/store";
import {decrementar, dividir, incrementar, multiplicar, reset} from "./contador.actions";

const initializerState = 10;

const _contadorReducer = createReducer(initializerState,
    on(incrementar, state => state + 1),
    on(decrementar, state => state - 1),
    on(multiplicar, (state, {numero}) => state * numero),
    on(dividir, (state, {numero}) => state / numero),
    on(reset, () =>  initializerState)
);

export function contadorReducer(state, action) {
    return _contadorReducer(state, action);
}

// export function contadorReducer(state: number = 10, action: Action) {
//     switch (action.type) {
//         case incrementar.type:
//             return state + 1;
//         case decrementar.type:
//             return state -1;
//         default:
//             return state;
//     }
// }
