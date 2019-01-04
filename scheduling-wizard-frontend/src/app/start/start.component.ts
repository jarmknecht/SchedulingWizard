import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global/global.service';
import { UtilsService } from '../services/utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(public global: GlobalService, public utils: UtilsService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    let dialogRef = this.utils.displayLoader("Please wait...", false);

    setTimeout(() => {
      dialogRef.close();
      this.router.navigateByUrl('/home');
    }, 1000);
  }

}
