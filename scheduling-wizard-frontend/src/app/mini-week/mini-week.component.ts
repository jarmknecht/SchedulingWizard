import { Component, OnInit, Input } from '@angular/core';
import { isNumber } from 'util';
import { customEvent } from '../home/home.component';

@Component({
  selector: 'app-mini-week',
  templateUrl: './mini-week.component.html',
  styleUrls: ['./mini-week.component.css']
})
export class MiniWeekComponent implements OnInit {

  hours = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // schedule = {
  //   'Monday': [8,10],
  // }

  minDiff = 6 * 60 // 8:00 am is our baseline

  scheduleHeight = this.hours.length * 60;
  scheduleTop = 13.5;
  scheduleBottom = 1.3;

  schedule = [
    [],
    [],
    [],
    [],
    []
  ];

  week = [
    {
      name: 'Monday',
      code: 0
    },
    {
      name: 'Tuesday',
      code: 1
    },
    {
      name: 'Wednesday',
      code: 2,
    },
    {
      name: 'Thursday',
      code: 3
    },
    {
      name: 'Friday',
      code: 4
    },
  ];

  codes = {
    'monday': 0,
    'tuesday': 1,
    'wednesday': 2,
    'thursday': 3,
    'friday': 4
  }

  weekAbbrev = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ];

  colors = {}

  @Input('classes') classes = [];
  @Input('selectedClasses') selectedClasses = []; 
  @Input('customEvents') customEvents: customEvent[] = [];

  constructor() { }

  ngOnInit() {
    this.selectedClasses.forEach((s) => {
      this.colors[s.course] = s.color;
    });

    this.classes.forEach((c) => {
      if (!!c.classes) {
        Object.keys(c.classes).forEach((key) => {
          this.schedule[this.codes[key]].push({
            start: this.toMinutes(c.classes[key].start),
            end: this.toMinutes(c.classes[key].end),
            color: this.getColor(c.course)
          });
        });
      }
    });

    this.customEvents.forEach((cE) => {
      let keys = Object["values"](cE.days);

      keys.forEach((_key) => {
        let key = (_key as any).toLowerCase();
        this.schedule[this.codes[key]].push({
          start: this.milliToMin(cE._start),
          end: this.milliToMin(cE._end),
          color: 'rgb(200,200,200)',
          name: cE.name
        });
      });
    });

    console.log(this.schedule);
  }

  toMinutes(_date: string | number) {
    if (isNumber(_date)) {
      return (_date as number) - this.minDiff;
    }

    let date = new Date(_date);
    return 60 * date.getHours() + date.getMinutes() - this.minDiff;
  }

  getColor(course) {
    return this.colors[course];
  }

  milliToMin(_date: number) {
    let date = new Date(_date);
    return 60 * date.getHours() + date.getMinutes() - this.minDiff;
  }

}
