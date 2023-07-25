import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barcodeViewerAngular';
  possibleEan = "";
  @ViewChild('barcodeForm') barcodeForm!: NgForm;

  onSubmit() {
    console.log(this.barcodeForm.value)
    this.possibleEan = this.barcodeForm.value.Ean
  }
}
