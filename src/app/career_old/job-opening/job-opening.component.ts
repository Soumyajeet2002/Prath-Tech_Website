import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-opening',
  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss'
})
export class JobOpeningComponent {

  //  formData = {
  //   name: '',
  //   email: '',
  //   phone: '',
  //   position: ''
  // };

  // resumeFile: File | null = null;
  // submitted = false;

  // onFileSelected(event: any) {
  //   this.resumeFile = event.target.files[0];
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   console.log('Application Submitted:', this.formData, this.resumeFile);
  //   alert("SUBMITED");
  // }



  jobTitle: string = 'MERN Stack Developer';

  applicationForm: FormGroup;
  fileError: string | null = null;

  years: number[] = Array.from({ length: 21 }, (_, i) => i); // 0-20 years
  months: number[] = Array.from({ length: 12 }, (_, i) => i); // 0-11 months

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      experienceYears: [0, Validators.required],
      experienceMonths: [0, Validators.required],
      currentCtc: ['', Validators.required],
      expectedCtc: ['', Validators.required],
      noticePeriod: ['', Validators.required]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed.';
        this.selectedFile = null;
      } else {
        this.fileError = null;
        this.selectedFile = file;
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.applicationForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.applicationForm.valid && this.selectedFile) {
      const formData = new FormData();
      Object.entries(this.applicationForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('cv', this.selectedFile);

      console.log('Form Submitted:', formData);

      // Here you would send `formData` to backend using HttpClient
      alert('Application Submitted Successfully!');
    } else {
      this.fileError = this.selectedFile ? null : 'Please upload your CV.';
      this.applicationForm.markAllAsTouched();
    }
  }
}
