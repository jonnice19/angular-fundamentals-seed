import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API: string = '/api/passengers';

@Injectable()
export class PassengerDashboardService {
    constructor(
        private http: Http
    ) {}

    getPassengers(): Observable<Passenger[]> {
        // returns Observable Response 
        // that needs to be subscribed to get the data
        return this.http
            .get(PASSENGER_API) // get resource
            .map((response: Response) => response.json()) // get reponse observable and extract to JSON
            .catch((error: any) => Observable.throw(error.json()));
    }

    getPassenger(id: number): Observable<Passenger> {
        return this.http
            .get(`${PASSENGER_API}/${id}`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    updatePassenger(passenger: Passenger): Observable<Passenger> {
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });

        let options = new RequestOptions({
            headers: headers
        })

        return this.http
            .put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    removePassenger(passenger: Passenger): Observable<Passenger> {
        return this.http
          .delete(`${PASSENGER_API}/${passenger.id}`)
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json()));
    }
}