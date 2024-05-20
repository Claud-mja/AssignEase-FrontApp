import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor(private notif : NotificationService , private router : Router , private authService : AuthService , private http : HttpClient) { }

  makeFileUniqueName(fileName : string){
    return Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + fileName.trim();
  }

  handleError(status : number , message : string , title : string){
    if (status > 400 && status < 500 ) {
      this.notif.showWarning("Authentification requis",title);
      this.authService.logout();
      this.router.navigate(['login']);
    }else{
      this.notif.showWarning(message,title);
    }
  }
  
  handleImageError(event: Event, section : string): void {
    const imagHtml = event.target as HTMLImageElement;
    imagHtml.src = this.defaultImage(section);
  }

  defaultImage(section : string){
    let defaultImageUrl = "assets/images";
    switch(section){
      case 'auteur':
        defaultImageUrl = `${defaultImageUrl}/etu.png`;
        break;
      case 'professeur':
        defaultImageUrl = `${defaultImageUrl}/prof.png`;
        break;
      case 'matiere':
        defaultImageUrl = `${defaultImageUrl}/matiere.png`;
        break;
    }
    return defaultImageUrl;
  }

  imageExists(url: string) {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  

}
