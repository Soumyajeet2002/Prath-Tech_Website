import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-sakhyam',
  templateUrl: './sakhyam.component.html',
  styleUrl: './sakhyam.component.scss'
})
export class SakhyamComponent {


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
