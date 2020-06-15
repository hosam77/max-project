import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private route: Router) {
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseKey, {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      ).pipe(catchError(this.handelError), tap(resData => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        }
      ));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }).pipe(catchError(this.handelError), tap(resData => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        }
      ));
  }

  private handelError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email is already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'This password is not correct';
        break;
    }
    return throwError(errorMsg);
  }

  handelAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const epirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,
      localId,
      idToken,
      epirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    // to storage the info on browser
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.route.navigate(['/auth']);
    // localStorage.clear();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    // get the data from local Storage
    const userData: {
      email: string;
      id: string;
      // tslint:disable-next-line:variable-name
      _token: string;
      // tslint:disable-next-line:variable-name
      _tokenExpirationData: string;
      registered?: boolean;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadetUser = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationData));
    if (loadetUser.token) {
      this.user.next(loadetUser);
      const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
