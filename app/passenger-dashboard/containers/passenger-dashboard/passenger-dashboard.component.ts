import { Component, OnInit } from '@angular/core';

import { Passenger } from "./../../models/passenger.interface";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  templateUrl: "./passenger-dashboard.component.html"
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor() {}

  ngOnInit() {
    this.passengers = [
      {
        id: 1,
        fullname: 'MJ',
        checkedIn: true,
        checkedInDate: 1490742000000,
        children: null
      },
      {
        id: 1,
        fullname: 'MJ',
        checkedIn: true,
        checkedInDate: 1490742000000,
        children: null
      },
      {
        id: 1,
        fullname: 'MJ',
        checkedIn: false,
        checkedInDate: 1490742000000,
        children: null
      }
    ];
  }
}