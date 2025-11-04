import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SakhyamComponent } from './sakhyam.component';

describe('SakhyamComponent', () => {
  let component: SakhyamComponent;
  let fixture: ComponentFixture<SakhyamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SakhyamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SakhyamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
