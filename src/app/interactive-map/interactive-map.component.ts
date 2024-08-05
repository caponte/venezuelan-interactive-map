import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateModalComponent } from '../state-modal/state-modal.component';
import { ResultsService } from '../services/results.service';
import { StatesResult } from '../models/states.model';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css'
})
export class InteractiveMapComponent implements OnInit{
  results: StatesResult[] = []
  constructor(
    private zone: NgZone, 
    private dialog: MatDialog,
    private resultsService: ResultsService,
  ) {}


  ngOnInit(): void {
      this.resultsService.getResults().subscribe((results: StatesResult[]) => { this.results = results });
  }

  openStateModal(stateName:string): void {
   let stateData = []

   stateData = this.results.filter(state => state.name === stateName);
    this.zone.run(() => {
      const dialogRef = this.dialog.open(StateModalComponent,{data: stateData[0], panelClass: 'state-modal-container'});

      dialogRef.afterClosed().subscribe(result => {
      });
    });
  }
}
