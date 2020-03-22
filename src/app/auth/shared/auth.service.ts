import { Injectable } from '@angular/core';
import { products } from 'src/app/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService{

    constructor(private http: HttpClient) { }

    // getProducts(): Observable<any>{
    //     // return products
    //     return this.http.get('/api/v1/products')
    // }
    register(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/register' ,userData)
        // return products[productId]
    }
    login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/login' ,userData)
        // return products[productId]
    }
}