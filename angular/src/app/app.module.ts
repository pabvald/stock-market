import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { RegisterComponent } from "./components/register";
import { MarketComponent } from "./components/markets";
import { PortfolioComponent } from "./components/portfolio";
import { RetosComponent } from './components/retos/retos.component';
import { FormsModule } from '@angular/forms';
import { CandlestickComponent } from "./components/candlestick";
import { ListaRetosComponent } from './components/lista-retos/lista-retos.component';

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "mercado", component: MarketComponent},
  {path: "cartera", component: PortfolioComponent},
  {path: "retos/:id", component: RetosComponent},
  {path: "retos", component:ListaRetosComponent},
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
