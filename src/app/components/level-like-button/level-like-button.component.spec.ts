import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelLikeButtonComponent } from './level-like-button.component';

describe('LevelLikeButtonComponent', () => {
  let component: LevelLikeButtonComponent;
  let fixture: ComponentFixture<LevelLikeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelLikeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelLikeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
