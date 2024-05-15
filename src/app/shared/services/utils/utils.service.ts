import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor(private notif : NotificationService , private router : Router) { }

  makeFileUniqueName(fileName : string){
    return Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + fileName.trim();
  }

  handleError(status : number , message : string , title : string){
    if (status > 400 && status < 500 ) {
      this.notif.showWarning("Authentification requis",title);
      this.router.navigate(['login']);
    }else{
      this.notif.showWarning(message,title);
    }
  }

}
