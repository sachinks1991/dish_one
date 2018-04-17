import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrl  } from '../../app/app-url-constant';
import { Subscription } from 'rxjs';

@Injectable()
export class LoginService{
    constructor(private http: Http, private appUrl: AppUrl){

    }

    getCustomerDetails() : Observable<any>{
        let url = this.appUrl.dishOneCustomerDetails;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url)
                        .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
}
