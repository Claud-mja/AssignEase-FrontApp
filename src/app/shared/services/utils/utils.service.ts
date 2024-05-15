import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor() { }

  makeFileUniqueName(fileName : string){
    return Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + fileName.trim();
  }

}
