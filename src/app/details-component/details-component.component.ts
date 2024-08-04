import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { StatesResult } from '../models/states.model';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrl: './details-component.component.css'
})
export class DetailsComponent {
  constructor(public dialogRef: MatDialogRef<DetailsComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getAvatar(fileName: string):string {
    fileName = fileName? fileName : 'avatar.png';
    return `/assets/images/${fileName}`;
  }

  getInitials(fullName: string): string {
    if(fullName != 'Otros') {
      const parts = fullName.split(' ');
      const initials = parts.map(part => part.charAt(0).toUpperCase());
      return initials.join('.');

    } else {
      return fullName;
    }
  }
}
