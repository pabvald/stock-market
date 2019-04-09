import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/models/price';
import {GROUPS} from './groups'
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data';
import { StateService } from 'src/app/services/state';
declare let fc: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  priceEvolution: Price[] = fc.randomFinancial()(50);
  imageURL: string;
  groups: Group[];
  name: string = "Willy";
  currentMoney: number = 1000000;
  investedMoney: number = 500000;
  initialMoney: number = 3000000;
  biography: string = "Amante de los estafilococos, profeta de mi propio éxito. Estudiante por las mañanas, sabio a todas horas. La bolsa, mi amante y mi esposa. Æ";
  //groups = GROUPS;
  constructor(private data: DataService, private stateService : StateService){
    //console.log(stateService.nickname);
    //this.data.getPortfolioHistory("aarroyoc").subscribe((d) => this.priceEvolution = d);
	  this.data.getUserGroups("aarroyoc").subscribe((d) => this.fillGroups(d));
	  this.data.getUserInfo("aarroyoc").subscribe((d) => this.fillInfo(d));
    //this.data.getUserGroups(stateService.nickname).subscribe((d) => this.fillGroups(d));
    //this.data.getUserInfo(stateService.nickname).subscribe((d) => this.fillInfo(d));
  }

  fillGroups(g : Group[]){
    g.forEach(function(group:Group){
        group.fechainicio = new Date(group.fechainicio);
        group.fechafin = new Date(group.fechafin);
    });
  	this.groups = g;
    console.log(this.groups);
  }

  fillInfo(u : User){
  	this.name = u.nombre;
  	this.currentMoney = u.saldo + u.ganado - u.gastado;
  	this.investedMoney = u.gastado;
  	this.initialMoney = u.saldo;
  	this.biography = u.biografia;
    this.imageURL = u.urlfoto;
  }
}
