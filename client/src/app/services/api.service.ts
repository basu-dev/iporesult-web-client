import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  url = "http://localhost:5000/result"

  iposUrl = "https://iporesult.cdsc.com.np/result/companyShares/fileUploaded"
  getIpos(): Observable<Ipo> {
    return this.http.get<Ipo>(this.iposUrl).pipe(map(
      (data: any) => data.body
    ))
  }

  users = [
    {
      name: "Krishna",
      boid: 1301370002832644
    }
  ]

  getResult(companyShareId: number): Observable<any> {
    return this.http.post(this.url, {
      companyShareId,
      users: this.users
    })
  }
  saveUser(user: any) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users))
  }
  retrieveUsers() {this.users = JSON.parse(localStorage.getItem('users') as string)};



}


//{"companyShareId":"'$id'","boid":"'$1'"}
export interface Ipo {
  id: number,
  name: string,
  scrip: string,
}
