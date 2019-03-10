import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { MarketComponent } from "./components/markets";
import { PortfolioComponent } from "./components/portfolio";
import { CandlestickComponent } from "./components/candlestick";

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "mercado", component: MarketComponent},
  {path: "cartera", component: PortfolioComponent},
  {path: "", redirectTo: "/mercado", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppRoot,
    LoginComponent,
    MarketComponent,
    PortfolioComponent,
    CandlestickComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
