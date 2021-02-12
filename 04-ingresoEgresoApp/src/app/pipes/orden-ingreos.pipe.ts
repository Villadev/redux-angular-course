import {Pipe, PipeTransform} from '@angular/core';
import {IngresoEgreso} from "../models/ingreso-egreso.model";

@Pipe({
    name: 'ordenIngreos'
})
export class OrdenIngreosPipe implements PipeTransform {

    transform(items: IngresoEgreso[]): IngresoEgreso[] {
        const newItems = items.slice();
        newItems.sort((a, b) => {
            if (a.tipo === 'ingreso') {
                return -1;
            } else {
                return 1
            }
        });

       return newItems;
    }

}
