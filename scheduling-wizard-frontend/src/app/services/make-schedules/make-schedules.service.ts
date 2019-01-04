import { Injectable } from '@angular/core';
import { searchOption, customEvent } from '../../home/home.component';
import { Classes } from '../classes/classes';
import { isNumber } from 'util';

const MS_HALF_MIN = 15 * 1000;

const SLC = 'SALT LAKE';

declare type range = {
  start: number,
  end: number
}

@Injectable({
  providedIn: 'root'
})
export class MakeSchedulesService {

  constructor() { }

  generate(classes: Classes[], selectedClasses: searchOption[], customEvents: customEvent[]) {
    let startTime = new Date();
    let endTime = new Date(startTime.getTime() + MS_HALF_MIN);
    
    //Convert date times to minutes; 0 is the start of the day; 23 * 12 + 59 =335 is the end.
    classes = classes.map((_class) => {
      Object.keys(_class.classes).forEach((key) => {
        _class.classes[key].start = this.toMinutes(_class.classes[key].start)
        _class.classes[key].end = this.toMinutes(_class.classes[key].end)
        if (_class.classes[key].start == 0) {
          debugger;
          console.log('invalid time set');
        }
      });
      return _class;
    });

    //Get a list of identifiers by course only
    let courses = selectedClasses.map((val) => {
      return val.course;
    });

    let coursesObj = {}
    courses.forEach((course) => {
      coursesObj[course] = [];
    });

    //Each entry of coursesObj is an array containing all class sections of a given course
    this.partitionClasses(coursesObj, classes);

    // get rid of all individual classes that conflict with our custom events, or that have no time yet or that are in SLC
    Object.keys(coursesObj).forEach((key) => {
      coursesObj[key] = coursesObj[key].filter((_class) => {
        if (_class.start == 'TBA' || _class.start == 'TBD' || _class.sectionType == SLC) {
          return false;
        }
        for (let i = 0; i < customEvents.length; i++) {
          if (this.eventClassConflict(customEvents[i], _class)) {
            return false;
          }
        }

        return true; //no conflict
      });
    });

    //Now we have a list of sections for each selected course that don't conflict with the customEvents
    let potentialSchedules = [];

    let coursesArr: [][] = Object['values'](coursesObj);

    let divisors = [];

    for (let i = coursesArr.length - 1; i >= 0; i--) {
      divisors[i] = divisors[i+1]? divisors[i+1] * coursesArr[i+1].length : 1;
    }

    let combinations = (() => {
      let product = 1;
      coursesArr.forEach((val) => {
        product *= Math.max(val.length, 1);
      });
      return product;
    })();

    for (let i = 0; i < combinations; i++) {
      let schedule = [];
      for (let j = 0; j < coursesArr.length; j++) {
        schedule.push(coursesArr[j][Math.floor(i / divisors[j]) % coursesArr[j].length]);
      }
      if (this.isValidSchedule(schedule)) {
        potentialSchedules.push(schedule);
        if (potentialSchedules.length > 50 || (new Date() > endTime)) {
          return potentialSchedules;
        }
      }
    }

    console.log(potentialSchedules);

    return potentialSchedules;

  }

  private isValidSchedule(schedule: Classes[]) {
    for (let i = 0; i < schedule.length; i++) {
      for (let j = i; j < schedule.length; j++) {
        if (i === j) {
          continue;
        }
        if (this.classesConflict(schedule[i], schedule[j])) {
          return false;
        }
      }
    }

    return true;
  }

  private classesConflict(c1: Classes, c2: Classes) {
    if (!c1 || !c2) {
      return false;
    }
    const keys = Object.keys(c1.classes);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (this.conflictsWith(c1.classes[key], c2.classes[key])) {
        return true;
      }
    }
    return false;
  }

  private toMinutes(_date: string | number) {
    if (isNumber(_date)) {
      return _date;
    }

    let date = new Date(_date);
    return 60 * date.getHours() + date.getMinutes();
  }

  private milliToMin(_date: number) {
    let date = new Date(_date);
    return 60 * date.getHours() + date.getMinutes();
  }

  private partitionClasses(coursesObj: any, classes: Classes[]) {
    classes.forEach((_class) => {
      if (!!coursesObj[_class.course]) {
        coursesObj[_class.course].push(_class);
      }
    });
  }

  private eventClassConflict(cE: customEvent, c: Classes) {

    const cEDays = Object['values'](cE.days) as any;

    for (let i = 0; i < cEDays.length; i++) {
      let key = cEDays[i].toLowerCase();
      let _c = c.classes[key];
      if (!!_c && _c.start) {
        if (this.conflictsWith({ start: this.milliToMin(cE._start), end: this.milliToMin(cE._end) }, _c)) {
          return true;
        }
      }
    }

    return false;
  }

  private conflictsWith(t1: range, t2: range) {
    if (!!t1 && typeof t1.start !== 'undefined' && (!t2 || typeof t2.start == 'undefined')) {
      return false;
    } else if (!!t2 && typeof t2.start !== 'undefined' && (!t1 || typeof t1.start == 'undefined')) {
      return false;
    }

    if (t1.start <= t2.start) {
      return t1.end > t2.start;
    } else { //if t2.start < t1.start
      return t2.end > t1.start;
    }
  }
}
