import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class NetworkService {

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  constructor(private _http: Http) {}

  getTestData() {
    return this._http
      .get("assets/network/breast-cancer-wisconsin-test.json")
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTrainingData() {
    return this._http
      .get("assets/network/breast-cancer-wisconsin.json")
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  lel() {
    console.log('lel');
  }
}
