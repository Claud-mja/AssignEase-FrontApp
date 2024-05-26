import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilesDragDropDirective } from '../../directives/files-drag-drop.directive';
import { UtilsService } from '../../services/utils/utils.service';

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


  constructor(private utilsService : UtilsService) { }

  ngOnInit() {
    
  }

  triggerParentFunction(event: any){
    this.onTraitFiles(event)
  }

  onChangeDataFile(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onTraitFiles(input.files)
  }

  onTraitFiles(files : FileList | null){
    this.image_Uri = '';
    if (files && files.length > 0) {
        const file: File = files[0];
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

  onImageError(event: Event): void {
    this.utilsService.handleImageError(event , this.config.tools);
  }

} 
