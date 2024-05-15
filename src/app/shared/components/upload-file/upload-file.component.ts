import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilesDragDropDirective } from '../../directives/files-drag-drop.directive';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    MatButtonModule,
    FilesDragDropDirective
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent implements OnInit {

  @ViewChild("fileInput" , { static : false }) fileInput: ElementRef | undefined;

  @Input() config : any;
  dataFileUpload : any;

  @Input() dataChecked : any;
  @Input() image_Uri !: string;

  @Output() fileRemoved: EventEmitter<void> = new EventEmitter<void>();
  @Output() fileChanged: EventEmitter<File> = new EventEmitter<File>();


  constructor() { }

  ngOnInit() {
    
  }

  triggerParentFunction(event: any){
    this.onChangeDataFile(event);
  }

  onChangeDataFile(event: any) {
    const file: File = event?.target?.files?.[0];
    this.image_Uri = '';
    if (file) {
        const fileType: string = file.type;

        if (fileType.startsWith('image/')) {
            this.dataFileUpload = file;
            this.dataChecked ={
                state: 'success',
                message: 'Successfully uploaded',
            }
        } else {
            this.dataFileUpload = null;
            this.dataChecked ={
                state: 'error',
                message: 'File format is not supported. Please select an image file.',
            }
        }
        this.fileChanged.emit(file);
    }
}



  onRemoveFile() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
      this.dataChecked.state = '';
      // Émettre l'événement de suppression du fichier vers le composant parent
      this.fileRemoved.emit();
    }
  }

  onImageError(event: Event, section : string): void {
    const imagHtml = event.target as HTMLImageElement;
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
    imagHtml.src = defaultImageUrl;
  }

} 
