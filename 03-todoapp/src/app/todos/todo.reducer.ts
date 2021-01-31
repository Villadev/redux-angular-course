import {createReducer, on} from "@ngrx/store";
import {borrar, borrarCompletados, crear, editar, toggle, toggleAll} from "./todo.actions";
import {Todo} from "./models/todo.model";


export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Robar escudo capitan amierca'),
    new Todo('Que vamos a hacer')
];

const _todoReducer = createReducer(estadoInicial,
    on(crear, (state, {texto}) => [...state, new Todo(texto)]),
    on(borrar, (state, {id}) => {
        return state.filter((todo) => todo.id !== id)
    }),
    on(borrarCompletados, (state) => {
        return state.filter( todo => !todo.completado);
    }),
    on(toggleAll, (state, {completado}) =>{
        return state.map((t) => {
            return {
                ...t,
                completado: completado
            }
        });
    }),
    on(toggle, (state, {id}) => {
        return state.map((todo) => {
            if(todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }
        });
    }),
    on(editar, (state, {id, texto}) => {
        return state.map((todo) => {
            if(todo.id === id) {
                return {
                    ...todo,
                    texto: texto
                }
            } else {
                return todo;
            }
        });
    })
);

export function todoReducer(state, action) {
    return _todoReducer(state, action)
}
