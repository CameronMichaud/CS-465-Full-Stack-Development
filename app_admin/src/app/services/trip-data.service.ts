import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Trip } from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(private httpClient: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  /* ----------------------------------------------------------------------------------------------
   * API Interactions || CRUD, Create, Read, Update Delete. (ADD, GET, PUT, DELETE)
   * ----------------------------------------------------------------------------------------------
   */

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.httpClient
      .post(this.tripUrl, formData)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> { 
    console.log('Inside TripDataService#getTrip(tripCode)'); 
    return this.httpClient
    .get(this.tripUrl + tripCode)
    .toPromise()
    .then(response => response as Trip)
    .catch(this.handleError); 
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.httpClient
      .get(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(tripCode: string, formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log('Update Trip got:', formData);
    console.log('Code property exists:', 'code' in formData);
    console.log('URL:', this.tripUrl + tripCode, formData);
    return this.httpClient
      .put(this.tripUrl + tripCode, formData)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }
  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#deleteTrip(tripCode)');
    return this.httpClient
      .delete(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response as Trip)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // For demo only
    return Promise.reject(error.message || error);
  }

}
