import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCarouselComponent } from './level-carousel.component';

describe('LevelCarouselComponent', () => {
  let component: LevelCarouselComponent;
  let fixture: ComponentFixture<LevelCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
