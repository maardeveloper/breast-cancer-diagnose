import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class CancerResultService {
  private apiUrl: string;
  private userApiUrl: string;
  private headers: Headers;
  private params: URLSearchParams = new URLSearchParams();
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  constructor(
    private http: Http) {
      this.userApiUrl = `${environment.API_ENDPOINT}/users`;
      this.apiUrl = `${environment.API_ENDPOINT_CANCER}`;
      // this.headers = new Headers({
      //   'Accept': 'version=1',
      //   'X-Application': 'client'
      // });
    }

  getAllUsers() {
    const URL = `${this.userApiUrl}`;
    return this.http
          .get(URL)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
  }

  getAllCancerResult() {
    const URL = `${this.apiUrl}`;
    return this.http
          .get(URL)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
  }

  postCancerResult(cancer) {
    console.log('esto posteare =>', cancer);
    const URL = `${this.apiUrl}`;
    return this.http
          .post(URL,{ 'cancer': cancer },)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
  }

  logURL() {
    console.log(`${this.apiUrl}`);
  }

}
