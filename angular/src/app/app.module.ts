import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { RecoverComponent } from "./components/recover";
import { RegisterComponent } from "./components/register";
import { MarketComponent } from "./components/markets";
import { PortfolioComponent } from "./components/portfolio";
import { RetosComponent } from './components/retos/retos.component';
import { CandlestickComponent } from "./components/candlestick";
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { TrainingComponent } from './components/training/training.component';

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "recover", component: RecoverComponent},
  {path: "mercado", component: MarketComponent},
  {path: "cartera", component: PortfolioComponent},
  {path: "retos", component: RetosComponent},
  {path: "contacto", component: ContactComponent},
  {path: "perfil", component: ProfileComponent},
  {path: "training", component: TrainingComponent},
  {path: "", redirectTo: "/mercado", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppRoot,
    LoginComponent,
    RecoverComponent,
    RegisterComponent,
    MarketComponent,
    PortfolioComponent,
    RetosComponent,
    CandlestickComponent,
    ContactComponent,
    ProfileComponent,
    TrainingComponent
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
