import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr : ToastrService , private _snackBar: MatSnackBar) { }

  showSuccess(message : string,title : string) {
    this.toastr.success(message, title);
  }

  showError(message : string,title : string){
    this.toastr.error(message, title);
  }

  showWarning(message : string,title : string){
    this.toastr.warning(message, title);
  }

  showInfo(message : string,title : string){
    this.toastr.info(message, title);
  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, undefined, {
      duration: duration,
    });
  }

}
