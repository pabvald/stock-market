import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/models/price';
import {GROUPS} from './groups'
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data';
import { StateService } from 'src/app/services/state';
import { ActivatedRoute } from '@angular/router';
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
  name: string;
  currentMoney: number;
  investedMoney: number;
  initialMoney: number;
  biography: string;
  nickname: string;
  
  //groups = GROUPS;
  constructor(private data: DataService, private stateService : StateService, private route: ActivatedRoute){
    this.nickname = this.route.snapshot.paramMap.get("nickname");
    //console.log(stateService.nickname);
    //this.data.getPortfolioHistory("aarroyoc").subscribe((d) => this.priceEvolution = d);
	  //this.data.getUserGroups("aarroyoc").subscribe((d) => this.fillGroups(d));
	  //this.data.getUserInfo("aarroyoc").subscribe((d) => this.fillInfo(d));
    this.data.getUserGroups(this.nickname).subscribe((d) => this.fillGroups(d));
    this.data.getUserInfo(this.nickname).subscribe((d) => this.fillInfo(d));
  }

  fillGroups(g : Group[]){
    g.forEach(function(group:Group){
        group.fechainicio = new Date(group.fechainicio);
        group.fechafin = new Date(group.fechafin);
        group.variacion = group.balanceinicial/group.balancefinal*100;
        if(group.balanceinicial > group.balancefinal){
          group.signovariacion = "-";
        }else{
          group.signovariacion = "+";
        }
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
    //console.log(u.urlfoto);
    this.imageURL = u.urlfoto;
    if(this.imageURL == undefined){
      this.imageURL = "placeholder.png";
    }  
  }
}
