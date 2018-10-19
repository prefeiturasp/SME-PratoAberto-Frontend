import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app.settings';

@Injectable()
export class CalendaryService {

  headers: Headers;
  constructor(private http: Http) {
    this.createAuthorizationHeader();
  }

  createAuthorizationHeader() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  get(date, unit, attendance, grouping) {
    // StaticSettings.BASE_URL + StaticSettings.person
    let _url = AppSettings.BASE_URL + AppSettings.CALENDARY_ENDPOINT + `/${date}?tipo_unidade=${unit}&tipo_atendimento=${attendance}&agrupamento=${grouping}`;
    return this.http.get(_url, {}).map((res) => {
      return res.json()
    });;
  }

  getByRange(unit, attendance, grouping, startDate, endDate) {
    // StaticSettings.BASE_URL + StaticSettings.person
    let _url = AppSettings.BASE_URL + AppSettings.CALENDARY_ENDPOINT + `?tipo_unidade=${unit}&data_inicial=${startDate}&tipo_atendimento=${attendance}&agrupamento=${grouping}&data_final=${endDate}`;
    return this.http.get(_url, {}).map((res) => {
      return res.json()
    });;
  }

}
