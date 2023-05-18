import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordPageComponent } from './set-password-page.component';

describe('SetPasswordPageComponent', () => {
  let component: SetPasswordPageComponent;
  let fixture: ComponentFixture<SetPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPasswordPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
