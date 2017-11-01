import { Globals } from './app.globals';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app.settings';
import 'rxjs/add/operator/map';

@Injectable()
export class SchoolsService {

  headers: Headers;
  constructor(private http:Http) {
    // this.createAuthorizationHeader();
  }

  createAuthorizationHeader() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  get() {
    let _url = AppSettings.BASE_URL + AppSettings.SCHOOLS_ENDPOINT;
    // return this.http.get(_url, {headers: this.headers})
    return this.http.get(_url, {}).map((res) => {
      Globals.querySchool = true;
      return res.json()
    });
  }

  getDetails() {
    let _url = AppSettings.SCHOOLS_DETAILS_ENDPOINT;
    // return this.http.get(_url, {headers: this.headers})
    return this.http.get(_url, {}).map((res) => {
      return res.json()
    });
  }

  getById(id) {
    let _url = AppSettings.BASE_URL + AppSettings.SCHOOL_ENDPOINT + `/${id}`;
    // return this.http.get(_url, {headers: this.headers})
    return this.http.get(_url, {}).map((res) => {
      return res.json()
    });;
  }
}
