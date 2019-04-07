import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CHALLENGE_NAME_MAX_LENGTH} from 'src/app/models/challenge';

@Component({
  selector: 'app-crear-reto',
  templateUrl: './crear-reto.component.html',
  styleUrls: ['./crear-reto.component.css']
})
export class CrearRetoComponent implements OnInit {

  form: FormGroup;
  today:Date;
  nameError: String;
  startDateError: String;
  endDateError:String;

  constructor(public activeModal: NgbActiveModal,private data:DataService,private fb:FormBuilder,private router: Router) {
    this.form = fb.group({
      'nombre':["", Validators.required],
      'descripcion':["",null],
      'fechaIni':[null,Validators.required],
      'fechaFin': [null,Validators.required],
    });

    this.today = new Date();
  }

  ngOnInit() {
  }

 
  pressedCreateButton(){
    this.startDateError = null;
    this.nameError = null;
    this.endDateError = null;

      let valid = true;
      if (this.form.get("nombre").invalid){
        valid = false;
        this.nameError = "El reto debe tener un nombre";
      }
      let nombre:String = this.form.get("nombre").value;

      if (nombre!=null && nombre.length>CHALLENGE_NAME_MAX_LENGTH){
        valid = false;
        this.nameError = `El tamaño máximo de un reto es ${CHALLENGE_NAME_MAX_LENGTH}`;
      }

      if(this.form.get("fechaIni").invalid){
        this.startDateError = "El reto debe tener una fecha de inicio.";
        valid = false;
      }
    
      if(this.form.get("fechaFin").invalid){
        this.endDateError = "El reto debe tener una fecha de finalización."
        valid = false;
      }


      let fechaIni = new Date(this.form.get("fechaIni").value);
      let fechaFin = new Date(this.form.get("fechaFin").value);

      let maxIni = new Date();
  
       maxIni.setMonth(maxIni.getMonth()+1);


      if(fechaIni!=null && fechaIni>maxIni){
        this.startDateError = "La fecha de inicio debe como mucho dentro de un mes.";
        valid = false;
      }

      let maxEnd = new Date(fechaIni);
      maxEnd.setFullYear(maxEnd.getFullYear() + 1);

      if(fechaFin!=null && fechaFin>maxEnd){
        this.endDateError = "La duración de un reto debe ser inferior a un año";
        valid = false;
      }

      if (fechaIni!=null && fechaFin!=null && fechaFin <= fechaIni){
          this.endDateError = "La fecha de fin debe ser posterior a la fecha de inicio";
          valid = false;
      }

     
      if (valid){
        let descripcion = this.form.get("descripcion").value;
     
        let creation = this.data.createChallenge(nombre,descripcion,fechaIni,fechaFin);
        
        creation.subscribe((data)=>{
          this.router.navigateByUrl(`/challenge/${data.id}`);
         this.close();
        });
      }
     
    
  }

  close(){
    this.activeModal.close();
  }


}
