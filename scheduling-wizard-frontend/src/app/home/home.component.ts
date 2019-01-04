import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from '../services/global/global.service';
import { ClassesService } from '../services/classes/classes.service';
import { Classes } from '../services/classes/classes';
import { isNull } from 'util';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, debounceTime, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDrawer } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UtilsService } from '../services/utils/utils.service';
import { CustomEventDialogComponent } from '../custom-event-dialog/custom-event-dialog.component';
import { ViewScheduleComponent } from '../view-schedule/view-schedule.component';
import { MakeSchedulesService } from '../services/make-schedules/make-schedules.service';

export declare type searchOption = {
  course: string,
  courseName: string,
  color: string
}

export declare type customEvent = {
  name: string,
  start: Date,
  end: Date,
  days: {
    Sunday?: boolean,
    Monday?: boolean,
    Tuesday?: boolean,
    Wednesday?: boolean,
    Thursday?: boolean,
    Friday?: boolean,
    Saturday?: boolean,
  },
  _start?: number,
  _end: number
}

const COLORS = [
  '#ffcc80',
  '#ef9a9a',
  '#a5d6a7',
  '#fff59d',
  '#90caf9',
  '#ce93d8',
  '#80deea',
  '#e6ee9c',
  '#ffab91',
  '#ffe082',
  '#b0bec5',
  '#bcaaa4',
  '#b2dfdb'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('classInput') classInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  //@ViewChild('drawer') matDrawer: MatDrawer;
  
  public classes: Classes[] = [];
  private classScheduleChoices = [];
  public selectedClasses: searchOption[] = [];
  public customEvents: customEvent[] = [];

  public hasSearched = false;

  public displaySideDrawer = false;

  myControl = new FormControl();
  options: searchOption[] = [];
  filteredClasses: Observable<searchOption[]>;

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  schedules = [];
  
  constructor(public global: GlobalService, private classesService: ClassesService, private utils: UtilsService, private makeSchedule: MakeSchedulesService) { }

  ngOnInit() {
    this.getClasses().then(() => {
      console.log(this.classes);

      this.options = this.createSearchOptions() as any;

      this.filteredClasses = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  
  async getClasses() {
    return new Promise((resolve, reject) => {
      this.classesService.getClasses().subscribe((classes) => {
        this.classes = classes;
        resolve(true);
      });
    });
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      console.log(event);
      // const input = event.input;
      // const value = event.value;

      // // Add our fruit
      // if ((value || '').trim()) {
      //   this.fruits.push(value.trim());
      // }

      // // Reset the input value
      // if (input) {
      //   input.value = '';
      // }

      // this.fruitCtrl.setValue(null);
    }
  }

  remove(option: searchOption): void {
    const index = this.selectedClasses.indexOf(option);

    if (index >= 0) {
      this.selectedClasses.splice(index, 1);
      this.options.push(option);
      this.options.sort((a,b) => {
        return (a.course < b.course)? -1 : 1;
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let OPTION = event.option.value;
    if (!this.selectedClasses.includes(OPTION)) {
      const index = this.options.indexOf(OPTION);
      this.options.splice(index, 1);

      OPTION.color = COLORS[this.selectedClasses.length % COLORS.length];

      this.selectedClasses.push(OPTION);
    }
    this.classInput.nativeElement.value = '';
    this.myControl.setValue('');
  }

  addEvent() {
    this.utils.displayDialog(CustomEventDialogComponent, {}).afterClosed().subscribe((result) => {
      if (!!result) {
        this.customEvents.push(result);
      }
    });
  }

  editEvent(data: customEvent) {
    this.utils.displayDialog(CustomEventDialogComponent, data).afterClosed().subscribe((result) => {
      const index = this.customEvents.indexOf(data);

      if (index > -1 && !!result) {
        this.customEvents[index] = result;
      }
    });
  }

  deleteEvent(data: customEvent) {
    const index = this.customEvents.indexOf(data);

    if (index > -1) {
      this.customEvents.splice(index,1);
    }
  }

  generateSchedules() {
    let loading = this.utils.displayLoader('Generating Schedules ...', false);

    this.classScheduleChoices = this.makeSchedule.generate(this.classes, this.selectedClasses, this.customEvents);

    setTimeout(() => {
      loading.close();
      this.hasSearched = true;
      //this.matDrawer.open();
      this.displaySideDrawer = true;
      //this.schedules = [0, 1, 2, 3, 4, 5, 6, 7];
      this.schedules = this.classScheduleChoices.map((s) => {
        s = s.filter((c) => {
          return !!c;
        });
        return {
          classes: s
        }
      });
    }, 1000);
  }

  viewSchedule(schedule, i) {
    schedule.selectedClasses = this.selectedClasses;
    schedule.index = i;
    this.utils.displayDialog(ViewScheduleComponent, { schedule: schedule, customEvents: this.customEvents, selectedClasses: this.selectedClasses }, {
      minWidth: '80vw',
      minHeight: '80vh',
      maxWidth: '80vw',
      maxHeight: '80vh'
    });
  }

  private _filter(value: string | searchOption): searchOption[] {
    let filterValue;

    if (!!(value as searchOption).course) {
      filterValue = (value as searchOption).course.replace(/ /g, '');
    } else {
      filterValue = (value as string).toUpperCase().replace(/ /g, '');
    }

    return this.options.filter((option) => {
      return option.courseName.toUpperCase().replace(/ /g, '').includes(filterValue) || option.course.replace(/ /g, '').includes(filterValue);
    });
  }

  private createSearchOptions() {
    let classNames = {};

    this.classes.forEach((option) => {
      if (!classNames[option.course]) {
        classNames[option.course] = {
          course: option.course,
          courseName: option.courseName
        }
      }
    });

    return Object["values"](classNames);
  }

  displayFn(option: searchOption) {
    if (option) { return option.course; }
  }
}
