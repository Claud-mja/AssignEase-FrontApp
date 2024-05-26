import { Component, Input, OnInit } from '@angular/core';
import { TableConfig } from '../../interfaces/table-config';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableService } from '../../services/table/table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/utils/notification.service';
import { TableModule } from 'primeng/table'
import { AvatarModule } from "primeng/avatar";
import { FieldValue } from '../../interfaces/Header-config';
import { environment } from '../../../../environments/environment';
import { MatButton} from '@angular/material/button'
import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';
import { UtilsService } from '../../services/utils/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-table-dynamic',
  standalone: true,
  imports: [
    TableModule,
    AvatarModule,
    MatButton,
    SpinnerComponent
  ],
  templateUrl: './table-dynamic.component.html',
  styleUrl: './table-dynamic.component.css'
})
export class TableDynamicComponent implements OnInit {

  @Input() config !: TableConfig;
  data !: Object[];
  nbElement : number = 0;
  loadingData : boolean = false;

  constructor(
      private tableService : TableService,
      private dialog : MatDialog ,
      private route : Router ,
      private utilsService : UtilsService,
      private notif : NotificationService){

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loadingData = true ;
    const success = (response : any)=>{
        this.data = response.docs ? response.docs : response;
        this.nbElement = this.data.length;
        this.loadingData = false ;
    }

    const error = (error : HttpErrorResponse)=>{
      this.notif.showWarning(error.message , "Get "+this.config.tools+" error")
      this.loadingData = false ;
    }
    this.tableService.getData(this.config).subscribe(success , error);
  }

  onDelete(data : any){
    if(!localStorage.getItem('token')){
      this.route.navigate(['/login']);
      return;
    }
    const success = (response  : any)=>{
      this.notif.showSuccess("Suppression de "+this.config.tools+" reussi !" , "Suppression "+this.config.tools);
      this.getData();
    }

    const error = (error : HttpErrorResponse)=>{
      this.notif.showWarning(error.message , "Delte "+this.config.tools+" error")
    }

    const dialogDelete = this.confirmdDialog();
    dialogDelete.afterClosed().subscribe((response)=>{
      if (response) {
        this.tableService.deleteData(this.config,data['_id']).subscribe(success , error);
      }
    })
  }

  onEdit(data : any){
    this.route.navigate([`edit-${this.config.tools}`, data["_id"]]);
  }

  onAdd(){
    this.route.navigate([`add-${this.config.tools}`]);
  }

  getDataWithtKey(field : FieldValue , data : any){
    if(field.type=='object'){
      const keySplit = field.name.split('.');
      let result : any = data;
      for (let index = 0; index < keySplit.length; index++) {
        const key = keySplit[index];
        result = result[key];
      }
      return result;
    }
    return data[field.name];
  }

  typeData(dataStr : string):string{
    const splitDataStr = dataStr.split('.');
    if(splitDataStr.length>1){
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
      const lastSplit = splitDataStr[splitDataStr.length-1];
      return imageExtensions.includes(lastSplit) ? 'img' : 'standard';
    }
    return 'standard';
  }

  img_uri(field : FieldValue , value : string){
    let uri = `${environment.baseUrlImg}`;
    return `${uri}/${this.getPathSection(field)}/${value}`;;
  }

  getPathSection(field : FieldValue){
    let pathParent : string = '';
    let pathName : string = this.config.tools;
    if (field.type=='object') {
      const hearchiesObject = field.name.split('.');
      pathName = hearchiesObject[hearchiesObject.length-2];
    }
    switch(pathName){
      case 'prof':
        pathParent = 'professeur';
        break;
      default:
        pathParent = this.config.tools;
        break;
    }
    return pathParent;
  }

  confirmdDialog() : MatDialogRef<ConfirmationComponent>{
    const modalref : MatDialogRef<ConfirmationComponent> = this.dialog.open(ConfirmationComponent ,
      {
        width: '600px',
        data : {
          title : "Suppression "+this.config.tools,
          message : "Cette action supprimera "+this.config.tools+" choisi, voulez-vous poursuivre?"
        }
      }
    )
    return modalref;
  }

  onImageError(event: Event, section : string): void {
    this.utilsService.handleImageError(event , section);
  }

}
