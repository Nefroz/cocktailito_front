import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class EntityService {

    public entity
    private baseURL = environment.apiURL

    constructor(private http: HttpClient) {}

    set(entity:string) {
        this.entity = entity
    }

    get(url) {
        return this.http.get(`${this.baseURL}${this.entity}${url}`)
    }

}