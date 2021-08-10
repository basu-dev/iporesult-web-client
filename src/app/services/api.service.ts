import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  url = "https://ipo-result.herokuapp.com"
  resultUrl = `${this.url}/result`
  iposUrl = "https://iporesult.cdsc.com.np/result/companyShares/fileUploaded"

  private ipos: Ipo[] = [];

  getIpos(): Observable<Ipo[]> {
    if (this.ipos.length != 0) return of(this.ipos);

    return this.http.get<Ipo>(this.iposUrl).pipe(
      tap((data: any) => this.ipos = data.body),
      map(
        (data: any) => data.body
      ))
  }

  public loadingSub = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSub.asObservable();

  loading(load: boolean) {
    this.loadingSub.next(load);
  }

  getIpoById(id: number): Ipo {
    return this.ipos.find(ipo => ipo.id == id) as Ipo;
  }
  users: User[] = [];

  ping() {
    this.http.get(this.url).subscribe(
      _ => console.log("Server Ready"),
      (err) => console.error(err)
    )
  }

  getResult(companyShareId: number): Observable<IpoResult[]> {
    console.log(this.users)
    return this.http.post<IpoResult[]>(this.resultUrl, {
      companyShareId,
      users: this.users
    })
  }

  getUserById(id: string): User {
    return this.users.filter(u => u.id == id)[0];
  }

  saveUser(user: any) {
    user.id = Date.now().toString();
    this.users.push(user);
    this.saveToLocalStorage();
  }

  updateUser(user: User, id: string) {
    let index = this.users.findIndex(user => user.id == id);
    console.log(index);
    if (index != -1) {
      this.users[index].name = user.name;
      this.users[index].boid = user.boid;
      this.saveToLocalStorage();
    }

  }

  deleteUser(id: string) {
    let index = this.users.findIndex(user => user.id == id);
    if (index != -1) {
      this.users.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('ipoUsers', JSON.stringify(this.users))
  }

  retrieveUsers() {
    this.users = JSON.parse(localStorage.getItem('ipoUsers') as string) ?? this.users
    return this.users;
  };
}


//{"companyShareId":"'$id'","boid":"'$1'"}
export interface Ipo {
  id: number,
  name: string,
  scrip: string,
}

export interface IpoResult {
  user: User,
  result: Result
}

export interface User {
  id: string,
  name: string,
  boid: number
}

export interface Result {
  success: boolean,
  message: string
}
