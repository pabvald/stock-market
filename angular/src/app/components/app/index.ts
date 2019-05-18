import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { StateService } from 'src/app/services/state';
import { DataService } from 'src/app/services/data';

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppRoot {

  nickname: string;
  page = "nada";

  constructor(private router: Router, private data: DataService, private state: StateService) {
    /* Hacer PING para saber si tenemos sesión o no*/
    if(state.nickname !== undefined){
      this.nickname = state.nickname;
    }
    this.data.ping().subscribe((data)=>{
      if(data.ok){
        this.nickname = data.nickname;
        this.state.nickname = data.nickname;
      }
    });


    /* Actualizar parte superior de la pestaña */
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart) {
        this.page = event.url;
      }
    });
  }

  logout(){
    
    this.state.deleteNicknameCookie();
    this.data.logout().subscribe((data)=>{  window.location.reload();});
  
  }
}
