import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { MarketComponent } from "./components/markets";

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "mercado", component: MarketComponent},
  {path: "", redirectTo: "/mercado", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppRoot,
    LoginComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
