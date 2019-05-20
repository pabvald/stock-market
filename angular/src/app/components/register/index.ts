import { Component } from "@angular/core";
import { DataService } from "src/app/services/data";
import { RegisterForm } from 'src/app/models/forms/register';
import { StateService } from 'src/app/services/state';

@Component({
    selector: "register-page",
    templateUrl: "register.html",
    styleUrls: ["register.css"]
})
export class RegisterComponent {

    form: RegisterForm;
    passwordCheck: string = "";
    error: string = "";
    loading : boolean;
    
    constructor(private data: DataService, private state: StateService){
        this.form = {
            nickname: "",
            password: "",
            email: "",
        };
        this.loading = false;
    }
    
    submit(){
        this.error = "";
        if(this.passwordCheck !== this.form.password){
            this.error = "Las contraseñas no coinciden";
            return;
        }
        if(this.form.email.trim() == ""){
            this.error = "Falta la dirección de correo";
            return;
        }
        if(this.form.nickname.trim() == ""){
            this.error = "Falta el nombre de usuario";
            return;
        }
        if(this.form.password.trim() == ""){
            this.error = "Falta la contraseña";
            return;
        }
        if (!this.loading) {
            this.loading = true;
            this.data.register(this.form).subscribe((data)=>{
                if(data.ok){
                    window.location.href = "/";
                }else{
                    this.error = "Ha habido un error. Intentalo más tarde"; 
                    this.loading = false;
                }
            },(error)=> {
                this.error = "El usuario ya existe";
                this.loading = false;
            });
        }

    }

}