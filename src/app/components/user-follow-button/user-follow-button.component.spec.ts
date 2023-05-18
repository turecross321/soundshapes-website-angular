import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowButtonComponent } from './user-follow-button.component';

describe('UserFollowButtonComponent', () => {
  let component: UserFollowButtonComponent;
  let fixture: ComponentFixture<UserFollowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFollowButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFollowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
