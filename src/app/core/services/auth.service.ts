import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TokenService } from '@core/services/token.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  hasUser() {
    return this.auth.authState;
  }

  loginRestApi(email: string, password: string) {
    return this.httpClient.post("https://platzi-store.herokuapp.com/auth", {
      email, password
    }).pipe(
      tap((data: { token: string }) => {
        const token = data.token;
        this.tokenService.saveToken(token);
      })
    );
  }
}
