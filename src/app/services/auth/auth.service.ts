import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject, catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthDto } from '../interfaces/authDto.interface';
import { UserLogin } from '../interfaces/userLogin.interface';
import { RegisterUser } from '../interfaces/user-signup.interface'
import { MoviesService } from '../movies/movies.service';
import { Roles, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  //Insteand any with AppUserAuth later
  private userSubject$ = new BehaviorSubject<User>({});
  users$!: Observable<any>

  // private RegisterUser = new RegisterUser()
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>
  authServerPath: string = "http://localhost:4231/auth";
  isPass:boolean = true;


  get userValue() {
    return this.userSubject$.value
  }

  private appUserRegister = new RegisterUser();

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly movieService: MoviesService,
    //@Inject(AUTHSERVER) private readonly authServerPath: string
  ) { 
  
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.authServerPath}/users`)
                .pipe(
                  map((data: any) => {
                    return data.map((user: User) => {
                      return {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        role: user.role
                      }
                    })
                  })
                )
  }

  /*Sign In*/
  login(user: UserLogin): Observable<AuthDto>{
    return this.http.post<AuthDto>(`${this.authServerPath}/signin`, user)
                  .pipe(
                    tap(() => this.isPass = true),
                    catchError((err) => {
                      //this.isPass = false;
                      alert('The email or password is wrong!'); 
                      this.router.navigate(['/login']);
                      return throwError("Error happend when signing in! ", err)
                    }),
                    tap(({accessToken, role}: AuthDto) => {
                      this.setUserValueByToken({accessToken, role})
                      delay(1000);
                      this.router.navigate(['/movies']);
                    }),
                    
                  )
  }

  /*SignUp*/
  // addUserInfo(userInfo: UserInfo){

  // }
  signUp(newUser: User) : Observable<AuthDto | string> {
    // this.appUserRegister = {
    //   ...this.appUserRegister,
    //   ...userRole
    // };
    console.log("Sign up triggered!")
    // const {username, password, email, role} = newUser;
    console.log(newUser)

    // if (!username || !password || !email || !role){
    //   return of("Register Failed")
    // }

    return this.http.post<AuthDto>(
      `${this.authServerPath}/signup`, newUser)
    .pipe(
      tap(({accessToken, role}: AuthDto) => {
        console.log("token: " + accessToken)
        this.setUserValueByToken({accessToken, role})
        this.router.navigate(['/login']);
      }),
      catchError((err) => {
        return throwError("Error happend when signing up! ", err)
      })
    )
  }

  

  refreshToken(): Observable<AuthDto | string>{
    const curToken = localStorage.getItem("access_token");
    if(!curToken){
      this.router.navigate(['/']);
      return of('err');
    }

    const {id, username, email, tmdb_key} = 
      this.jwtHelper.decodeToken(curToken);

    const user = {id, username, email, tmdb_key};
    return this.http.post<AuthDto>(`${this.authServerPath}/auth/refresh-token`, user)
            .pipe(
              tap(({accessToken, role}: AuthDto) => {
                this.setUserValueByToken({accessToken, role})
              })
            )
  }

  private startRefreshToeknTimer(exp: string){
    const expires = new Date(+exp*1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if(this.userValue.jwtToken){
        this.refreshToken().subscribe();
      }
    }, timeout)
  }

  private stopRefreshTokenTimer(){
    clearTimeout(this.refreshTokenTimeout)
  }

  private setUserValueByToken = (({accessToken, role}: AuthDto) => {
    console.log("set func: " + accessToken);
    localStorage.setItem('access_token', accessToken);
    const {id, username, email, exp} = 
      this.jwtHelper.decodeToken(accessToken);

    // this.movieService.setApiKey = tmdb_key;
    const user = {
      ...{id, username, email},
      jwtToken: accessToken,
      role: role
    }
    this.userSubject$.next(user);
    console.log(`User Value: ${this.userValue.role}` )
    this.startRefreshToeknTimer(exp);
  })


}
