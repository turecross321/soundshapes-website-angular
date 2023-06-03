import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccountPageComponent } from './remove-account-page.component';

describe('RemoveAccountPageComponent', () => {
  let component: RemoveAccountPageComponent;
  let fixture: ComponentFixture<RemoveAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveAccountPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
