import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { RegisterComponent } from "./components/register";
import { MarketComponent } from "./components/markets";
import { PortfolioComponent } from "./components/portfolio";
import { RetosComponent } from './components/retos/retos.component';
import { FormsModule } from '@angular/forms';
import { CandlestickComponent } from "./components/candlestick";
import { ListaRetosComponent } from './components/lista-retos/lista-retos.component';
import { CrearRetoComponent } from './components/crear-reto/crear-reto.component';


const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "mercado", component: MarketComponent},
  {path: "cartera", component: PortfolioComponent},
  {path: "challenge/:id", component: RetosComponent},
  {path: "challenge", component:ListaRetosComponent},
  {path: "", redirectTo: "/mercado", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppRoot,
    LoginComponent,
    RegisterComponent,
    MarketComponent,
    PortfolioComponent,
    RetosComponent,
    CandlestickComponent,
    ListaRetosComponent,
    CrearRetoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule
  ],
  entryComponents: [CrearRetoComponent],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
