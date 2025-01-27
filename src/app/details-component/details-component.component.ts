import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatesResult } from '../models/states.model';
import { flush } from '@angular/core/testing';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrl: './details-component.component.css',
})
export class DetailsComponent implements OnInit{
  @ViewChild('breadcrumbsRef', { static: true }) breadcrumbsRef!: ElementRef;
  paths: any[] = [];
  state: number = 0;
  breadcrumbsArray: string[] = [];
  dependencyTitle = ['Municipios', 'Parroquias', 'Centros', 'Mesas'];
  file: string = '';
  constructor(
    private resultsService: ResultsService,
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.paths.push(this.data);
      this.updateBreadcrumbs();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getAvatar(fileName: string): string {
    fileName = fileName ? fileName : 'avatar.png';
    return `/assets/images/${fileName}`;
  }

  getInitials(fullName: string): string {
    if (fullName != 'Otros') {
      const parts = fullName.split(' ');
      const initials = parts.map((part) => part.charAt(0).toUpperCase());
      return initials.join('.');
    } else {
      return fullName;
    }
  }

  updateBreadcrumbs(): void {
    let breadcrumbs = [] as string[];
    this.paths.forEach((path) => {
      breadcrumbs.push(path.mainResults.name);
    });
    this.breadcrumbsArray = breadcrumbs;
  }

  setCurrentDetails(id: string): void {
    let currentResult = {
      mainResults: null as unknown as StatesResult,
      dependencyResults: [] as StatesResult[],
    };

    let mainResults = this.paths[this.state].dependencyResults.filter(
      (x: { id: string }) => x.id === id
    );

    currentResult.mainResults = mainResults[0];

    switch (this.state) {
      case 0:
        this.resultsService
          .getParishResults()
          .subscribe((response: StatesResult[]) => {
            currentResult.dependencyResults = response.filter((x) =>
              currentResult.mainResults.dependency.includes(x.id)
            );
          });
        break;
      case 1:
        this.resultsService
          .getCenterResults()
          .subscribe((response: StatesResult[]) => {
            currentResult.dependencyResults = response.filter((x) =>
              currentResult.mainResults.dependency.includes(x.id)
            );
            let dr = [] as StatesResult[];
            currentResult.dependencyResults.forEach((result) => {
              let index = currentResult.mainResults.dependency.findIndex(
                (x) => x === result.id
              );
              result.name = currentResult.mainResults.dependencyNames[index];
              dr.push(result);
            });
            currentResult.dependencyResults = dr;
          });
        break;
      case 2:
        this.resultsService
          .getTableResults()
          .subscribe((response: StatesResult[]) => {
            currentResult.dependencyResults = response.filter((x) =>
              currentResult.mainResults.dependency.includes(x.id)
            );
            let dr = [] as StatesResult[];
            currentResult.dependencyResults.forEach((result) => {
              let index = currentResult.mainResults.dependency.findIndex(
                (x) => x === result.id
              );
              result.name = `MESA ${currentResult.mainResults.dependencyNames[index]}`;
              dr.push(result);
            });
            currentResult.dependencyResults = dr;
            currentResult.dependencyResults =
              currentResult.dependencyResults.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              });
          });
        break;
      case 3:
        this.file = currentResult.mainResults.dependency[0];
        break;
    }
    this.paths.push(currentResult);
    this.state++;
    this.updateBreadcrumbs();
  }

  goBack(): void {
    if (this.state > 0) {
      this.state--;
      this.paths.pop();
      this.breadcrumbsArray.pop();
    } else {
      this.onClose();
    }
  }

  onBreadcrumbClick(state: number): void {
    if (state != this.state) {
      let pathLength = this.paths.length;
      for (let i = state + 1; i < pathLength; i++) {
        this.paths.pop();
        this.breadcrumbsArray.pop();
      }
      this.state = state;
    }
  }
}
