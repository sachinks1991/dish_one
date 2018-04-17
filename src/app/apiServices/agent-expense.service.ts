import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUrl  } from '../../app/app-url-constant';
import { AgentExpenseModel } from '../../models/agentExpenseModel';

@Injectable()
export class AgentExpenseService{
    constructor(private http: Http, private appUrl: AppUrl){

    }

    register(data : AgentExpenseModel) : Observable<any>{
        let bodyString = JSON.stringify(data); // Stringify payload
        let url = this.appUrl.agentExpenseRegister;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyString)
                        .map(this.extractData);
    }

    updateById(data : AgentExpenseModel) : Observable<any>{
        let bodyString = JSON.stringify(data); // Stringify payload
        let url = this.appUrl.agentExpenseUpdateById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyString)
                        .map(this.extractData);
    }

    deleteById(id) : Observable<any>{
        let url = this.appUrl.agentExpenseDeleteById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url+'?id='+id)
                        .map(this.extractData);
    }

    getById(dishoneId: number, agentId: number) : Observable<any>{
        let url = this.appUrl.agentExpenseDetailsById;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url + '?dishoneId=' + dishoneId + '&agentId=' + agentId)
                        .map(this.extractData);
    }

    get() : Observable<any>{
        let url = this.appUrl.agentExpenseDetails;
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
