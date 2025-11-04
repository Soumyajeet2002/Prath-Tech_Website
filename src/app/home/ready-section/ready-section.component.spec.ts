import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadySectionComponent } from './ready-section.component';

describe('ReadySectionComponent', () => {
  let component: ReadySectionComponent;
  let fixture: ComponentFixture<ReadySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
