import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrl  } from '../../app/app-url-constant';
import { PaymentDetailsModel } from '../../models/paymentModel';

@Injectable()
export class PaymentService{
    constructor(private http: Http, private appUrl: AppUrl){

    }

    register(data : PaymentDetailsModel) : Observable<any>{
        let bodyString = JSON.stringify(data); // Stringify payload
        let url = this.appUrl.paymentRegister;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyString)
                        .map(this.extractData);
    }

    updateById(data : PaymentDetailsModel) : Observable<any>{
        let bodyString = JSON.stringify(data); // Stringify payload
        let url = this.appUrl.paymentUpdateById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyString)
                        .map(this.extractData);
    }

    deleteById(id) : Observable<any>{
        let url = this.appUrl.paymentDeleteById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url+'?id='+id)
                        .map(this.extractData);
    }

    getById(dishOneId, CustomerId) : Observable<any>{
        let url = this.appUrl.paymentDetailsById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url + '?dishoneId=' + dishOneId + '&customerId=' + CustomerId)
                        .map(this.extractData);
    }

    get() : Observable<any>{
        let url = this.appUrl.paymentDetails;
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
