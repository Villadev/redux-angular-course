import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filtrosVarios, setFiltro} from "../../filtro/filtro.actions";
import {borrarCompletados} from "../todo.actions";

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  public filtroActual: filtrosVarios = 'todos';
  public todosCompletados: number;
  filtros: filtrosVarios[] = ["todos", "completados", "pendientes"];
  pendientes: number = 0;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
      this.todosCompletados = state.todos.filter(todo => todo.completado).length;
    });
  }

  public cambiarFiltro(filtro: filtrosVarios) {
    this.store.dispatch(setFiltro({filtro: filtro}))
  }

  public borrarTodos() {
    if(this.todosCompletados) {
      this.store.dispatch(borrarCompletados());
    }
  }

}
