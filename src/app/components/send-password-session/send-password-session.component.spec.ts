import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordSessionComponent } from './send-password-session.component';

describe('SendPasswordSessionComponent', () => {
  let component: SendPasswordSessionComponent;
  let fixture: ComponentFixture<SendPasswordSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPasswordSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
