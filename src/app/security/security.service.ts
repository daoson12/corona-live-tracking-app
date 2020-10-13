import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse, HttpParams,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private _registerUrl="http://localhost:3000/authentication/register"
  private _checkusernameUrl="http://localhost:3000/authentication/checkUsername"
  private _checkemailUrl="http://localhost:3000/authentication/checkeEmail"
  private _loginUrl="http://localhost:3000/authentication/login"
  private _ProfleUrl="http://localhost:3000/authentication/profile"
  authToken: any;
  user: any;
  options;

  constructor(private http:HttpClient, private router:Router) { }

  createUserAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    let headers = new HttpHeaders({

      'Content-Type': 'application/json', // Format set to JSON
      'authorization': this.authToken // Attach token

    });

    this.options = {
      headers: headers
    }

  }
  // Function to get token from client local storage
  loadToken() {
    this.authToken = sessionStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }


  // conneting a registered user from the frontend and saving it to the backend api
  saveRegisteredUser(user){
    return this.http.post<any>(this._registerUrl,user)
   }
   
  // Function to check if username is taken
  checkUsernames(username):any {
    return this.http.get(this._checkusernameUrl, username )
  }

  // Function to check if e-mail is taken
  checkEmails(email):any {
    return this.http.get(this._checkemailUrl, email)
  }

  // contecting a login user from the frontend and saving it to the backend
  loginUser(user){
    
    return this.http.post<any>(this._loginUrl,user)  
   }
  //  auth gaurd implementation
  loggedIn(){
    return !!sessionStorage.getItem('token')

  }
  // if user clicks on logoutUser method it should return the user to login and clear token on session storage
  logoutUser(){
     sessionStorage.removeItem('token')
     sessionStorage.removeItem('user')
    this.router.navigate(['/'])

  }
  // storeUserData(token, user){

  // }
  getToken(token, user){
  
  sessionStorage.setItem('token',token);
  sessionStorage.setItem('user',JSON.stringify (user));
  
   this.authToken=token
   this.user=user;

  }


  getProfile():Observable<any>{
    this.createUserAuthenticationHeaders(); // Create headers before sending
    return this.http.get(this._ProfleUrl,this.options)

  }
  
}

