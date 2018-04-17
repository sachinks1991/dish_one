import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrl  } from '../../app/app-url-constant';
import { CustomerModel } from '../../models/customerModel';


@Injectable()
export class CustomerService{
    constructor(private http: Http, private appUrl: AppUrl){

    }

    register(data : CustomerModel) : Observable<any>{
        let bodyString = JSON.stringify(data); // Stringify payload
        let url = this.appUrl.customerRegister;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyString)
                        .map(this.extractData);
    }

    updateById(data : CustomerModel) : Observable<any>{
        let bodyString = JSON.stringify(data); // Stringify payload
        let url = this.appUrl.customerUpdateById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyString)
                        .map(this.extractData);
    }

    deleteById(id) : Observable<any>{
        let url = this.appUrl.customerDeleteById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url+'?id='+id)
                        .map(this.extractData);
    }

    getById(id) : Observable<any>{
        let url = this.appUrl.customerDetailsById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url+'?dishoneId='+id)
                        .map(this.extractData);
    }

    get() : Observable<any>{
        let url = this.appUrl.customerDetails;
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
