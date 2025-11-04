import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPlatformsComponent } from './products-platforms.component';

describe('ProductsPlatformsComponent', () => {
  let component: ProductsPlatformsComponent;
  let fixture: ComponentFixture<ProductsPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPlatformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
