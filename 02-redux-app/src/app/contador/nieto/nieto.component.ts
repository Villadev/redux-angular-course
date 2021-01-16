import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: []
})
export class NietoComponent {
  @Input()
  public contador;
  @Output()
  public contadorCambio: EventEmitter<number> = new EventEmitter<number>();

  public reset() {
    this.contador = 0;
    this.contadorCambio.emit(this.contador);
  }

}
