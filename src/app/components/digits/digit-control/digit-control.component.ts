import { Component, OnInit, Input } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { PredictionComponent } from '../prediction/prediction.component';
import { DigitsApiService } from '../../../services/digits/api/digits-api.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-digit-control',
  templateUrl: './digit-control.component.html',
  styleUrls: ['./digit-control.component.sass']
})
export class DigitControlComponent implements OnInit {

  @Input() input_canvas: CanvasComponent;
  @Input() noise_canvas: CanvasComponent;
  @Input() filtered_canvas: CanvasComponent;
  @Input() scaler_canvas: CanvasComponent;
  @Input() prediction: PredictionComponent;
  noise = .005


  constructor(private api: DigitsApiService) { }

  public clear() {
    this.input_canvas.clear();
  }

  updateSetting(event) {
    this.noise = event.srcElement.valueAsNumber
  }

  public processDigit() {
    this.prediction.digit = -1
    this.noise_canvas.updateImg(this.input_canvas.getImg(this.noise));
    this.scaler_canvas.drawImage(this.noise_canvas.getImgRaw());
    this.api.runAutoencoder(this.scaler_canvas.getImgFlat(true)).subscribe(
      (res) => {
        var data = res.predictions[0]
        this.scaler_canvas.updateFromFlat(data)
        this.filtered_canvas.drawImage(this.scaler_canvas.getImgRaw());
        this.api.runClassification(data).subscribe(
          class_res => {
            this.prediction.digit = this.extractPrediction(class_res.predictions[0]);
          },
          class_err => {
            console.log("Error occured during the classification call.");
          })
      },
      err => {
        console.log("Error occured during the autoencoder call.");
      });
  }

  ngOnInit() {
  }

  private extractPrediction(data) {
    var max = -1
    var number = -1
    for (var i = 0; i < data.length; i++) {
      if (data[i] > max) {
        max = data[i];
        number = i
      }
    }
    return number
  }

}
