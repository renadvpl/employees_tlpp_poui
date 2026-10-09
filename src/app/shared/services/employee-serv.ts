import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SRAFields } from '../interfaces/employee';
import { Field } from '../interfaces/employee';

const BASE_URL = 'http://localhost:8081/rest';

@Injectable({ providedIn: 'root', })
export class EmployeeServ {
  private httpOptions = {}
  private readonly defaultTableColumns: string[] = [
    "ra_mat",
    "ra_nome",
    "ra_cc",
    "ra_sitfolh",
    "ra_admissa",
    "ra_demissa"
  ];

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

  getEmployeeData(fields: Field[], defaultTableColumns: string[], page: number, pageSize: number, orderkey: string, filters: string): Observable<any> {
    let fieldParam = "";

    fields.forEach(field => {
      if (defaultTableColumns.includes(field.field.toLocaleLowerCase())) {
        fieldParam += field.field.toLocaleLowerCase() + ','
      }
    });

    if(fieldParam) {
      fieldParam = fieldParam.slice(0, -1);
    }

    return this.http.get<any>(`${BASE_URL}/api/v1/employees?fields=${fieldParam}&page=${page}&pageSize=${pageSize}&order=${orderkey}&filter=${filters}`, this.httpOptions);
  }

  getDefaultTableColumns(): string[] {
    return this.defaultTableColumns;
  }

}
