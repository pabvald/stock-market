import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Company } from "src/app/models/company";
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

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
    getUserGroups(nickname: string): Observable<Group[]>{
    	let req = this.http.get<Group[]>(`${this.base}/api/user/groups/${nickname}`);
    	//console.log(req);
    	return req;
    }
    getUserInfo(nickname: string): Observable<User>{
    	let req = this.http.get<User>(`${this.base}/api/user/information/${nickname}`);
    	//console.log(req);
    	return req;
    }
} 