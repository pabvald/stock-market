import { Component, OnInit } from '@angular/core';


/** TODO: Crear supplier */
interface UsuarioReto{ /** TODO: Mover a su propio fichero */
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
  companies;
  participantes:UsuarioReto[];

  constructor() { }

  ngOnInit() {
    this.companies =[
      {
          name: "Google",
          code: "GOOG",
          price: 45
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },{
          name: "Microsoft",
          code: "MSFT",
          price: 23
      },];
    this.participantes= [
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
      {nombre:"Pipo", variacion:3, beneficio:2},
      {nombre:"Pip0", variacion:4, beneficio:5},
      {nombre:"Pip1", variacion:-9.0, beneficio:8},
    ];
  }

}
