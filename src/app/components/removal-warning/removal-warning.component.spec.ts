import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalWarningComponent } from './removal-warning.component';

describe('RemovalWarningComponent', () => {
  let component: RemovalWarningComponent;
  let fixture: ComponentFixture<RemovalWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovalWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovalWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
