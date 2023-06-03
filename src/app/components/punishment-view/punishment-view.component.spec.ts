import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunishmentViewComponent } from './punishment-view.component';

describe('PunishmentViewComponent', () => {
  let component: PunishmentViewComponent;
  let fixture: ComponentFixture<PunishmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunishmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunishmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
