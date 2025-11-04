import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCodeNewComponent } from './test-code-new.component';

describe('TestCodeNewComponent', () => {
  let component: TestCodeNewComponent;
  let fixture: ComponentFixture<TestCodeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestCodeNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCodeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
