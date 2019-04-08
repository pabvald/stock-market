import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class StateService{
    _nickname: string;

    constructor(){

    }
    set nickname(n: string){
        this._nickname = n;
    }
    get nickname(){
        return this._nickname;
    }
}