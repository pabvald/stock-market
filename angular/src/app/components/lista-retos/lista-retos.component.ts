import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CrearRetoComponent} from '../../crear-reto/crear-reto.component';

interface Challenge{
  id:number,
  fechaInicio:Date,
  fechaFin:Date,
  nombre:string,
  numParticipantes:number;
}
@Component({
  selector: 'app-lista-retos',
  templateUrl: './lista-retos.component.html',
  styleUrls: ['./lista-retos.component.css']
})
export class ListaRetosComponent implements OnInit {

  retos:Challenge[];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    /** Se supone que los retos tienen ids distintos pero para que lleve al url correcto les he puesto a todos el mismo*/
    this.retos = [
      {id:1,fechaInicio:new Date(2019, 1, 7, 0 , 0, 0, 0),fechaFin:new Date(2020, 11, 8, 0 , 0, 0, 0), nombre:"Los solremidas",numParticipantes:7},
      {id:2,fechaInicio:new Date(2018, 8, 5, 0 , 0, 0, 0),fechaFin:new Date(2020, 6, 28, 0 , 0, 0, 0), nombre:"DeepUnlearning",numParticipantes:4},
      {id:3,fechaInicio:new Date(1989 , 12, 17, 0 , 0, 0, 0),fechaFin:new Date(2033, 5, 14, 0 , 0, 0, 0), nombre:"Solo nicknames con referencias a los simpsons", numParticipantes:19},
      {id:4,fechaInicio:new Date(2019 , 2, 21, 0 , 0, 0, 0),fechaFin:new Date(2021, 9, 14, 0 , 0, 0, 0), nombre:"Turing complete Stock Traders",numParticipantes:1000100010},
      {id:5,fechaInicio:new Date(2019 , 1, 13, 0 , 0, 0, 0),fechaFin:new Date(2019, 6, 12, 0 , 0, 0, 0), nombre:"La secta de apuestas de Alaguero",numParticipantes:16},
      {id:6,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2999, 11, 31, 0 , 0, 0, 0), nombre:"Forever Alone",numParticipantes:1},
      {id:7,fechaInicio:new Date(2033 , 0,1, 0 , 0, 0, 0),fechaFin:new Date(2035, 11, 31, 0 , 0, 0, 0), nombre:"Fans de Metro",numParticipantes:2033},
      {id:8,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 11, 31, 0 , 0, 0, 0), nombre:"Nani da Stock",numParticipantes:17},
      {id:9,fechaInicio:new Date(2019 , 7, 19, 0 , 0, 0, 0),fechaFin:new Date(2019, 10, 25, 0 , 0, 0, 0), nombre:"Not Influencers",numParticipantes:17},
      {id:10,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"#HansTopoChallenge",numParticipantes:1},
      {id:11,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:12,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:13,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:14,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:15,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:16,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:17,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:18,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:19,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"#RetoQueNoEsDeRelleno",numParticipantes:16},
      {id:20,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:21,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:22,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:23,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:24,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:25,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:26,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:27,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:28,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:29,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:30,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:31,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:32,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},
      {id:33,fechaInicio:new Date(2019 , 4, 21, 0 , 0, 0, 0),fechaFin:new Date(2019, 4, 7, 0 , 0, 0, 0), nombre:"EpisodioDeRelleno",numParticipantes:13},


    ];
  }

  getSelectedChallenges():Challenge[]{
    return this.retos;
  }

  create_challenge_clicked() {
    const modalRef = this.modalService.open(CrearRetoComponent);
  }
}
