import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitControlComponent } from './digit-control.component';

describe('DigitControlComponent', () => {
  let component: DigitControlComponent;
  let fixture: ComponentFixture<DigitControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
