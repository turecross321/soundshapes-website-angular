import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTextComponent } from './time-text.component';

describe('TimeTextComponent', () => {
  let component: TimeTextComponent;
  let fixture: ComponentFixture<TimeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
