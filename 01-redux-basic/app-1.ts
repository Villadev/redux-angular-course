import {decrementAction, divideAction, incrementAction, multiplicateAction} from "./contador/contador.actions";
import {contadorRreducer} from "./contador/contador.reducer";


// Usar el contadorRreducer

console.log(contadorRreducer(10, incrementAction));
console.log(contadorRreducer(10, decrementAction));
console.log(contadorRreducer(10, multiplicateAction));
console.log(contadorRreducer(10, divideAction));
