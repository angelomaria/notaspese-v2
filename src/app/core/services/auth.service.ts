import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user: User | null = null;
    private url = 'https://notaspese-api.ceastack.com';

    constructor(private http: HttpClient) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User | null {
        if (!this.user) {
            this.user = JSON.parse(sessionStorage.getItem('currentUser')!);
        }
        return this.user;
    }

    /**
     * Performs the login auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string): any {
        let urlLogin: string = this.url + '/api/login';
        return this.http.post<any>(urlLogin, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    this.user = user;
                    // store user details and jwt in session
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    forgotPassword(email: string): any {
        let urlLogin: string = this.url + '/api/forget-password';
        return this.http.post<any>(urlLogin, { email }).pipe(map(user => user));
    }

    forgottenPassword(email: string, password: string, token: string): any {
        let urlLogin: string = this.url + '/api/forgotten-password';
        return this.http.post<any>(urlLogin, { email, password, token }).pipe(map(user => user));
    }

    getAllExpenses(): any {
        let url: string = this.url + '/api/get_all_expenses';
        let user = this.user.user.id;
        return this.http.post<any>(url, { user }).pipe(map(data => {
            return data;
        }));
    }

    getAllMyExpenses(): any {
        let url: string = this.url + '/api/get_expenses_by_me';
        let user = this.user.user.id;
        return this.http.post<any>(url, { user }).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Logout the user
     */
    logout(): void {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        this.user = null;
    }
}

