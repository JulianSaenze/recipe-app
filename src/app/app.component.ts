import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';
  showComponent = true;
  inputValue = 123; 

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
