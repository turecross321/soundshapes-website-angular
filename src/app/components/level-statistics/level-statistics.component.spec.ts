import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStatisticsComponent } from './level-statistics.component';

describe('LevelStatisticsComponent', () => {
  let component: LevelStatisticsComponent;
  let fixture: ComponentFixture<LevelStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
