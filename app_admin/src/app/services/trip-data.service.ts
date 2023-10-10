import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { Trip } from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
    ) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  /* ----------------------------------------------------------------------------------------------
   * API Interactions || CRUD, Create, Read, Update Delete. (ADD, GET, PUT, DELETE)
   * ----------------------------------------------------------------------------------------------
   */

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.httpClient
      .post(this.tripUrl, formData, { headers: this.getHeaders() })
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
      .put(this.tripUrl + tripCode, formData, { headers: this.getHeaders() })
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }
  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#deleteTrip(tripCode)');
    console.log("TripCode: " + tripCode);
    console.log('URL: ', this.tripUrl + tripCode);
    console.log('Headers: ', this.getHeaders());
    return this.httpClient
      .delete(this.tripUrl + tripCode, { headers: this.getHeaders() })
      .toPromise()
      .then(response => response as Trip)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // For demo only
    return Promise.reject(error.message || error);
  }

  /* ----------------------------------------------------------------------------------------------
  * User Authentication & Creation || Register, Login, Authenticate
  * ----------------------------------------------------------------------------------------------
  */
  private getHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    console.log("Token: " + token);

    // Add the token to the headers
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    });

    return headers;
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    console.log("Making Auth Api Call");
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.httpClient
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

}
