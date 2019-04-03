import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Company } from "src/app/models/company";

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
} 