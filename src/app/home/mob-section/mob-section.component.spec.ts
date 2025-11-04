import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSectionComponent } from './mob-section.component';

describe('MobSectionComponent', () => {
  let component: MobSectionComponent;
  let fixture: ComponentFixture<MobSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
