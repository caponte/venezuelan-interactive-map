import { Component, Inject, Input, NgZone } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { StatesResult } from '../models/states.model';
import { ResultsService } from '../services/results.service';
import { DetailsComponent } from '../details-component/details-component.component';

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrl: './state-modal.component.css',
})
export class StateModalComponent {
  dependency: StatesResult[] = [];
  constructor(
    private zone: NgZone,
    private dialog: MatDialog,
    private resultsService: ResultsService,
    public dialogRef: MatDialogRef<StateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StatesResult
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getAvatar(fileName: string): string {
    fileName = fileName ? fileName : 'avatar.png';
    return `/assets/images/${fileName}`;
  }

  openMunicipalityModal(): void {
    this.onClose();
    this.resultsService
      .getMunicipalityResults()
      .subscribe((response: StatesResult[]) => {
        response = response.filter((x) => this.data.dependency.includes(x.id));
        this.dependency = response;
        let results = {
          mainResults: this.data,
          dependencyResults: this.dependency,
        };
        this.zone.run(() => {
          const dialogRef = this.dialog.open(DetailsComponent, {
            data: results,
            position: { top: '80px', right: '20px' },
            panelClass: 'municipality-modal-container',
          });

          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
          });
        });
      });
  }
}
