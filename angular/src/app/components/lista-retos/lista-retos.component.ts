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

  constructor(private modalService: NgbModal, private data:DataService) { }

  ngOnInit() {
    this.data.getChallengeList().subscribe((data)=>this.setRetos(data));
  }

  setRetos(retos:Challenge[]){
    this.retos = retos;
  }
  getSelectedChallenges():Challenge[]{
    return this.retos;
  }

  create_challenge_clicked() {
    const modalRef = this.modalService.open(CrearRetoComponent);
  }
}
