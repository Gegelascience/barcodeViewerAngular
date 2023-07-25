import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barcodeViewerAngular';
  possibleEan = "";

  showEan() {
    this.possibleEan = "3666154117284"
  }
}
