import { Component, OnInit } from '@angular/core';

import { Passenger } from "./../../models/passenger.interface";

import { PassengerDashboardService } from './../../passenger-dashboard.service';

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  templateUrl: "./passenger-dashboard.component.html"
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    this.getPassengers();
  }

  getPassengers() {
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => this.passengers = data);
  }

  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe(
        (data: Passenger) => {
          // if request was successful perform update
          this.passengers = this.passengers.map((passenger: Passenger) => {
            if(passenger.id === event.id) {
              passenger = Object.assign({}, passenger, event);
            }
            return passenger;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => passenger.id !== data.id);
      }, () => this.getPassengers());
  }
}
