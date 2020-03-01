import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';
import { User } from "../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const userApiUrl = "https://secure-reaches-93881.herokuapp.com/User/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};
@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  loggedUser;
  dbUser;
  constructor(
    private firebaseAuth: AngularFireAuth, private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.user = firebaseAuth.authState;
    this.dbUser = new User();
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        userService
          .isAdmin(this.userDetails.email)
          .snapshotChanges()
          .subscribe(data => {
            data.forEach(el => {
              const y = el.payload.toJSON();
              this.dbUser = y;
            });
          });
      } else {
        this.userDetails = null;
      }
    });
  }
  userLogin: User = new User;
  signIn(user: User): Observable<User> {
    console.log("calling Backend Sign In ");
    this.userLogin = user;
    const url = userApiUrl + "signIn/";
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap(herso => {
        console.log(herso);
        this.userLogin = herso
      },
        err => console.log(err))
     


    );
  
    
  }
  getSellerAccountById(id: number): Observable<User> {
    console.log("calling Backend getSellerAccountById ");
    const url = userApiUrl + id;
    let user: User;
    user.id = id;
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap(herso => {
        console.log(herso);
        this.userLogin = herso
      },
        err => console.log(err))



    );
  }
  isLoggedIn(): boolean {
    if (this.userLogin !== null && this.userLogin.id !== undefined)//&& typeof(this.userLogin.email ) != "undefined"
    {
      console.log("Email Is "+this.userLogin.id);
      return true;
    }
  }

  logout() {
    this.loggedUser = null;
    this.userLogin = null;
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailID,
      password
    );
  }

  getLoggedInUser(): User {
     this.userLogin;
   
    console.log(this.userLogin);
    

    return this.userLogin;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    // console.log("loggedUSer", user)
    if (user != null) {
      if (user.admin === true) {
        return true;
      }
    }
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
