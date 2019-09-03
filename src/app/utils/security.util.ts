import { User } from '../models/user';

export class Security{

    public static set(user: User, token: string){
        const data = JSON.stringify(user);
        sessionStorage.setItem('petshop.user',btoa(data));
        sessionStorage.setItem('petshop.token', token);
    }
    public static setUser(user: User){
        const data = JSON.stringify(user);
        sessionStorage.setItem('petshop.user',btoa(data));
    }
    public static setToken(token: string){
        sessionStorage.setItem('petshop.token', token);
    }
    public static getUser(): User{
        const data = sessionStorage.getItem('petshop.user');
        if(data){
            return JSON.parse(atob(data));
        }else{
            return null;
        }
    }
    public static getToken(): string{
        const data = sessionStorage.getItem('petshop.token');
        if(data){
            return data;
        }else{
            return null;
        }
    }
    public static hasToken():boolean{
        if(this.getToken())
            return true;
        else
            return false;
    }
    public static clear(){
        sessionStorage.removeItem('petshop.token');
        sessionStorage.removeItem('petshop.user');

    }
}