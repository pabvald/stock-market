import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class StateService{
    _nickname: string;

    constructor(){ }

    /**
     * Get the cookies.
     */
    private getCookie(name: string): string|void{
       
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
       
        if (match) return match[2];
    }

    /**
     * Set the user's nickname to the given nickname.
     * @param n - new nickame
     */
    set nickname(n: string){
        this._nickname = n;
    }

    /**
     * Get the nickname of the logged in user.
     */
    get nickname(): string|undefined{
        return this.getCookie("nickname") || undefined;
    }

    deleteNicknameCookie(){
        document.cookie = 'nickname'+'=; Max-Age=-99999999;'; 
    }
}