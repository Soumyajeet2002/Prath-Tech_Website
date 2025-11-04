import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndemandSectionComponent } from './ondemand-section.component';

describe('OndemandSectionComponent', () => {
  let component: OndemandSectionComponent;
  let fixture: ComponentFixture<OndemandSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OndemandSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndemandSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
