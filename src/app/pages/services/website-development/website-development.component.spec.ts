import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDevelopmentComponent } from './website-development.component';

describe('WebsiteDevelopmentComponent', () => {
  let component: WebsiteDevelopmentComponent;
  let fixture: ComponentFixture<WebsiteDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteDevelopmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
