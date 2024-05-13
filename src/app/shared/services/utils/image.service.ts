import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  img_uri !: string;

  constructor(private http : HttpClient) {
    this.img_uri = environment.baseUrlImg;
  }

  getImage(imageUrl : string){
    return this.http.get(`${this.img_uri}/${imageUrl}`);
  }

}
