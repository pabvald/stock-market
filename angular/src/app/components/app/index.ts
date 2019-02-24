import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppRoot {

  page = "nada";

  constructor(private router: Router) {

    /* Actualizar parte superior de la pestaña */
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart) {
        this.page = event.url;
      }
    });
  }
}
