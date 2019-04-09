import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoot } from './components/app';
import { LoginComponent } from "./components/login";
import { RecoverComponent } from "./components/recover";
import { RegisterComponent } from "./components/register";
import { MarketComponent } from "./components/markets";
import { PortfolioComponent } from "./components/portfolio";
import { RetosComponent } from './components/retos/retos.component';
import { CandlestickComponent } from "./components/candlestick";
import { ListaRetosComponent } from './components/lista-retos/lista-retos.component';
import { CrearRetoComponent } from './components/crear-reto/crear-reto.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { TrainingComponent } from './components/training/training.component';

import { DataService } from "./services/data";
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "recover", component: RecoverComponent},
  {path: "market", component: MarketComponent},
  {path: "portfolio", component: PortfolioComponent},
  {path: "challenge/:id", component: RetosComponent},
  {path: "challenge", component:ListaRetosComponent},
  {path: "contact", component: ContactComponent},
  {path: "user/:nickname", component: ProfileComponent},
  {path: "training", component: TrainingComponent},
  {path: "", redirectTo: "/market", pathMatch: "full"}
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
    ListaRetosComponent,
    CrearRetoComponent,
    ContactComponent,
    ProfileComponent,
    TrainingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [CrearRetoComponent],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
