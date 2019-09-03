import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private url = 'http://localhost:3000/v1';
    constructor(public http: HttpClient) { }

    composeHeader() {
        const token = sessionStorage.getItem('petshop.token');
        const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return header;
    }

    getProducts() {
        return this.http.get<Product[]>(`${this.url}/products`);
    }
    authenticate(data) {
        return this.http.post(`${this.url}/accounts/authenticate`, data);
    }
    refreshToken() {
        return this.http.post(`${this.url}/accounts/authenticate`, null, { headers: this.composeHeader() });
    }
    create(data) {
        return this.http.post(`${this.url}/accounts`, data);
    }
    resetPassword(data) {
        return this.http.post(`${this.url}/accounts/reset-password`, data);
    }
}