import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { MarketComponent } from "./components/markets";
import { PortfolioComponent } from "./components/portfolio";
import { RetosComponent } from './components/retos/retos.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "mercado", component: MarketComponent},
  {path: "cartera", component: PortfolioComponent},
  {path: "retos", component: RetosComponent},
  {path: "", redirectTo: "/mercado", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppRoot,
    LoginComponent,
    MarketComponent,
    PortfolioComponent,
    RetosComponent,
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
