import { Component, OnInit, Input } from '@angular/core';
import { Classes } from '../services/classes/classes';
import { searchOption } from '../home/home.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.css']
})
export class ClassTableComponent implements OnInit {

  @Input('dataSource') dataSource: Classes[];
  @Input('selectedClasses') selectedClasses: searchOption[] = [];

  colors = {};
  secondaryColors = {};

  displayedColumns: string[] = ['course', 'section', 'instructor', 'days', 'start', 'end', 'location'];
  
  constructor() {}

  ngOnInit() {
    this.selectedClasses.forEach((s) => {
      this.colors[s.course] = s.color;
      this.secondaryColors[s.course] = this.addAlpha(s.color, 0.5);
    });

    this.dataSource.forEach((value) => {
      value.days = value.days.replace(/(\u21b5|\n)/g, "<br>");
      value.start = value.start.replace(/(\u21b5|\n)/g, "<br>");
      value.end = value.end.replace(/(\u21b5|\n)/g, "<br>");
      value.location = value.location.replace(/(\u21b5|\n)/g, "<br>");
    });
    console.log(this.dataSource);
  }

  getColor(course) {
    return this.colors[course];
  }

  getSecondaryColor(course) {
    return this.secondaryColors[course];
  }

  addAlpha(hex, alpha) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 20)}, ${alpha})`;
  }
}
