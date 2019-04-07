import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CrearRetoComponent} from '../crear-reto/crear-reto.component';
import {Challenge} from 'src/app/models/challenge';
import {DataService} from 'src/app/services/data';

@Component({
  selector: 'app-lista-retos',
  templateUrl: './lista-retos.component.html',
  styleUrls: ['./lista-retos.component.css']
})
export class ListaRetosComponent implements OnInit {

  retos:Challenge[];
  searched_challenge:String;

  constructor(private modalService: NgbModal, private data:DataService) { }

  ngOnInit() {
    this.data.getChallengeList().subscribe((data)=>this.setRetos(data));
    this.searched_challenge="";
  }

  setRetos(retos:Challenge[]){
   this.retos = retos;
  }
  getSelectedChallenges():Challenge[]{
    if(this.searched_challenge.trim())
      return this.retos.filter(challenge => challenge.nombre.toLowerCase().includes(this.searched_challenge.trim().toLowerCase()));
    else
      return this.retos;
  }

  create_challenge_clicked() {
    this.modalService.open(CrearRetoComponent);
  }



}
