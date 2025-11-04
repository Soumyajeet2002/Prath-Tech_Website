import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMSystemComponent } from './document-m-system.component';

describe('DocumentMSystemComponent', () => {
  let component: DocumentMSystemComponent;
  let fixture: ComponentFixture<DocumentMSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentMSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentMSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
