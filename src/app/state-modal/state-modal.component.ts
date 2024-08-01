import { Component, Inject, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { StatesResult } from '../models/states.model';

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrl: './state-modal.component.css',
})
export class StateModalComponent {
  constructor(public dialogRef: MatDialogRef<StateModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: StatesResult) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getAvatar(fileName: string):string {
    fileName = fileName? fileName : 'avatar.png';
    return `/assets/images/${fileName}`;
  }
}
