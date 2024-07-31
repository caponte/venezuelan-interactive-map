import { Component } from '@angular/core';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css'
})
export class InteractiveMapComponent {

  OnSelectState( state:string ): void{
    console.log(state);
  }
}
