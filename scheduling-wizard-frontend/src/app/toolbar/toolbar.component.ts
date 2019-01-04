import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global/global.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {
  }

}
