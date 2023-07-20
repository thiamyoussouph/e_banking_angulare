import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  isAuthenticated : boolean = false;
  roles : any;
  username : any;
  accessToken!: string;

  public login( username: string,password: string) {
  let options={
    headers:new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  }
    let params = new HttpParams().set('username', username).set('password', password);

  return this.http.post("http://localhost:8085/auth/login",params,options);
  }

  loadprofile(data:any) {
    this.isAuthenticated = true;
    this.accessToken = data["access_token"];
    let decodedjwt:any=jwtDecode(this.accessToken);
    this.username=decodedjwt.sub;
     this.roles=decodedjwt.scope;
  }
}
