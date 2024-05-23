import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = "https://api.digitalstories.co.in/v1/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getChartData({ params }: any) {
    const headers = new HttpHeaders({
      'X-Api-Key': 'f094fdf9-5718-4858-aa72-64136530c582'

    })
    return this._http.get(`${BASE_URL}slider/GetChartData`, { headers, params });
  }
}