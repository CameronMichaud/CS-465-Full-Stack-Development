import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service'; 

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;
  tripCode: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService 
  ) { }

  ngOnInit() {
    // retrieve stashed tripId
    this.tripCode = localStorage.getItem("tripCode");
    if (!this.tripCode) {
      alert("Stashed tripCode not found.");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent#onInit found tripCode ' + this.tripCode);

    // Initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required], 
    })

    this.tripService.getTrip(this.tripCode)
    .then(data => {
      console.log(data);
      // Don't use editForm.setValue()
      this.editForm.patchValue(data[0]);
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) { // Send tripCode to assemble URL, send form data to update with
      console.log("Submitted: " + this.tripCode + " " + this.editForm.value);
      this.tripService.updateTrip(this.tripCode, this.editForm.value)
        .then(data => {
          console.log("Submitted: " + data);
          this.router.navigate(['']);
        });
    }
  }
}
