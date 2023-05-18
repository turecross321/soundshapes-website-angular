import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsPageComponent } from './levels-page.component';

describe('LevelsPageComponent', () => {
  let component: LevelsPageComponent;
  let fixture: ComponentFixture<LevelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
