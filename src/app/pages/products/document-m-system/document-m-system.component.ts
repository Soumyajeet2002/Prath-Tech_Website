import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-document-m-system',
  templateUrl: './document-m-system.component.html',
  styleUrl: './document-m-system.component.scss'
})
export class DocumentMSystemComponent {

  
    //Ready section
  
     contactForm: FormGroup;
    
      constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
          fullName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          projectDescription: ['', Validators.required]
        });
      }
    
      onSubmit() {
        if (this.contactForm.valid) {
          console.log('Form submitted:', this.contactForm.value);
          // Replace with actual API call
        } else {
          this.contactForm.markAllAsTouched();
        }
      }
  


}
