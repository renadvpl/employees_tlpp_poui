import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SRAFields } from '../interfaces/employee';
import { Field } from '../interfaces/employee';

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

  getEmployeeData(fields: Field[], defaultTableColumns: string[], page: number, pageSize: number): Observable<any> {
    let fieldParam = "";

    fields.forEach(field => {
      if (defaultTableColumns.includes(field.field.toLocaleLowerCase())) {
        fieldParam += field.field.toLocaleLowerCase() + ','
      }
    });

    if(fieldParam) {
      fieldParam = fieldParam.slice(0, -1);
    }

    console.log(fieldParam);
    return this.http.get<any>(`${BASE_URL}/api/v1/employees?fields=${fieldParam}&page=${page}&pageSize=${pageSize}`, this.httpOptions);
  }
}
