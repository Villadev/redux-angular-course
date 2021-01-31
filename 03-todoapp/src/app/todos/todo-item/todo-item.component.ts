import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from "../models/todo.model";
import {FormControl, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {borrar, editar, toggle} from "../todo.actions";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input()
  public todo: Todo;
  public chkCompletqado: FormControl;
  public editando = false;
  txtInput: FormControl;

  @ViewChild('inputFisico')
  public txtInputFisico: ElementRef;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompletqado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletqado.valueChanges.subscribe((valor) => {
      this.store.dispatch(toggle({id: this.todo.id}));
    });
  }

  public borrarTodo() {
    this.store.dispatch(borrar({id: this.todo.id}));
  }

  public editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => this.txtInputFisico.nativeElement.select(), 1);
  }

  public terminarEdicion() {
    this.editando = false;

    if(this.txtInput.valid && this.txtInput.value !== this.todo.texto) {
      this.store.dispatch(editar({
        id: this.todo.id,
        texto: this.txtInput.value
      }));
    }

  }



}
