import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Company } from "src/app/models/company";
import { Action } from "src/app/models/action";

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
    getPortfolioHistory(nickname: string): Observable<Action[]>{
        let req = this.http.get<Action[]>(`${this.base}/api/portfolio/history/${nickname}`);
        return req;
    }

    sellActions(data: any): Observable<any>{
        let req = this.http.post<any>(`${this.base}/api/portfolio/sell`,data);
        return req;
    }
} 