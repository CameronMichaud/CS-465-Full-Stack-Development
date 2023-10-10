import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { TripListingComponent } from '../trip-listing/trip-listing.component';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
  providers: [TripDataService]
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;
  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private tripListingComponent: TripListingComponent,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private editTrip(trip: Trip): void {
    console.log('Inside TripCardComponent#editTrip');
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

  private deleteTrip(trip: Trip): void {
    console.log('Inside TripCardComponent#deleteTrip');
    this.tripDataService
      .deleteTrip(trip.code)
      .then(deletedTrip => {
        this.tripListingComponent.getTrips();
      })
      .catch(error => {
        console.error('Error deleting trip:', error);
      });
  }

}
