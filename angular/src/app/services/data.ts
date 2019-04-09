import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Company } from "src/app/models/company";
import {Challenge,ChallengeUser} from "src/app/models/challenge";
import { Action } from "src/app/models/action";
import { RegisterForm } from 'src/app/models/forms/register';
import { LoginForm } from 'src/app/models/forms/login';
import { EmailForm } from 'src/app/models/forms/email';
import { Price } from '../models/price';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class DataService {
    base = "http://localhost:9999"
    constructor(private http: HttpClient){

    }
   
    getPortfolioSummary(nickname: string): Observable<Company[]>{
        let req = this.http.get<any>(`${this.base}/api/portfolio/${nickname}`);
        req = req.pipe(map(data=>
           data.map(stock=>{
                stock.benefit = (stock.current-stock.price)*stock.quantity;
                return stock;
            })
        ));
        return req;
    }

    getChallengeList(): Observable<Challenge[]>{
        let req = this.http.get<Challenge[]>(`${this.base}/api/challenges`);
        return req;
    }

    createChallenge(nombre, descripcion, fechaFin): Observable<{id:number}>{
        let postData = { nombre:nombre,
            descripcion:descripcion,
            fechafin:fechaFin,
        };
        let req = this.http.post<{id:number}>(`${this.base}/api/createChallenge`,postData);
        return req;
    }

    addUserToChallenge(idReto:number):Observable<Object>{
        let postData = { 
            reto:idReto,
        };
        
        let req = this.http.post(`${this.base}/api/challenge/addUser`,postData);
        return req;
    }

    removeUserFromChallenge(idReto:number){
        let postData = { 
            reto:idReto,
        };
        
        let req = this.http.post(`${this.base}/api/challenge/removeUser`,postData);
        return req;
    }
    
    getChallengeUsers(id:number):Observable<ChallengeUser[]>{
        let req = this.http.get<ChallengeUser[]>(`${this.base}/api/challenge/${id}`);
        return req;
    }

    getChallengeInfo(idReto:number):Observable<any>{
        let req = this.http.get<any>(`${this.base}/api/challengeData/${idReto}`);
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

    /* ---------------------------------------------------- MARKET --------------------------------------------*/

    /**
     * Try the given purchase. 
     * @param data - purchase information.
     */
    buyStocks(data : any): Observable<any> {
        let req = this.http.post<any>(`${this.base}/api/market/buy`,data,{withCredentials: true})
        return req;
    }

    /**
     * Get the evolution of a company's price.
     * @param code - the code of the company whose price evolution is required.
     */
    getCompanyEvolution(code : string) : Observable<Price[]> {
        let req = this.http.get<Price[]>(`${this.base}/api/market/evolution/${code}`);
        return req;
    }

    /**
     * Get all the companies in the stock market with their current price.
     */
    getMarket() : Observable<Company[]> {
        let req = this.http.get<Company[]>(`${this.base}/api/market/companies`);
        return req;
    }   

    
    /* ---------------------------------------------------- CONTACT ---------------------------------------------*/
    
    /**
     * Send email to admin.
     * @param data - message(subject, email address, content)
     */
    sendEmail( data : EmailForm) : Observable<any> {
        let req = this.http.post<any>(`${this.base}/api/contact`,data,{withCredentials: false});
        return req;
    }
    
} 
