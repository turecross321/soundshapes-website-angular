import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccountFormComponent } from './remove-account-form.component';

describe('RemoveAccountFormComponent', () => {
  let component: RemoveAccountFormComponent;
  let fixture: ComponentFixture<RemoveAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAccountFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
