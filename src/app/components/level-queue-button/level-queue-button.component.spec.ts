import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelQueueButtonComponent } from './level-queue-button.component';

describe('LevelQueueButtonComponent', () => {
  let component: LevelQueueButtonComponent;
  let fixture: ComponentFixture<LevelQueueButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelQueueButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelQueueButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
