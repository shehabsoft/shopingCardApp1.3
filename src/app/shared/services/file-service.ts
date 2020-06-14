import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { Constant } from '../models/constant';
import { catchError, tap, map } from 'rxjs/operators';
const apiUrl = Constant.API_ENDPOINT + "Product/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};
@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: Http) { }
  
   
   

 
}
