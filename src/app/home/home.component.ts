import { Component } from '@angular/core';
import * as AOS from 'aos' ;
// import { BannerComponent } from '../banner/banner.component';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})



  
export default class HomeComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  
ngOnInit() { 
     AOS.init({
      once: false, // animation happens only once
      duration: 1000, // global duration
    });
  }


  // This is the Banner Section

    videoSources = [
    { src: '/assets/images/staffAugmentation.mp4', type: 'video/mp4' },
    { src: '/assets/images/staffAugmentation.ogg', type: 'video/ogg' }
  ];

  tickerItems = [
    'We Build User-centric, Responsive Websites',
    'We Develop Custom Applications',
    'We Provide Scalable Cloud Solutions',
    'We Turn Data Into Actionable Business Insights',
    'We Secure Your Business with Next Gen DevSecOps services',
    'We Drive Innovation with Emerging Technologies'
  ];

  buttons = [
    { text: 'View Our Services', link: '#', icon: 'fa-solid fa-arrow-right', class: 'thar-four' },
    { text: 'Check Our Case Studies', link: '#', icon: 'fa-solid fa-arrow-right', class: 'thar-three' }
  ];



  // Banner Section Ends

  // Service Section Starts HERE

  sectionTitle = 'Explore Our';
  sectionSubtitle = 'Full scope IT Services';
  sectionDescription = 'Whether starting or scaling, our services eliminate every tech barrier and empower your business to succeed digitally.';

  services = [
    {
      img: '/assets/images/1.svg',
      title: 'Website Development',
      description: 'Create fast, responsive websites that hook visitors and push them down the conversion pipeline.'
    },
    {
      img: '/assets/images/2.svg',
      title: 'Application Development',
      description: 'Build custom applications that automate staff tasks, meet regulatory requirements, and improve service delivery.'
    },
    {
      img: '/assets/images/3.svg',
      title: 'Data and Analytics',
      description: 'Turn data into insights to make smarter business decisions.'
    },
    {
      img: '/assets/images/4.png',
      title: 'Security Services',
      description: 'Keep your systems secure with proactive security solutions.'
    },
    {
      img: '/assets/images/5.png',
      title: 'Cloud Services',
      description: 'Access scalable, reliable cloud solutions for better business agility.'
    },
    {
      img: '/assets/images/6.png',
      title: 'Emerging Technologies',
      description: 'Implement cutting-edge technologies to drive innovation and growth.'
    }
  ];

  // Service Section Ends

  // ONDEMAND SECTION STARTS

  ondemandSlides = [
    {
      heading: 'On-Demand Tech Team Anytime, Every time Your Business Need',
      highlight: 'On-Demand Tech Team Anytime,',
      points: [
        'Save resources on training your team. We have deep industry expertise and a team of techies that blend in effortlessly with your business.',
        'Expect results months faster and reduce experimental error with our flexible engagement options.'
      ],
      button: {
        text: 'Explore Our Consultation & Managed Services',
        icon: 'fa-solid fa-share-square',
        link: '#'
      }
    },
    {
      heading: 'A Terrific/Stellar 15+ Year Journey –100+ Brands Onboard',
      highlight: 'A Terrific/Stellar 15+ Year Journey ',
      points: [
        'Our clients have put their trust in us for years. Some of them for the past 5 years.',
        'That’s the best reward we have ever received and the only way we measure our success.'
      ],
      button: {
        text: 'Our Best Results',
        icon: 'fa-solid fa-share-square',
        link: '#'
      }
    }
  ];

  // ONDEMAND SECTION ENDS

  // key StakeHolders Section Starts

  sectionTitleKey = 'Products and Platforms';
  sectionSubtitleKey = 'Products and platforms';
  sectionHeadlineKey = 'Key Stakeholders, One Solution';
  sectionDescriptionKey =
    'Our unified products, solutions, and platform help businesses to satisfy every stakeholder of their business from customers, employees, to partners, and create an exceptional experience for them.';

  products = [
    {
      title: 'e-Bhawan',
      description: 'Streamlines guest house operations, from reservations to billing and staff management.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    },
    {
      title: 'Teziv',
      description: 'An all-in-one hotel booking and billing platform that simplifies room allocation and services.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    },
    {
      title: 'e-Office',
      description: 'Automates file movement, HR management, budgeting, and resource booking within departments.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    },
    {
      title: 'e-Counselling',
      description: 'Simplifies student admissions—from registration and seat allocation to merit lists and counseling.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    },
    {
      title: 'ORIS',
      description: 'Automates the recruitment process, from job postings to candidate selection and result publishing.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    },
    {
      title: 'Grievance Management',
      description: 'Allows citizens to submit, track, and resolve grievances with real-time updates.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    },
    {
      title: 'Document Management System',
      description: 'Securely stores, organizes, and retrieves documents, improving access and collaboration.',
      bgImage: 'assets/images/gsap-bg.png',
      mainImage: 'assets/images/system.png'
    }
  ];
  //Key Stakeholders Section Ends

}
