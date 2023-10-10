import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {

  trips:Trip[];

  message: string;

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  
    ) { }
  
  private isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  private addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
  }

  public getTrips(): void {
    this.message = 'Searching for trips';
    this.tripDataService.getTrips()
      .then(trips => {
        this.message = trips.length > 0 ? '' : 'No trips found';
        this.trips = trips;
        this.cdr.detectChanges();  // Trigger Refresh
    });
  }

  ngOnInit() {
    this.getTrips();
  }

}
