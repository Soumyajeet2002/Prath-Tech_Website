import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationServicesComponent } from './consultation-services.component';

describe('ConsultationServicesComponent', () => {
  let component: ConsultationServicesComponent;
  let fixture: ComponentFixture<ConsultationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
