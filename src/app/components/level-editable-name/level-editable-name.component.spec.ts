import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelEditableNameComponent } from './level-editable-name.component';

describe('LevelEditableNameComponent', () => {
  let component: LevelEditableNameComponent;
  let fixture: ComponentFixture<LevelEditableNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelEditableNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelEditableNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
