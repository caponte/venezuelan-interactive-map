import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { StatesResult } from '../models/states.model';

@Component({
  selector: 'app-bottom-component',
  templateUrl: './bottom-component.component.html',
  styleUrls: ['./bottom-component.component.css'],
})
export class BottomComponent implements OnInit{
  results: StatesResult[] = []
  isExpanded = false;
  constructor(
    private resultsService: ResultsService,
  ) {}
  ngOnInit(): void {
     this.resultsService.getNationalResults().subscribe((response: StatesResult[]) => { this.results = response; console.log(response);});

  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  getPercentage(percentage: string):number {
    percentage = percentage.replace('%','');
    return parseInt(percentage);
  }

  getAvatar(fileName: string):string {
    fileName = fileName? fileName : 'avatar.png';
    return `/assets/images/${fileName}`;
  }

  getIcon():string{
    let fileName = 'MINIMIZE.svg'
    if (!this.isExpanded){
      fileName = 'MAXIMIZE.svg'
    }
    return `/assets/images/${fileName}`;
  }

  getButtonLabel():string {
    return this.isExpanded ? 'Cerrar' : 'Expandir';
  }
}