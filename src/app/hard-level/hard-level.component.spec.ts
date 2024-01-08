import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardLevelComponent } from './hard-level.component';

describe('HardLevelComponent', () => {
  let component: HardLevelComponent;
  let fixture: ComponentFixture<HardLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HardLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
