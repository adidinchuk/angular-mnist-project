import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.sass']
})
export class PredictionComponent implements OnInit {

  @Input() digit = -1

  constructor() { }

  ngOnInit() {
  }

}
