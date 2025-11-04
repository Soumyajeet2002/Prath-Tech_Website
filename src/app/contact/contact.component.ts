import { Component, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { contactModel } from '../model/contact.model';
import { MdmService } from '../services/mdmService/mdm.service';
import { ToastrClientService } from '../services/toastr/toastr-client.service';
import { UtilsService } from '../services/utils/utils.service';
import { mobileNumberValidator, emailValidator } from '../validators/custom.validator';
import { Router, NavigationEnd } from '@angular/router';
import { LettersOnlyDirective } from './letters-only.directive';
import { NumberonlyDirective } from './numberonly.directive';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LettersOnlyDirective,
    NumberonlyDirective,
  ],
})
export class ContactComponent {
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
    private route: ActivatedRoute,
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

  // try
  supportCards = [
    {
      class: 'card1',
      icon: 'assets/images/contact-page/icon-1.png',
      title: 'Talk to our Sales Team',
      description:
        'Get quick responses, clear explanations, and professional guidance to explore our services.',
      button: 'Contact Sales',
      link: '/contact',
      fragment: 'contact-form',
      Color: 'linear-gradient(163.74deg, #CEDFFF 8.39%, #DDC9FF 99.02%)',
      borderColor: '#DDC9FF ',
      // buttonColor: '#5e00ff', // border + text color
    },
    {
      class: 'card2',
      icon: 'assets/images/contact-page/icon-2.png',
      title: 'Talk to our business analyst / project manager',
      description:
        'Let’s Talk! Your Business Is The Priority. Clear Understanding Of Technology Tailored Guidance Helping Your Growth!',
      button: 'Schedule a Consultation',
      link: '/contact',
      fragment: 'contact-form',
      Color: 'linear-gradient(163.74deg, #D3E5F3 8.39%, #83DEFF 99.02%)',
      // buttonColor:'#0023ff',
      borderColor: '#83DEFF ',
    },
    {
      class: 'card3',
      icon: 'assets/images/contact-page/icon-3.png',
      title: 'Careers at PRATH TECH',
      description:
        'Join A Power-Packed Team! Company Shaping The Future Of Technology. Work Culture That Cares. Let’s Talk.',
      button: 'Explore Job Opportunities',
      link: '/career',
      Color: 'linear-gradient(158.92deg, #FFF0E2 -0.29%, #FFB09C 94.83%)',
      // buttonColor:'#ff3300',
      borderColor: '#FFB09C ',
    },
    {
      class: 'card-4',
      icon: 'assets/images/contact-page/icon-4.png',
      title: 'General Support',
      description: 'Reach Out Anytime for Any Inquiries. Always Happy To Help!',
      button: 'Contact Us',
      link: '/contact',
      Color: 'linear-gradient(158.92deg, #FFF9E9 -0.29%, #FFD997 94.83%)',
      // buttonColor: '#FFA100',
      borderColor: '#FFD997 ',
    },
    //   {
    //   class:'card1',
    //   icon: 'assets/images/contact-page/icon-1.png',
    //   title: 'Dedicated Support Team 24/7',
    //   description: 'Reach out to our support team for any assistance. Our team of well-trained professionals listens to your requirements, provides valuable input, and promptly resolves any issues.',
    //   button: 'Explore Our Services',
    //   link: '/services',
    //   Color: 'linear-gradient(163.74deg, #CEDFFF 8.39%, #DDC9FF 99.02%)'

    // },
  ];
  mapDots = [
    { label: 'USA', class: 'usa', location: 'lorem' },
    { label: 'Dubai', class: 'dubai', location: 'lorem' },
    {
      label: 'India',
      class: 'india',
      location:
        'Odisha CORPORATE OFFICE: DCB - 402-406, 4th Floor,DLF Cyber City, Chandaka Industrial Estate,Bhubaneswar, Odisha-751024, India India +91674 2973271 REGD OFFICE : Silicon Techlab Pvt Ltd, Incubation Centre, Silicon Institute of Technology Campus, Silicon Hills, Patia, Bhubaneswar, Odisha -751024, India',
    },
  ];

  // This code is for the animation of the contact page usign AOS libraby
  ngOnInit() {
    AOS.init({
      once: true, // animation happens only once
      duration: 3000, // global duration
    });
    this.startAutoSlide();
    this.checkScreenSize();
    this.startAutoSlide();
  }

  currentIndex = 0;
  intervalId: any;

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Slide every 3 seconds
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.supportCards.length;
  }

  isMobile = false;

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 700;
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            const headerOffset = 110;
            const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 0);
      }
    });
  }
}
