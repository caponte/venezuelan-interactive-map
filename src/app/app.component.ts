import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InteractiveMapComponent } from "./interactive-map/interactive-map.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InteractiveMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Interactive Venezuelan Map';
}
