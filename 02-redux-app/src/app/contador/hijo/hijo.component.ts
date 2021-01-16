import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: []
})
export class HijoComponent {
  @Input()
  public contador;
  @Output()
  public cambioContador: EventEmitter<number> = new EventEmitter<number>();

  public multiplicar() {
    this.contador = this.contador * 2;
    this.cambioContador.emit(this.contador);
  }

  public dividir() {
    this.contador = this.contador / 2;
    this.cambioContador.emit(this.contador);
  }

  public resetNieto(e) {
    this.contador = e;
    this.cambioContador.emit(this.contador);
  }
}
