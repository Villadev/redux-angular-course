import {Action, Reducer} from "./ngrx-fake/ngrx";
import {contadorRreducer} from "./contador/contador.reducer";
import {incrementAction, multiplicateAction} from "./contador/contador.actions";

class Store<T> {
    private state: T;

    constructor(private reducer: Reducer<T>, state: T) {
        this.state = state;
    }

    public getState() {
        return this.state;
    }

    public dispatch(action: Action) {
        this.state = this.reducer(this.state, action);
    }
}


const store = new Store(contadorRreducer, 10);
console.log(store.getState());

store.dispatch(incrementAction);
console.log(store.getState());

store.dispatch(multiplicateAction);
console.log(store.getState());

