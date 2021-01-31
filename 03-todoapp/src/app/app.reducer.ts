import {Todo} from "./todos/models/todo.model";
import {ActionReducerMap} from "@ngrx/store";
import {todoReducer} from "./todos/todo.reducer";
import {filtroReducer} from "./filtro/filtro.reducer";
import {filtrosVarios} from "./filtro/filtro.actions";

export interface AppState {
    todos: Todo[],
    filtro: filtrosVarios
}


export const appReducers: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer
}
