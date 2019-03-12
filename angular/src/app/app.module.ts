import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "recover", component: RecoverComponent},
  {path: "mercado", component: MarketComponent},
  {path: "cartera", component: PortfolioComponent},
  {path: "challenge/:id", component: RetosComponent},
  {path: "challenge", component:ListaRetosComponent},
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
    NgbModule
  ],
  entryComponents: [CrearRetoComponent],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
