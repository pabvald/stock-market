import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Company } from "src/app/models/company";
import {Challenge,ChallengeUser} from "src/app/models/challenge";
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { Action } from "src/app/models/action";
import { RegisterForm } from 'src/app/models/forms/register';
import { LoginForm } from 'src/app/models/forms/login';
import { EmailForm } from 'src/app/models/forms/email';
import { Price } from '../models/price';
import { map } from 'rxjs/operators';
import { Indicator, IndicatorValue } from '../models/indicator';

@Injectable({
    providedIn: "root"
})
export class DataService {
    base = "http://localhost:9999"
    constructor(private http: HttpClient){

    }

    /**
     * Check if there is a user logged in. 
     */
    ping(): Observable<any>{
        let req = this.http.get<any>(`${this.base}/api/ping`,{withCredentials: true});
        return req;
    }
   
    /* --------------------------------------------------------- PORTFOLIO ----------------------------------------------*/

    /**
     * Get the summary of the user's portfolio.
     * @param nickname - user's nickname.
     */
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

    /**
     * Get the history of the user's transactions.
     * @param nickname - user's nickname
     */
    getPortfolioHistory(nickname: string): Observable<Action[]>{
        let req = this.http.get<Action[]>(`${this.base}/api/portfolio/history/${nickname}`);
        return req;
    }

    /**
     * Sell user's stocks. 
     * @param data - information  of the sale. 
     */
    sellActions(data: any): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/portfolio/sell`,data,{withCredentials: true});
        return req;
    }   




    /* ---------------------------------------------- USER ---------------------------------------------------------- */

    /**
     * Get a list of the user's groups.
     * @param nickname - user's nickname.
     */
    getUserGroups(nickname: string): Observable<Group[]>{
    	let req = this.http.get<Group[]>(`${this.base}/api/user/groups/${nickname}`);
    	//console.log(req);
    	return req;
    }

    /**
     * Get user's basic information.
     * @param nickname - user's nickname.
     */
    getUserInfo(nickname: string): Observable<User>{
    	let req = this.http.get<User>(`${this.base}/api/user/information/${nickname}`);
    	//console.log(req);
    	return req;
    }




    /*---------------------------------------------- CHALLENGES -----------------------------------------------------*/

    /**
     * Get a list of all challenges.
     */
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


    /* ------------------------------------------------ REGISTER ----------------------------------------------------*/

    /**
     * Insert the user in the database.
     * @param data - register form.
     */
    register(data: RegisterForm): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/register`,data,{withCredentials: true});
        return req;
    }

    /**
     * Send registration confirmation email to the new user.
     * @param data - must include: nickname, user's email address.
     */
    sendRegisterConfirmationEmail(data : any) : Observable<any> {
        let req = this.http.post<any>(`${this.base}/api/registerconfirmation`,data,{withCredentials: true});
        return req;
    }



    /* -------------------------------------------------- LOGIN ---------------------------------------------------*/

    /**
     * Log user in. 
     * @param data - login form
     */
    login(data: LoginForm): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/login`,data,{withCredentials: true});
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
    getPriceEvolution(code : string) : Observable<Price[]> {
        let req = this.http.get<Price[]>(`${this.base}/api/market/evolution/${code}`);
        return req;
    }

    /**
     * Get the evolution of the indicator of a company's price. 
     * @param code - the code of the company 
     * @param indicator  - the indicator 
     */
    getIndicatorEvolution(code : string, indicator : string) : Observable<IndicatorValue[]> {
        let req = this.http.get<IndicatorValue[]>(`${this.base}/api/market/ind/${code}/${indicator}`);
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
     * Send email to the admin and user.
     * @param data - email form (subject, email address, content)
     */
    sendContactEmail( data : EmailForm) : Observable<any> {
        let req = this.http.post<any>(`${this.base}/api/contact`,data,{withCredentials: false});
        return req;
    }



    /* ---------------------------------------------- PASSWORD RECOVERY ------------------------------------------*/

    /**
     * Send recovery-password email to an user.
     * @param data - must include: nickname, address (email address), newPassword
     */
    sendRecoverPasswordEmail( data : any ) : Observable<any> {
        let req = this.http.post<any>(`${this.base}/api/recoverpassword`,data,{withCredentials: false});
        return req;
    }
    
} 
