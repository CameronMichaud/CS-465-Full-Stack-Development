import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
