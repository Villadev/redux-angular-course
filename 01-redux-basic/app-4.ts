import {createStore, Store} from "redux";
import {contadorRreducer} from "./contador/contador.reducer";
import {incrementAction} from "./contador/contador.actions";

const store: Store = createStore(contadorRreducer);

store.subscribe(() => {
   console.log('Subs: ' + store.getState());
});

store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(incrementAction);
