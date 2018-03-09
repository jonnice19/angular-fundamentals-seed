import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Passenger } from "./../../models/passenger.interface";

@Component({
  selector: "passenger-detail",
  styleUrls: ["passenger-detail.component.scss"],
  template: `
        <div>
            <span class="status" [ngClass]="{'checked-in' : detail.checkedIn}"></span>
            <div *ngIf="editing">
                <input type="text" 
                    [value]="detail.fullname"
                    (input)="onNameChange(name.value)"
                    #name>
            </div>
            <div *ngIf="!editing">
                {{ detail.fullname }}
            </div>
            <div class="date">
                Check in date: {{ detail.checkedIn ? (detail.checkedInDate | date:'yMMMMd') : 'Not Checked In' }}
            </div>
            <button (click)="toggleEdit()">
                {{ editing ? 'Done' : 'Edit' }}
            </button>
            <button (click)="onRemove()">
                Remove
            </button>
        </div>
    `
})
export class PassengerDetailComponent implements OnChanges {
  @Input() detail: Passenger;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;

  /**
   * Get current value from container component
   */
  ngOnChanges(changes) {
      if(changes.detail) {
        this.detail = Object.assign({}, changes.detail.currentValue);
      }
  }

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if( this.editing ) {
        // passing the modified object to the parent 
        this.edit.emit(this.detail);
    }

    this.editing = !this.editing;
  }

  onRemove() {
    // passing the detail object to the parent
    this.remove.emit(this.detail);
  }
}