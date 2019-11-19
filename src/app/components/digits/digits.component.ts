import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-digits',
  templateUrl: './digits.component.html',
  styleUrls: ['./digits.component.sass']
})
export class DigitsComponent implements OnInit {

  digit = -1

  constructor() {

  }

  public ngAfterViewInit() {

  }

  ngOnInit() {
  }

}
