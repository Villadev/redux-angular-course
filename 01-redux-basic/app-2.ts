import {
    decrementAction,
    divideAction,
    incrementAction,
    multiplicateAction,
    resetAction
} from "./contador/contador.actions";
import {contadorRreducer} from "./contador/contador.reducer";

console.log(contadorRreducer(10, incrementAction));
console.log(contadorRreducer(10, decrementAction));
console.log(contadorRreducer(10, multiplicateAction));
console.log(contadorRreducer(10, divideAction));
console.log(contadorRreducer(10, resetAction));

