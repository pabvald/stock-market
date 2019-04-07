import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Company } from "src/app/models/company";
import {Challenge} from "src/app/models/challenge";
import { Action } from "src/app/models/action";
import { RegisterForm } from 'src/app/models/forms/register';
import { LoginForm } from 'src/app/models/forms/login';

@Injectable({
    providedIn: "root"
})
export class DataService {
    base = "http://localhost:9999"
    constructor(private http: HttpClient){

    }
    
    getPortfolioSummary(nickname: string): Observable<Company[]>{
        let req = this.http.get<Company[]>(`${this.base}/api/portfolio/${nickname}`);
        return req;
    }

    getChallengeList(): Observable<Challenge[]>{
        let req = this.http.get<Challenge[]>(`${this.base}/api/challenges`);
        return req;
    }

    createChallenge(nombre, descripcion, fechaIni, fechaFin): Observable<{id:number}>{
        let postData = { nombre:nombre,
            descripcion:descripcion,
            fechainicio:fechaIni,
            fechafin:fechaFin,
        };
        let req = this.http.post<{id:number}>(`${this.base}/api/createChallenge`,postData);
        return req;
    }


    getPortfolioHistory(nickname: string): Observable<Action[]>{
        let req = this.http.get<Action[]>(`${this.base}/api/portfolio/history/${nickname}`);
        return req;
    }

    sellActions(data: any): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/portfolio/sell`,data,{withCredentials: true});
        return req;
    }

    register(data: RegisterForm): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/register`,data,{withCredentials: true});
        return req;
    }

    login(data: LoginForm): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/login`,data,{withCredentials: true});
        return req;
    }

    ping(): Observable<any>{
        let req = this.http.get<any>(`${this.base}/api/ping`,{withCredentials: true});
        return req;
    }

} 
