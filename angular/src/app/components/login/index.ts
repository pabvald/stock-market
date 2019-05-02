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

    loading : boolean;
    error : string;
    form: LoginForm;

    constructor(private data: DataService, private state: StateService){
        this.form = {
            nickname: "",
            password: "",
        };
        this.error = "";
        this.loading = false;
    }

    /**
     * Log the user in.
     */
    submit(){
        this.loading = true;
        this.error = "";
        this.data.login(this.form).subscribe((data)=>{
            if(data.ok){
                window.location.href = "/";
            } else {
                this.error = "Usuario o contraseña no válidos.";
                this.loading = false;
            }
        })
    }

}