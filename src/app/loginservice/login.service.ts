import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  // login(userdata: any): Observable<any> {
  //   return this.http.post<any>(this.url, userdata);
  // }
  // updateUserDetails(email:any,userDetails: any): Observable<any> {
  //   return this.http.put<any>(this.updateUrl, userDetails,email); // PUT request to update user details
  // }
  storeRole(role: string): void {
    sessionStorage.setItem('role', role); // Store the role in localStorage
  }

  getRole(): string | null {
    return sessionStorage.getItem('role'); // Retrieve the role from localStorage
  }

  storeToken(token: string): void {
  sessionStorage.setItem('jwt', token);
  }
  getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);  // Decode the token and return the payload
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }
}
