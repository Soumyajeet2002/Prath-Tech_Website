import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MdmService } from '../../services/mdmService/mdm.service';
import { ToastrClientService } from '../../services/toastr/toastr-client.service';
import { contactModel } from '../../model/contact.model';
import { UtilsService } from '../../services/utils/utils.service';
import { emailValidator, mobileNumberValidator } from '../../validators/custom.validator';
// import { ContactUsComponent } from "../../shared/components/contact-us/contact-us.component";

@Component({
  selector: 'app-ready-section',
  templateUrl: './ready-section.component.html',
  styleUrl: './ready-section.component.scss',
})
export class ReadySectionComponent {
  contactForm!: FormGroup;
  isSubmitClicked: boolean = false;
  isSubmitSuccess: boolean = false;
  enableEmailBtn: boolean = false;
  showOtpField: boolean = false;
  isShowEmailOtpField: boolean = false;
  getEmailOtp: boolean = false;
  timerOn: boolean = true;

  emailmin!: number | string;
  emailsec!: number | string;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrClientService,
    private mdmService: MdmService,
    public utilsService: UtilsService,
  ) {
    this.createFormInstance();
  }

  createFormInstance() {
    this.contactForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      number: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
          mobileNumberValidator,
        ]),
      ],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      otp: [''],
      message: ['', Validators.required],
    });
  }

  showEmailOTPField() {
    const email = this.contactForm.controls['email'].value;
    this.spinner.show();
    this.mdmService.getEmailOtp({ email: email }).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success') {
          this.toastr.successToastr('OTP has been sent to your email.');
          this.isShowEmailOtpField = true;
          this.enableEmailBtn = true;
          this.getEmailOtp = true;
          this.showOtpField = true;
          this.timerForEmail(60);
          this.spinner.hide();
        }
      },
      error: (err: any) => {
        if (err && err.error && err.error.message) {
          this.toastr.errorToastr(err.error.message);
        } else {
          this.toastr.errorToastr('Something went wrong, Please try again.');
        }
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  onSubmit(data: contactModel) {
    if (this.contactForm.invalid) {
      this.toastr.errorToastr('Please fill all required fields correctly.');
      return;
    }
    const captcha = this.contactForm.controls['otp'].value;
    if (!captcha || captcha === '' || captcha === null) {
      this.toastr.errorToastr('Email verification required: Please confirm with the OTP.');
      return;
    }
    this.isSubmitClicked = true;
    this.spinner.show();
    this.mdmService.submitContactDetails(data).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success') {
          this.toastr.successToastr(
            'We have received your request and will get back to you shortly.',
          );
          this.createFormInstance();
          this.isSubmitClicked = false;
          this.isSubmitSuccess = true;
          this.isShowEmailOtpField = false;
          this.getEmailOtp = false;
          this.enableEmailBtn = false;
          this.timerOn = false;
        }
        this.spinner.hide();
      },
      error: (err: any) => {
        if (err && err.error && err.error.message) {
          this.toastr.errorToastr(err.error.message);
        } else {
          this.toastr.errorToastr('Failed to submit contact details. Please try again.');
        }
        this.isSubmitSuccess = false;
        this.spinner.hide();
      },
      complete: () => {
        this.isSubmitClicked = false;
        this.spinner.hide();
      },
    });
  }

  timerForEmail(remaining: number) {
    this.emailmin = Math.floor(remaining / 60);
    this.emailsec = remaining % 60;

    this.emailmin = this.emailmin < 10 ? '0' + this.emailmin : this.emailmin;
    this.emailsec = this.emailsec < 10 ? '0' + this.emailsec : this.emailsec;

    remaining -= 1;

    if (remaining >= 0 && this.timerOn) {
      setTimeout(() => {
        this.timerForEmail(remaining);
      }, 1000);
      return;
    }

    if (!this.timerOn) {
      return;
    }
    this.enableEmailBtn = false;
    this.getEmailOtp = false;
  }

  otpInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 6); // digits only, max 6
    this.contactForm.get('otp')?.setValue(input.value, { emitEvent: false });
  }
}
