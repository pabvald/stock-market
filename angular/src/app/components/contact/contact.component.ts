import { Component, ChangeDetectorRef, OnInit, NgZone } from "@angular/core";
import { DataService } from 'src/app/services/data';
import { EmailForm } from '../../models/forms/email';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    sending : boolean = false;
    form : EmailForm;
    error : string = "";

    constructor( private dataService : DataService ) { 
        this.form = {
            address : "",
            subject : "",
            body : ""
        }
    }

    ngOnInit() { }

    /**
     * Send the email to the administrador if all the fields of the form are right.
     */
    submit() {
        this.error = "";

        if (this.form.address == "") {
          this.error = "Introduzca una dirección de correo electrónico, por favor.";
          return;  
        }
        if (this.form.subject == "") {
          this.error = "Introduzca el asunto de su mensaje, por favor.";
          return;
        }
        if (this.form.body == "") {
          this.error = "Escriba un mensaje, por favor.";
          console.log(this.form.body);
          return;
        } 
        
        if (!this.sending) {
          this.sending = true;
          this.dataService.sendContactEmail(this.form).subscribe((data) => {
            if (data.ok) {              
              alert("Su mensaje ha sido enviado con éxito. El administrador se pondrá en contacto usted lo antes posible.");
              this.sending = false;
            } else {
              alert("Su mensaje no ha podido ser enviado. Por favor, inténtelo de nuevo más tarde.");
              this.sending = false;
            }
          });
        }
        
    }

}
