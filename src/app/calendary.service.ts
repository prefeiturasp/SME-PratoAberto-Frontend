import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app.settings';
import 'rxjs/add/operator/map';

@Injectable()
export class CalendaryService {

  headers: Headers;
  constructor(private http:Http) {
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
    });
  }

  getWithSchool(date, unit, attendance, grouping, nome) {
    // StaticSettings.BASE_URL + StaticSettings.person
    let _url = AppSettings.BASE_URL + AppSettings.CALENDARY_ENDPOINT + `/${date}?tipo_unidade=${unit}&tipo_atendimento=${attendance}&agrupamento=${grouping}&nome=${nome}`;
    return this.http.get(_url, {}).map((res) => {
      return res.json()
    });
  }


  getByRange(currentSchool, startDate, endDate) {
    let unit =  currentSchool.tipo_unidade
    let attendance = currentSchool.tipo_atendimento
    let grouping = currentSchool.agrupamento
    // StaticSettings.BASE_URL + StaticSettings.person
    let _url = AppSettings.BASE_URL + AppSettings.CALENDARY_ENDPOINT + `?tipo_unidade=${unit}&data_inicial=${startDate}&tipo_atendimento=${attendance}&agrupamento=${grouping}&data_final=${endDate}`;
    return this.http.get(_url, {}).map((res) => {
      return [res.json(), currentSchool.refeicoes]
    })
  }

  getReportPdf(currentSchool, startDate, endDate) {
    let unit =  currentSchool.tipo_unidade
    let attendance = currentSchool.tipo_atendimento
    let grouping = currentSchool.agrupamento
    let nameSchool = currentSchool.nome
    // StaticSettings.BASE_URL + StaticSettings.person
    let _url = AppSettings.BASE_URL + AppSettings.FACTORY_PDF + `?tipo_unidade=${unit}&data_inicial=${startDate}&tipo_atendimento=${attendance}&agrupamento=${grouping}&data_final=${endDate}&nome=${nameSchool}`;
    return _url;
  }

}
