import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEmailPageComponent } from './set-email-page.component';

describe('SetEmailPageComponent', () => {
  let component: SetEmailPageComponent;
  let fixture: ComponentFixture<SetEmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetEmailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
