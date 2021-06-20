import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  url = "http://localhost:5000"
  resultUrl = `${this.url}/result`
  iposUrl = "https://iporesult.cdsc.com.np/result/companyShares/fileUploaded"
  getIpos(): Observable<Ipo> {
    return this.http.get<Ipo>(this.iposUrl).pipe(map(
      (data: any) => data.body
    ))
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
  saveUser(user: any) {
    this.users.push(user);
    localStorage.setItem('ipoUsers', JSON.stringify(this.users))
  }
  retrieveUsers() {this.users = JSON.parse(localStorage.getItem('ipoUsers') as string) ?? this.users};



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
  name: string,
  boid: number
}
export interface Result {
  success: boolean,
  message: string
}
