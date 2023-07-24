import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { EanWrapper } from 'src/app/class/ean-wrapper';

@Component({
  selector: 'app-barcode-renderer',
  templateUrl: './barcode-renderer.component.html',
  styleUrls: ['./barcode-renderer.component.css']
})
export class BarcodeRendererComponent implements AfterViewInit {

  @ViewChild('barcodeContainer', { static: true })
  barcodeCanvas!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D | null;

  ngAfterViewInit(): void {
    this.context = this.barcodeCanvas.nativeElement.getContext('2d');
    const myEan = new EanWrapper("3666154117284")
    this.showBarcode(myEan)
  }

  showBarcode(ean:EanWrapper) {
    if (this.context) {
      const mask = ean.getMaskStyle()
      for (let index = 0; index < ean.barcodeValue.length; index++) {
        if (ean.barcodeValue[index] == "1" && mask[index] == "0") {
            this.drawLine(this.context, [25 + 5*index, 100], [25 + 5*index, 300], "black", 5);
        } else if (ean.barcodeValue[index] == "1" && mask[index] == "1"){
          this.drawLine(this.context, [25 + 5*index, 100], [25 + 5*index, 350], "black", 5);
        }
      }
      this.context.font = '48px serif'; 
      var firstPart = ean.eanValue.substring(0,4)
      var secondPart = ean.eanValue.substring(4)
      var partLen = 4
      if (ean.eanValue.length == 13) {
        this.context.fillText(ean.eanValue[0], 0,350)
        firstPart = ean.eanValue.substring(1,7)
        secondPart = ean.eanValue.substring(7)
        partLen = 6
      }
      for (let index = 0; index < firstPart.length; index++) {
        this.context.fillText(firstPart[index], 40 + index*35,350)
      }

      for (let index = 0; index < secondPart.length; index++) {
        this.context.fillText(secondPart[index], 40 + 25 + partLen*5*7 + index*35,350)
      }
    }
  }

  drawLine(ctx:CanvasRenderingContext2D, begin: number[], end:number[], stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(begin[0],begin[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.stroke();
}

}
