import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/models/price';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
declare let fc: any;


interface UsuarioReto{ 
  nombre:string,
  variacion:number,
  beneficio:number
}

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.css']
})
export class RetosComponent implements OnInit {

  participantes : UsuarioReto[];
  searched_username : string;
  data: Price[] = fc.randomFinancial()(50);

  constructor() { }

  ngOnInit() {
    this.searched_username = "";
    this.participantes= [
      {nombre:"MoneyThrower89", variacion:100, beneficio:79},
      {nombre:"MaxPower", variacion:79, beneficio:5},
      {nombre:"PipoLives", variacion:77, beneficio:8},
      {nombre:"gnqq hnumjw", variacion:75, beneficio:569},
      {nombre:"ScriptKiddie99", variacion:73, beneficio:60},
      {nombre:"JustADuck", variacion:69, beneficio:700},
      {nombre:"LordOfCalamity", variacion:55, beneficio:399},
      {nombre:"StanleyInAParable", variacion:53, beneficio:610},
      {nombre:"NuestroLenny", variacion:51, beneficio:333},
      {nombre:"HatKid", variacion:49, beneficio:119},
      {nombre:"alert(0);", variacion:30, beneficio:123},
      {nombre:"'", variacion:25, beneficio:70},
      {nombre:"TheWitness", variacion:23, beneficio:666},
      {nombre:"O(n^3)", variacion:13, beneficio:25},
      {nombre:"∀x, x is overrated", variacion:6, beneficio:10},
      {nombre:"OtraReferenciaAPipo", variacion:-3, beneficio:-100},
      {nombre:"BookerDeWeed", variacion:-5, beneficio:-69},
      {nombre:"#pragma omp parallel for", variacion:-9, beneficio:-45},
      {nombre:"BubbleSortFan", variacion:-13, beneficio:-198},
      {nombre:"JohnSmith", variacion:-15, beneficio:-731},
      {nombre:"Kojiman", variacion:-23, beneficio:-500},
      {nombre:"HoyNoHayKahoot.it", variacion:-60, beneficio:-400},
      {nombre:"GenericUsername", variacion:-65, beneficio:-300},
      {nombre:"InsertaReferenciaDeHaskell", variacion:-70, beneficio:-9999},
      {nombre:"AdrianistanCultFollower", variacion:-85, beneficio:-987},
      
    ];
  }

  getUserPosition(user:UsuarioReto){
    return this.participantes.indexOf(user)+1;
  }

  getSelectedUsers(){
      if(this.searched_username.trim())
        return this.participantes.filter(user => user.nombre.includes(this.searched_username.trim()));
      else
        return this.participantes;
  }

}
