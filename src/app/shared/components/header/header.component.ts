import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldValue, HeaderConfig } from '../../interfaces/Header-config';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() haveSearch : boolean = false;
  @Input() haveSubTitle : boolean = false;
  @Input() config !: HeaderConfig;
  @Input() headTitle !: any;

  @Output() filterClickEvent : EventEmitter<HeaderConfig> = new EventEmitter<HeaderConfig>();

  fields: { name: string, type: string }[] = [];
  currentField !: FieldValue;
  valueFilter : any;
  isChoiceFilterVisible : boolean = false;


  selectOption :  any = {
    number : [
      { label : 'Plus petit d\'abord' , value : 1 },
      { label : 'Plus grand d\'abord' , value : -1 },
    ],
    date : [
      { label : 'Plus récent d\'abord' , value : -1 },
      { label : 'Plus ancient d\'abord' , value : 1 },
    ],
    boolean : [
      { label : 'Oui' , value : true },
      { label : 'Non' , value : false },
    ]
  }

  constructor(private el : ElementRef){}

  ngOnInit(): void {

    if (this.config) {
      this.initFilter();
    }
  }


  initFilter(){
    this.currentField = this.config.fields[0];
  }

  onChoiseFilter(field : FieldValue){
    this.currentField = field;
    this.valueFilter = null;
    this.onMakeFilter();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const idBtn  = target.parentElement?.id
 
    if(idBtn && idBtn ==='btnFilter'){
      this.isChoiceFilterVisible = !this.isChoiceFilterVisible;
    }else{
      this.hideChoiceFilter();
    }
  }


  private hideChoiceFilter() {
    this.isChoiceFilterVisible = false;
  }

  onMakeFilter(){
    const fieldData = this.currentField;
    if (fieldData.type=="number" || fieldData.type=="date") {
      this.config.sorts = [];
      this.config.filters = [];
      if(this.valueFilter!=null){
        const index = this.config.sorts.findIndex(sort => sort.field == fieldData.name);
        if (index!=-1) {
          this.config.sorts[index].value = this.valueFilter;
        }
        this.config.sorts.push({
          field : fieldData.name , value : this.valueFilter
        })
      }else{
        this.config.sorts = [];
      }
    }else {
      this.config.sorts = [];
      this.config.filters = [];
      if(this.valueFilter!=null){
        const index = this.config.filters.findIndex(filter => filter.field == fieldData.name);
        if (index!=-1) {
          this.config.filters[index].value = this.valueFilter;
        }
        this.config.filters.push({
          field : fieldData.name , value : this.valueFilter
        })
      }else{
        this.config.filters = [];
      }
    }
    this.filterClickEvent.emit(this.config);
  }


}
