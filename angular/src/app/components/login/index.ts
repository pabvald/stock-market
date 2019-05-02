import { Component } from "@angular/core";
import { DataService } from 'src/app/services/data';
import { LoginForm } from 'src/app/models/forms/login';
import { StateService } from 'src/app/services/state';

@Component({
    selector: "login-page",
    templateUrl: "login.html",
    styleUrls: ["login.css"]
})
export class LoginComponent {

    error = "";
    form: LoginForm;

    constructor(private data: DataService, private state: StateService){
        this.form = {
            nickname: "",
            password: "",
        };
    }

    submit(){
        this.error = "";
        this.data.login(this.form).subscribe((data)=>{
            if(data.ok){
                window.location.href = "/";
            } else {
                this.error = "Usuario o contraseña no válidos."
            }
        })
    }

}