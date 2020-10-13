import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
  )
export class ServicesService {
  constructor(private http: HttpClient) { }

  getCounttries():Observable<any>{
    const url="https://api.covid19api.com/countries"
    return this.http.get<any>(url)
  }

  getCoronaRealtimeData(country):Observable<any>{
    const url="https://api.covid19api.com/dayone/country/"+country
return this.http.get<any>(url)
  }
  
}
