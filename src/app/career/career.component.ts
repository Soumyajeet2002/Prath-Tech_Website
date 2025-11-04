import { Component } from '@angular/core';
import * as AOS from 'aos';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MdmService } from '../services/mdmService/mdm.service';
import { ToastrClientService } from '../services/toastr/toastr-client.service';
import { UtilsService } from '../services/utils/utils.service';
import { mobileNumberValidator, emailValidator } from '../validators/custom.validator';
interface Step {
  title: string;
  description: string;
  image: string;
  icon: string;
}
interface WhyItem {
  heading: string;
  text: string;
  image: string;
  list?: string[];
}

interface ResponsibilitySection {
  title: string;
  points?: string[]; // optional points
}
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
})
export class CareerComponent {
  applicationForm!: FormGroup;
  isSubmitClicked: boolean = false;
  isOpen: boolean = false;
  showApplyForm: boolean = false;
  isSubmitSuccess: boolean = false;

  successMessage: string = '';

  selectedJobIndex: number = 0;
  num1: number = 0;
  num2: number = 0;
  document: any;
  fileURL: any;

  fileError: string | null = null;
  selectedFile: File | null = null;

  years: number[] = Array.from({ length: 21 }, (_, i) => i); // 0-20 years
  months: number[] = Array.from({ length: 12 }, (_, i) => i); // 0-11 months

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
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      number: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(10), mobileNumberValidator]),
      ],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      role: [this.job_cards[this.selectedJobIndex].title],
      // role: [{ value: this.job_cards[this.selectedJobIndex].title, disabled: true }],
      experienceYears: ['', Validators.required],
      experienceMonths: ['', Validators.required],
      currentCtc: ['', Validators.required],
      // currentCtc: ['', [Validators.required, Validators.maxLength(7)]],
      expectedCtc: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      cv: ['', Validators.required],
      captcha: ['', Validators.required],
    });
  }

  ngOnInit() {
    AOS.init({
      once: true, // animation happens only once
      duration: 1000, // global duration
    });
    this.createRandomNumbers();
  }

  createRandomNumbers() {
    this.num1 = Math.floor(Math.random() * 10);
    this.num2 = Math.floor(Math.random() * 10);
    this.applicationForm.get('role')?.disable();
    this.applicationForm.controls['captcha'].setValue('');
  }

  onSubmit(data: any) {
    console.log(data);
    // data.captcha = this.num1 + this.num2;
    console.log(this.num1 + this.num2, typeof (this.num1 + this.num2));
    console.log(data.captcha, typeof data.captcha);
    if (data.captcha !== (this.num1 + this.num2).toString()) {
      this.toastr.errorToastr('Captcha is incorrect. Please try again.');
      return;
    }
  }

  // isOpen = false;

  toggleCard() {
    this.isOpen = !this.isOpen;
  }
  isObject(value: any): value is { title: string; points: string[] } {
    return value && typeof value === 'object' && 'title' in value && 'points' in value;
  }

  job_cards = [
    {
      title: 'UI/UX Designer',
      type: 'Full-Time',
      experience: '3+ years',
      description: `We are seeking a highly skilled and creative UI/UX Designer/Web Designer with over 3 years
of experience to join our team. You will work closely with cross-functional teams, including
developers, product managers, and marketing, to create and enhance web interfaces that
provide an excellent user experience.`,
      keyResponsibilities: [
        {
          title:
            'Design and develop user-friendly, responsive web interfaces that align with brand guidelines.',
        },
        {
          title:
            'Collaborate with product and development teams to translate user requirements into design concepts, wireframes, prototypes, and final designs.',
        },
        {
          title: 'Optimize designs for performance, accessibility, and cross-platform consistency.',
        },
        {
          title:
            'Stay up to date with industry trends, best practices, and emerging technologies in UI/UX and web design.',
        },
        { title: 'Conduct usability testing and gather feedback to refine and improve designs.' },
      ] as ResponsibilitySection[],
      requirements: [
        'Proven experience (3+ years) in UI design, web design, or related fields.',
        'Proficiency in design tools like Adobe Creative Suite (Photoshop, Illustrator, XD) or Figma or Sketch.',
        'Strong understanding of HTML, CSS, JQuery and responsive design principles (basic knowledge of JavaScript is a plus).',
        'Experience with creating wireframes, prototypes, and high-fidelity mockups.',
        'Solid understanding of UX principles and best practices.',
        'Ability to work collaboratively in a team environment and communicate design concepts effectively.',
        'Strong problem-solving skills and attention to detail.',
        'Knowledge of WordPress is a plus.',
      ],
      qualifications: [
        ' Experience working with frameworks like Bootstrap or Material Design.',
        'Knowledge of web accessibility standards (WCAG).',
        'Experience with motion graphics or animation tools (e.g., After Effects, SVGGator).',
      ],
    },
    {
      title: 'Web Developer',
      type: 'Full-time',
      experience: '3+ years',
      description: `We are looking for an experienced web developer to join our dynamic team. The ideal candidate
will have strong expertise in developing and maintaining WordPress websites, along with a good
eye for design. Experience with responsive web design, custom themes, and plugins is a must.
You will play a key role in creating functional, engaging, and aesthetically pleasing websites to
meet client or business needs.
`,
      keyResponsibilities: [
        {
          title: 'WordPress Development:',
          points: [
            'Develop, customize, and maintain WordPress themes and plugins.',
            'Build responsive websites that work seamlessly across devices and browsers.',
            'Implement website features, enhancements, and security updates.',
            'Knowledge of Angular framework is a plus',
          ],
        },
        {
          title: 'Web Design & UX/UI (Preferred):',
          points: [
            'Work with design tools like Figma, Adobe XD, or Photoshop to create visually appealing web designs.',
            'Collaborate with the team to translate mockups into pixel-perfect WordPress websites.',
            'Ensure website layouts are user-friendly, engaging, and align with modern web design trends.',
          ],
        },
        {
          title: 'Technical Responsibilities:',
          points: [
            'Optimize websites for speed, SEO, and performance.',
            'Debug issues and provide fixes for website bugs and compatibility problems.',
            'Conduct regular website testing, backups, and updates.',
            'Work with APIs, third-party tools, and integrations as needed.',
          ],
        },
      ] as ResponsibilitySection[],
      requirements: [],
      qualifications: [],
    },

    {
      title: 'UI Designer(Graphics) ',
      type: 'Full-time',
      experience: ' 3+ years',
      description: `We are looking for a talented and creative Graphics/UI Designer with 3+ years of professional
experience to join our team. The ideal candidate should have strong expertise in Figma,
Photoshop, and Illustrator, with a keen eye for aesthetics, typography, and layout design. You
will be responsible for creating visually compelling graphics, web layouts, and user interfaces
that enhance brand identity and improve user experience.
`,
      keyResponsibilities: [
        {
          title:
            'Design modern, engaging, and user-friendly interfaces for web and mobile applications.',
        },
        {
          title:
            'Create high-quality graphics, illustrations, banners, social media creatives, and marketing assets.',
        },
        {
          title:
            'Collaborate with developers, product managers, and marketing teams to bring design concepts to life.',
        },
        {
          title: 'Develop wireframes, mockups, and prototypes using tools like Figma.',
        },
        {
          title: 'Ensure brand consistency across all design outputs.',
        },
        {
          title:
            'Optimize designs for digital platforms, ensuring responsiveness and accessibility.',
        },
        {
          title: 'Stay updated with design trends, UI patterns, and emerging creative tools.',
        },
      ] as ResponsibilitySection[],
      requirements: [
        '3+ years of proven experience as a Graphics Designer or UI Designer',
        'Proficiency in Figma, Adobe Photoshop, and Adobe Illustrator (knowledge of Adobe XD is a plus).',
        'Strong understanding of visual hierarchy, typography, and color theory',
        'Ability to translate requirements into visually appealing and user-centric designs.',
        'Experience in creating web layouts, UI components, and design systems.',
        'Basic understanding of HTML/CSS and responsive design principles.',
        'Excellent communication, time management, and collaboration skills.',
        'Attention to detail and ability to handle multiple projects simultaneously',
      ],
      qualifications: [
        'Experience with motion graphics/animation tools (e.g., After Effects, Lottie).',
        'Knowledge of branding, logo design, and print media.',
        'Familiarity with design frameworks like Material Design or Bootstrap.',
        'Experience working in Agile/Scrum environments.',
      ],
    },
  ];

  roles = [
    { title: 'Software Engineer' },
    { title: 'Web Developer' },
    { title: 'Full Stack Developer' },
  ];

  // selectJob(index: number) {
  //   this.selectedJobIndex = index;
  //   this.showApplyForm = false; // Show description when card clicked
  // }

  // openApplyForm(event: Event) {
  //   event.stopPropagation(); // Prevent triggering selectJob click
  //   this.showApplyForm = true;
  // }

  closeApplyForm() {
    this.showApplyForm = false;
  }

  submitApplication(data: any) {
    if (this.applicationForm.invalid) {
      this.toastr.errorToastr('Please fill all required fields correctly.');
      return;
    }
    if (data.captcha !== (this.num1 + this.num2).toString()) {
      this.toastr.errorToastr('Captcha is incorrect. Please try again.');
      return;
    }
    if (data.currentCtc && data.currentCtc.toString().length > 7) {
      this.toastr.errorToastr('Current CTC should not exceed 7 digits.');
      return;
    }
    if (data.expectedCtc && data.expectedCtc.toString().length > 7) {
      this.toastr.errorToastr('Expected CTC should not exceed 7 digits.');
      return;
    }
    if (data.noticePeriod && data.noticePeriod.toString().length > 3) {
      this.toastr.errorToastr('Notice Period should not exceed 3 digits.');
      return;
    }
    this.isSubmitClicked = true;
    this.applicationForm.get('role')?.enable();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('number', data.number.toString());
    formData.append('email', data.email);
    formData.append('role', this.applicationForm.get('role')?.value);
    formData.append('experienceYears', data.experienceYears.toString());
    formData.append('experienceMonths', data.experienceMonths.toString());
    formData.append('currentCtc', data.currentCtc.toString());
    formData.append('expectedCtc', data.expectedCtc.toString());
    formData.append('noticePeriod', data.noticePeriod.toString());
    formData.append('cv', data.cv);
    this.spinner.show();
    this.mdmService.professionalDetails(formData).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success') {
          this.successMessage = res.message || 'Application submitted successfully!';
          this.toastr.successToastr(res.message || 'Application submitted successfully!');
          this.createFormInstance();
          this.createRandomNumbers();
          this.isSubmitSuccess = true;
          this.isSubmitClicked = false;
        }
        this.spinner.hide();
      },
      error: (err: any) => {
        if (err && err.error && err.error.message) {
          this.toastr.errorToastr(err.error.message);
        } else {
          this.toastr.errorToastr('Failed to submit details. Please try again.');
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

  onFileChange(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (event.target.files && event.target.files.length > 0) {
      const document = event.target.files[0];
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(document.type)) {
        this.toastr.warningToastr('File should be in pdf, doc, docx format.');
        fileInput.value = '';
        this.applicationForm.controls['cv'].setValue('');
        return;
      }
      if (document.size > 1024 * 1024 * 5) {
        this.toastr.warningToastr('Maximum size of file should be 5mb');
        fileInput.value = '';
        this.applicationForm.controls['cv'].setValue('');
        return;
      }
    }
    this.applicationForm.controls['cv'].setValue(
      event.target.files[0] ? event.target.files[0] : '',
    );
  }

  isInvalid(controlName: string): boolean {
    const control = this.applicationForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  openApplyForm(event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent triggering selectJob click
    }
    this.showApplyForm = true;
    setTimeout(() => {
      const formElem = document.getElementById('career-apply-form');
      if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  // timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
  //   setTimeout(() => {
  //     const formElem = document.getElementById('career-apply-form');
  //     if (formElem) {
  //       const yOffset = -300; // Adjust to your header height if needed
  //       const y = formElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
  //       window.scrollTo({ top: y, behavior: 'smooth' });
  //     }
  //   }, 0);
  // }, 0);
  selectJob(index: number): void {
    this.selectedJobIndex = index;
    console.log(this.selectedJobIndex);
    this.applicationForm.controls['role'].setValue(this.job_cards[this.selectedJobIndex].title);
    this.showApplyForm = false; // Show description when card clicked

    setTimeout(() => {
      const careerSection = document.getElementById('career-section');
      if (careerSection) {
        const yOffset = -100; // Adjust based on your fixed header height
        const y = careerSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  }
}
