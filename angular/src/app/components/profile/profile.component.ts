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
  editing = false;
  newName: string;
  newBiography: string;
  newImageURL: string;
  base64pic: string;
  newBase64pic: string;
  readerResult: string;

  password: string;
  newPassword: string;
  newPasswordRepeat: string;
  
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
        group.variacion = group.balancefinal/group.balanceinicial*100-100;
        group.variacion = parseFloat(group.variacion.toPrecision(5));
        if(group.balanceinicial <= group.balancefinal){
          group.signovariacion = "+";
        }
    });
  	this.groups = g;
  }

  fillInfo(u : User){
  	this.name = u.nombre;
  	this.currentMoney = u.saldo + u.ganado - u.gastado;
  	this.investedMoney = u.gastado;
  	this.initialMoney = u.saldo;
  	this.biography = u.biografia;
    //console.log(u.imagen);
    this.base64pic = u.imagen;
    /*this.imageURL = u.urlfoto;
    if(this.imageURL == undefined){
      this.imageURL = "placeholder.png";
    }*/
  }

  loadPic(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //filename=file.name;
        //filetype=file.type;
        this.readerResult = String(reader.result);
        this.newBase64pic = this.readerResult.split(',')[1];
        //console.log(this.newBase64pic);
        //console.log(this.base64pic);
      };
    }
  }

  submit(){
    //console.log(this.nickname);
    //console.log(this.biography);
    //console.log(this.imageURL);
    document.getElementById("errornewpass").style.display ="none";
    document.getElementById("errorpass").style.display ="none";
    
    if(this.newPassword != undefined){
      if(this.newPasswordRepeat != undefined){
        if(this.newPassword == this.newPasswordRepeat){

        }else{
          document.getElementById("errornewpass").style.display ="initial";
          //Comprobamos también si la contraseña actual es correcta ya que al hacer
          //return aquí si no lo es no se activará el mensaje de error
          this.data.checkPassword(this.nickname, this.password).subscribe((d) => {
            if(!d.ok){
              document.getElementById("errorpass").style.display ="initial";
            }
          });
          return;
        }
      }else{
        document.getElementById("errornewpass").style.display ="initial";
        //Comprobamos también si la contraseña actual es correcta ya que al hacer
        //return aquí si no lo es no se activará el mensaje de error
        this.data.checkPassword(this.nickname, this.password).subscribe((d) => {
          if(!d.ok){
            document.getElementById("errorpass").style.display ="initial";
          }
        });
        return;
      }
    }

    if(this.newName != undefined && this.newName.length != 0){
      this.name = this.newName;
      this.data.updateName(this.nickname, this.name).subscribe((d) => {
      });
    }
    if(this.newBiography != undefined && this.newBiography.length != 0){
      this.biography = this.newBiography;
      this.data.updateBiography(this.nickname, this.biography).subscribe((d) => {
      });
    }
    if(this.newImageURL != undefined && this.newImageURL.length != 0){
      //console.log(this.newImageURL);
      //console.log(this.newImageURL.length);
      //this.imageURL = this.newImageURL.slice(this.newImageURL​.lastIndexOf("\\") + 1);
      this.base64pic = this.newBase64pic;
      this.data.updatePic(this.nickname, this.base64pic).subscribe((d) => {
      });
    }
    

    if(this.newPassword != undefined){
      if(this.password == undefined){
        document.getElementById("errorpass").style.display ="initial";
        return;
      }
      this.data.checkPassword(this.nickname, this.password).subscribe((d) => {
        if(!d.ok){
          document.getElementById("errorpass").style.display ="initial";
          return;
        }else{
          //Inicializo las variables con las contraseñas y la nueva información
          this.newName = undefined;
          this.newBiography = undefined;
          this.newImageURL = undefined;
          this.password=undefined;
          this.newPassword=undefined;
          this.newPasswordRepeat=undefined;
          this.editing = false;
        }
      });

    }else{
      //Inicializo las variables con las contraseñas y la nueva información
      this.newName = undefined;
      this.newBiography = undefined;
      this.newImageURL = undefined;
      this.password=undefined;
      this.newPassword=undefined;
      this.newPasswordRepeat=undefined;
      this.editing = false;
    }
  }

  edit(){
    this.editing=true;
  }
}
