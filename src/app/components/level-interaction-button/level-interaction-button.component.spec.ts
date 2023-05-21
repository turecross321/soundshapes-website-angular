import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelInteractionButtonComponent } from './level-interaction-button.component';

describe('LevelInteractionButtonComponent', () => {
  let component: LevelInteractionButtonComponent;
  let fixture: ComponentFixture<LevelInteractionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelInteractionButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelInteractionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
