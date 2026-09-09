import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SRAFields } from '../interfaces/employee';

const BASE_URL = 'http://localhost:8081/rest';

@Injectable({ providedIn: 'root', })
export class EmployeeServ {
  httpOptions = {}
  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders( `Authorization: Basic ${btoa('admin:1234')}`)
    };
  }

  getEmployeeFields(): Observable<SRAFields> {
    return this.http.get<SRAFields>(`${BASE_URL}/api/framework/v1/basicProtheusServices/fwFormstructview?alias=SRA`, this.httpOptions);
  }

  getEmployeeData(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/api/v1/employees`, this.httpOptions);
  }
}
