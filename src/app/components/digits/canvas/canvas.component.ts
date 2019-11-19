import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, HostBinding
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
})

//<canvas id='raw-canvas' class="canvas-css" width='112' height='112' class="rounded border border"></canvas>
export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  @HostBinding('class.is-open')

  @Input() public width = 112;
  @Input() public height = 112;
  @Input() public height_scale = 1;
  @Input() public width_scale = 1;
  @Input() apple: String;
  @Input() draw: Boolean = false;


  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.className = 'canvas-css rounded border border';
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.cx.scale(this.width_scale, this.height_scale);
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    if (this.draw) {
      this.captureEvents(canvasEl);
    }

  }

  public clear() {
    console.log('clear2')
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  public updateImg(imgData, flat = false) {
    this.cx.putImageData(imgData, 0, 0);
  }

  public updateFromFlat(imgDataFlat) {
    var img = this.cx.getImageData(0, 0, this.width, this.height);
    var data = img.data;
    for (var i = 0; i < data.length; i++) {
      if ((i + 1) % 4 == 0) {
        data[i] = imgDataFlat[(i + 1) / 4] * 255;
      }
    }
    this.cx.putImageData(img, 0, 0);
  }

  public drawImage(imgData) {
    this.cx.clearRect(0, 0, this.width / this.width_scale, this.height / this.height_scale);
    this.cx.drawImage(imgData, 0, 0);
  }

  public getImg(sd = 0) {
    var img = this.cx.getImageData(0, 0, this.width, this.height)
    if (sd != 0) {
      var data = img.data
      for (var i = 0; i < data.length; i++) {
        var rnd = Math.min(data[i] + this.gaussianRand(sd) * 255, 255);
        if ((i + 1) % 4 == 0) {
          data[i] = rnd;
        }

      }
    }
    return img
  }

  public getImgRaw() {
    return this.canvas.nativeElement;
  }

  public printInfo() {
    console.log(this.canvas.nativeElement.height)
    console.log(this.canvas.nativeElement.width)
  }

  public getImgFlat(normalize = false) {
    var img = this.cx.getImageData(0, 0, this.width, this.height).data;
    var flat_image = [];
    for (var i = 3; i < img.length; i += 4) {
      if (normalize)
        img[i] > 0 ? flat_image.push(img[i] / 255) : flat_image.push(0)
      else
        img[i] > 0 ? flat_image.push(img[i]) : flat_image.push(0)
    }
    return flat_image;
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.lineWidth = 7;
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  public gaussianRand(sd) {
    var rand = 0;
    var a = 10

    for (var i = 0; i < sd; i += 1) {
      rand += Math.random();
    }

    return ((rand / a) + (sd * 1));
  }

}
