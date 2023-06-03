import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyViewerComponent } from './difficulty-view.component';

describe('DifficultyViewerComponent', () => {
  let component: DifficultyViewerComponent;
  let fixture: ComponentFixture<DifficultyViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DifficultyViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DifficultyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
