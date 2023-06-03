import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedPageComponent } from './banned-page.component';

describe('BannedPageComponent', () => {
  let component: BannedPageComponent;
  let fixture: ComponentFixture<BannedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
