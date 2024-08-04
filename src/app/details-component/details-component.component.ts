import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { StatesResult } from '../models/states.model';
import { flush } from '@angular/core/testing';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrl: './details-component.component.css'
})
export class DetailsComponent implements OnInit {
  paths: any[]= [];
  state: number = 0;

  constructor(
    private resultsService : ResultsService,
    public dialogRef: MatDialogRef<DetailsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data) {
      this.paths.push(this.data);
      console.log(this.paths);
    }
  }

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

  getBreadcrumbs():string[] {
    let breadcrumbs = [''];
    return breadcrumbs
  }

  setCurrentDetails(id:string):void {
    let currentResult = {
      mainResults: null as unknown as StatesResult,
      dependencyResults: [] as StatesResult[],
    }

    let mainResults = this.paths[this.state].dependencyResults.filter((x: { id: string; })=> x.id === id);

    currentResult.mainResults = mainResults[0];
    

    switch (this.state) {
      case 0: 
        this.resultsService
          .getParishResults()
          .subscribe((response: StatesResult[]) => {
            currentResult.dependencyResults = response.filter((x) => currentResult.mainResults.dependency.includes(x.id)); 
            this.paths.push(currentResult);
            this.state++;
          });
      break;
      case 1:
        break;
      case 2:
        break;
    }    
  }
}
