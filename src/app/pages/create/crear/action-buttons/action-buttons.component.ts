import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-create-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {

  @Output() cleanEvent = new EventEmitter<void>();

  @Input() disableSend: boolean;
  @Output() createEvent = new EventEmitter<void>();

  @Input() disableValidation: boolean;
  @Output() validateEvent = new EventEmitter<void>();

  constructor(
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  validar():void {
    this.validateEvent.emit();
  }

  
  crear():void {
    this.confirmationService.confirm({
      message: 'Estas seguro de enviar las NEGOS?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createEvent.emit();
      },
      reject: () => {
      }
  });
  }

  limpiarData():void {
    this.cleanEvent.emit();
  }

}
