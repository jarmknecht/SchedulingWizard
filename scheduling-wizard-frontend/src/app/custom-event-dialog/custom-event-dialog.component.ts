import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-event-dialog',
  templateUrl: './custom-event-dialog.component.html',
  styleUrls: ['./custom-event-dialog.component.css']
})
export class CustomEventDialogComponent implements OnInit {

  public week = [
    //'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    //'Saturday'
  ];

  public eventData: FormGroup;
  public isEdit: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CustomEventDialogComponent>) {
    this.eventData = new FormGroup({
      name: new FormControl(this.data.name || '', Validators.required),
      start: new FormControl(this.data.start || '08:00', Validators.required),
      end: new FormControl(this.data.end || '08:00', Validators.required),
      days: new FormControl(this.data.days || [], Validators.required)
    });

    //TODO see if change detection ref will prevent error, although the error doesn;t actually cause problems

    this.isEdit = !(Object.keys(this.data).length === 0 && this.data.constructor === Object);
  }

  ngOnInit() {
  }

  sendData(data) {
    let start = data.start;
    let [sH, sM] = start.split(':');
    let end = data.end;
    let [eH, eM] = end.split(':');
    data._start = new Date().setHours(sH,sM);
    data._end = new Date().setHours(eH,eM);
    data.daysAbbrev = Object["values"](data.days).map((day) => {
      if (day == 'Thursday') {
        return 'Th';
      } else if (day == 'Saturday') {
        return 'Sa';
      } else if (day == 'Sunday') {
        return 'Su';
      } else {
        return day[0];
      }
    });

    this.dialogRef.close(data);
  }

}
