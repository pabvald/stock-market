import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class StateService{
    _nickname: string;

    constructor(){

    }
    private getCookie(name: string): string|void{
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }
    set nickname(n: string){
        this._nickname = n;
    }
    get nickname(): string|undefined{
        return this.getCookie("nickname") || undefined;
    }
}