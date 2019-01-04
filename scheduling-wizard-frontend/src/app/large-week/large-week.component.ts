import { Component, OnInit, Input } from '@angular/core';
import { customEvent, searchOption } from '../home/home.component';
import { Classes } from '../services/classes/classes';
import { isNumber } from 'util';

@Component({
  selector: 'app-large-week',
  templateUrl: './large-week.component.html',
  styleUrls: ['./large-week.component.css']
})
export class LargeWeekComponent implements OnInit {

  displayInfo(s) {
    console.log(s, this.scheduleHeight);
  }

  hours = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'];
  
  minDiff = 6 * 60 // 6:00 am is our baseline

  scheduleHeight = this.hours.length * 60;

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

  @Input('classes') classes: Classes[] = [];
  @Input('selectedClasses') selectedClasses: searchOption[] = [];
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
            color: this.getColor(c.course),
            name: `${c.course} ${c.section}`
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
