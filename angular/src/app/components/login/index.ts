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

    form: LoginForm;

    constructor(private data: DataService, private state: StateService){
        this.form = {
            nickname: "",
            password: "",
        };
    }

    submit(){
        this.data.login(this.form).subscribe((data)=>{
            if(data.ok){
                window.location.href = "/";
            }
        })
    }

}