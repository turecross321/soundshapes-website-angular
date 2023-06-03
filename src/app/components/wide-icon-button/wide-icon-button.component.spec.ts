import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WideIconButtonComponent } from './wide-icon-button.component';

describe('WideIconButtonComponent', () => {
  let component: WideIconButtonComponent;
  let fixture: ComponentFixture<WideIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WideIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WideIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
