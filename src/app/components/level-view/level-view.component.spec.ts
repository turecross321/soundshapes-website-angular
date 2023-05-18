import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelViewComponent } from './level-view.component';

describe('LevelViewComponent', () => {
  let component: LevelViewComponent;
  let fixture: ComponentFixture<LevelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
