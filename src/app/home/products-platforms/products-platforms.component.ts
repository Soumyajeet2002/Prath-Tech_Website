import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-products-platforms',
  templateUrl: './products-platforms.component.html',
  styleUrls: ['./products-platforms.component.scss'],
})
export class ProductsPlatformsComponent implements OnInit, AfterViewInit, OnDestroy {
  sectionTitleKey = 'Products and Platforms';
  sectionSubtitleKey = 'Products and Platforms';
  sectionHeadlineKey = 'Key Stakeholders, One Solution';
  sectionDescriptionKey =
    'Our unified products, solutions, and platform help businesses to satisfy every stakeholder of their business from customers, employees, to partners, and create an exceptional experience for them.';

  products = [
    {
      title: 'e-Bhawan',
      description:
        'Streamlines guest house operations, from reservations to billing and staff management.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/Case study E bhawan.png',
    },
    {
      title: 'Asset Management',
      description:
        'Smart asset management that maximizes efficiency, minimizes risks, and ensures compliance.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/Case study Asset Management System.png',
    },
    {
      title: 'e-Office',
      description:
        'Automates file movement, HR management, budgeting, and resource booking within departments.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/Case study e-Office.png',
    },
    {
      title: 'e-Counselling',
      description:
        'Simplifies student admissions—from registration and seat allocation to merit lists and counseling.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/system.png',
    },
    {
      title: 'ORIS',
      description:
        'Automates the recruitment process, from job postings to candidate selection and result publishing.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/system.png',
    },
    {
      title: 'Grievance Management',
      description:
        'Allows citizens to submit, track, and resolve grievances with real-time updates.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/Case study Grievance Management.png',
    },
    {
      title: 'Start-Up Odisha',
      description:
        'A Government of Odisha initiative nurturing entrepreneurship, innovation, and growth opportunities for aspiring startups.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/startup-odisha.png',
    },
    {
      title: 'Nursing Counseling',
      description:
        'Odisha Nursing Counseling portal for online admission, seat allotment, course details, and student support.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/nursing.png',
    },
    {
      title: 'OSMC',
      description:
        '“Odisha’s Khusi Plus platform ensures transparent distribution across schools, beneficiaries, suppliers, and warehouses effectively.”',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/osmc.png',
    },
    {
      title: 'NHMO',
      description:
        'EAMS Odisha provides free 108 ambulance services ensuring emergency medical transport statewide, anytime for everyone.',
      bgImage: 'assets/images/product-platform.png',
      mainImage: 'assets/images/nhmo.png',
    },
  ];

  currentIndex = 0;
  isHovered = false;
  autoScrollInterval: any;
  animateSlide = true;

  @ViewChildren('scrollAnimate', { read: ElementRef }) scrollElements!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.startAutoScroll();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    this.scrollElements.forEach(el => observer.observe(el.nativeElement));
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (!this.isHovered && this.products.length > 0) {
        this.next();
      }
    }, 5000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  triggerAnimation() {
    this.animateSlide = false;
    setTimeout(() => {
      this.animateSlide = true;
    }, 20); // Small delay to retrigger animation
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.triggerAnimation();
    }
  }

  next() {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.triggerAnimation();
  }
}
