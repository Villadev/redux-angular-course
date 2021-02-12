import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {IngresoEgresoComponent} from './ingreso-egreso/ingreso-egreso.component';
import {EstadisticaComponent} from './ingreso-egreso/estadistica/estadistica.component';
import {DetalleComponent} from './ingreso-egreso/detalle/detalle.component';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./app.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {OrdenIngreosPipe} from './pipes/orden-ingreos.pipe';
import {ChartsModule} from "ng2-charts";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        IngresoEgresoComponent,
        EstadisticaComponent,
        DetalleComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        OrdenIngreosPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ChartsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
