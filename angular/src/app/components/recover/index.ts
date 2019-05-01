import { Component } from "@angular/core";
import { DataService } from 'src/app/services/data';

@Component({
    selector: "recover-page",
    templateUrl: "recover.html",
    styleUrls: ["recover.css"]
})
export class RecoverComponent {

    sending : boolean = false;
    email : string = "";
    error : string = "";

    constructor( private dataService : DataService) {
    }


    /**
     * 
     */
    submit() {
        console.log("submit");
        this.error = "";
        if (this.email == "") {
            this.error = "Debe introducir una dirección de correo electrónico.";
            return;
        }

        let data  = {
            email : this.email,
        };

        if (!this.sending) {
            this.sending = true;
            this.dataService.sendRecoverPasswordEmail(data).subscribe((response)=>{
                if (response.error == 0) {
                    alert("Hemos enviado un correo con su contraseña a la dirección especificada. Consulte su bandeja de entrada.")
                    this.sending = false;
                } else if (response.error == 1) {
                    this.error = "No existe ningún usuario con esa dirección de correo.";
                    this.sending = false;
                } else if (response.error == 2) {
                    alert("Ha habido un problema. Por favor, inténtelo de nuevo más tarde.");
                    this.sending = false;
                }
            });
            
        }
    }

}