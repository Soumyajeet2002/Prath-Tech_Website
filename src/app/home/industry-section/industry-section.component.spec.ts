import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySectionComponent } from './industry-section.component';

describe('IndustrySectionComponent', () => {
  let component: IndustrySectionComponent;
  let fixture: ComponentFixture<IndustrySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
