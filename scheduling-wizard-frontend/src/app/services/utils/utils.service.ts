import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { LoaderComponent } from '../../loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private dialog: MatDialog, private overlay: Overlay) { }

  displayLoader(message?: string, autoclose = true, duration = 2000): MatDialogRef<LoaderComponent, any> {
    let dialogRef = this.dialog.open(LoaderComponent, {
      data: { message: message },
      minHeight: '100px',
      minWidth: '250px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    if(autoclose) {
      setTimeout(() => {
        dialogRef.close();
      }, duration)
    } else {
      return dialogRef; 
    }
  }

  displayDialog(component: ComponentType<any>, data, config: MatDialogConfig = {}) {
    config.data = data;
    const dialogRef = this.dialog.open(component, config);

    return dialogRef;
  }
}
