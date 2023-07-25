import { Component, ElementRef, ViewChild, AfterViewInit, Input, SimpleChanges } from '@angular/core';
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
  @Input() possibleEan: string = "";
  errorMsg ="";

  ngAfterViewInit(): void {
    this.context = this.barcodeCanvas.nativeElement.getContext('2d');
    try {
      const myEan = new EanWrapper(this.possibleEan)
      this.showBarcode(myEan)
    } catch (error:any) {
      this.errorMsg =error
    }
    
  }
  
  ngOnChanges(changes:SimpleChanges) {
    console.log(changes)
    if(this.context && changes['possibleEan']  && changes['possibleEan'].currentValue != undefined) {
      try {
        this.showBarcode(new EanWrapper(changes['possibleEan'].currentValue))
      } catch (error:any) {
        this.errorMsg =error
      }
      
    }
  }

  showBarcode(ean:EanWrapper) {
    if (this.context) {
      this.context.clearRect(0, 0, 525, 400);
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

  savePng() {
    const pngUrl =this.barcodeCanvas.nativeElement.toDataURL();
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "barcode.png";
    link.click();
  }

  saveSvg() {
    const myEan = new EanWrapper(this.possibleEan);
    const svgEl = this.generateSvgElement(myEan);

    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svgEl);

    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    source = '<?xml version="1.0" encoding="utf-8"?>\r\n' + source;

    //convert svg source to URI data scheme.
    var svgurl = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

    const link = document.createElement("a");
    link.href = svgurl;
    link.download = "barcode.svg";
    link.click();
  }

  generateSvgElement(eanW: EanWrapper) {
    const barcodeValue = eanW.barcodeValue;
    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg",'svg')
    svgContainer.setAttribute("version","1.1")
    svgContainer.setAttribute("baseProfile","full")
    svgContainer.setAttribute("width","700")
    svgContainer.setAttribute("height","200")
    

    const gContainer = document.createElementNS('http://www.w3.org/2000/svg','g');
    gContainer.setAttribute("stroke","black")
    let index = 10;
    for (let indexB = 0; indexB < barcodeValue.length; indexB++) {
        if (barcodeValue[indexB] == "1"){
            const lineContainer = document.createElementNS('http://www.w3.org/2000/svg','line');
            lineContainer.setAttribute("stroke-width","4")
            lineContainer.setAttribute("y1","10")
            lineContainer.setAttribute("x1",index.toString())
            lineContainer.setAttribute("y2","50")
            lineContainer.setAttribute("x2",index.toString())
            gContainer.appendChild(lineContainer)
        }
        index = index + 4
    };


    svgContainer.appendChild(gContainer)

    return svgContainer
  }

}
