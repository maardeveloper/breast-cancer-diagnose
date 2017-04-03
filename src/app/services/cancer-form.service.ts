import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CancerFormService {

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  constructor(private _http: Http) {}

  lel() {
    console.log('lel');
  }
}
