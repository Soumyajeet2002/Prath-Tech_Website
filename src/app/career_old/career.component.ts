import { Component } from '@angular/core';
import * as AOS from 'aos' ;
import { trigger, transition, style, animate } from '@angular/animations';

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

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',

  // animations: [
  //   trigger('fadeInOut', [
  //     transition(':increment', [
  //       style({ opacity: 0, transform: 'translateY(30px) scale(0.98)' }),
  //       animate('100ms cubic-bezier(.61,-0.21,.34,1.21)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
  //     ]),
  //     transition(':decrement', [
  //       style({ opacity: 0, transform: 'translateY(-30px) scale(0.98)' }),
  //       animate('100ms cubic-bezier(.61,-0.21,.34,1.21)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
  //     ]),
  //     transition('* => *', [
  //       style({ opacity: 0 }),
  //       animate('100ms', style({ opacity: 1 }))
  //     ])
  //   ])
  // ]
})
export class CareerComponent {




  ngOnInit() { 
    AOS.init({
      once: true, // animation happens only once
      duration: 1000, // global duration
    });}


// private icons: NodeListOf<HTMLDivElement>;

//   constructor() {
//     this.icons = document.querySelectorAll<HTMLDivElement>(".career-card .icon");
//     this.init();
//   }

//   private init(): void {
//     this.icons.forEach((icon) => {
//       icon.onclick = () => this.toggleDesc(icon);
//     });
//   }

//   private toggleDesc(icon: HTMLDivElement): void {
//     icon.classList.toggle("active");

//     const careerCard = icon.closest(".career-card");
//     if (!careerCard) return;

//     const desc = careerCard.nextElementSibling as HTMLElement | null;
//     if (desc && desc.classList.contains("job-desc")) {
//       desc.classList.toggle("open");
//     }
//   }
// toggleJob(element: HTMLElement): void {
//     const card = element.closest('.career-card') as HTMLElement | null;
//     if (!card) return;

//     const icon = element.querySelector('.icon') as HTMLElement | null;
//     if (!icon) return;

//     card.classList.toggle('open');
//     icon.textContent = card.classList.contains('open') ? '-' : '+';
//   }



  toggleJob(event: Event): void {
  const element = event.currentTarget as HTMLElement | null;
  if (!element) return;

  const card = element.closest('.career-card') as HTMLElement | null;
  if (!card) return;

  const icon = element.querySelector('.icon') as HTMLElement | null;
  if (!icon) return;

  card.classList.toggle('open');
  icon.textContent = card.classList.contains('open') ? '-' : '+';
}



steps: Step[] = [
    {
      title: 'HR Interaction',
      description: 'First of all, the candidate should interact with HR as we are always on the hunt for people who are proactive, self-motivated and constantly willing to upgrade their learning curve.',
      image: 'assets/images/hr_interaction.jpg',
      icon: 'assets/images/HR-Interaction.png'
    },
    {
      title: 'Technical Interview',
      description: 'In this round, candidates are assessed on their technical skills, coding standards, and problem-solving ability.',
      image: 'assets/images/technical-interview.jpg',
      icon: 'assets/images/Technical-Interview.png'
    },
    {
      title: 'Practical Assessment',
      description: 'Candidates are tested with real-world coding tasks and assignments to check their practical application of knowledge.',
      image: 'assets/images/practical-assesment.jpg',
      icon: 'assets/images/Practical-Assessment.png'
    },
    {
      title: 'Final Round',
      description: 'The final interaction round with leadership to evaluate culture fit and overall readiness for the role.',
      image: 'assets/images/final-round.jpg',
      icon: 'assets/images/Final-Round.png'
    }
  ];

  selectedStepIndex: number = 0;

  selectStep(index: number): void {
    this.selectedStepIndex = index;
  }





  // tabs = ['Impact', 'Development', 'Support', 'Progress'];
  // selectedTab = 0;

  // selectTab(tabIndex: number) {
  //   this.selectedTab = tabIndex;
  //   // you can update main content based on tab if needed
  // }


  



    tabs = ['Impact', 'Development', 'Support', 'Progress'];
  selectedTab = 0;

  items: WhyItem[] = [
    {
      heading: 'Leading with purpose',
      text: `Through the application of innovation and our contextual knowledge, we give associates the opportunity to deliver transformative outcomes that benefit society at large and prove that anything is possible.`,
      image: 'assets/images/career_banner_bg.svg',
      list: [
        'Deliver transformative outcomes',
        'Benefit society at large',
        'Prove that anything is possible'
      ]
    },
    {
      heading: 'Growing talent, creating value',
      text: `We invest in continuous skill development, mentorship, and a collaborative culture that helps everyone reach their potential and delivers solutions that advance our clients’ goals.`,
      image: 'assets/images/Education (2).png'
    },
    {
      heading: 'Supporting every step',
      text: `Our support teams work tirelessly behind the scenes to ensure seamless operations, creating an empowered environment where professionals can focus on impactful work.`,
      image: 'assets/images/Energy & Utility.png'
    },
    {
      heading: 'Driving progress together',
      text: `Together, we push boundaries and drive progress through innovative thinking, sustainable business practices, and a shared commitment to positive change.`,
      image: 'assets/images/Healthcare.png'
    }
  ];

  ngAfterViewInit() {
    AOS.init({
      once: false, // enable repeated animations on tab change
      duration: 800
    });
  }

  selectTab(tabIndex: number) {
    if (this.selectedTab !== tabIndex) {
      this.selectedTab = tabIndex;
      AOS.refresh(); // re-trigger animations on tab content change
    }
  }


  // LIFE AT STL
   stlCards = [
    {
      image: 'assets/images/Healthcare.png',
      title: 'RestartWithSTL',
      bgColor: '#20a89e'
    },
    {
      image: 'assets/images/Healthcare.png',
      title: 'Learning Experience (LEX)',
      bgColor: '#b4862c'
    },
    {
      image: 'assets/images/Healthcare.png',
      title: 'Culture',
      bgColor: '#0d74b8'
    }
  ];


  // HERE FRO OUR WORKERS AT STL

  employees = [
    {
      image: 'assets/images/Healthcare.png',
      name: 'lorem ipsum',
      quote: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      bgColor: '#f4f5f6'
    },
    {
      image: 'assets/images/Healthcare.png',
      name: 'Lorem ipsum',
      quote: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      bgColor: '#dedede'
    },
    {
      image: 'assets/images/Healthcare.png',
      name: 'Lorem ipsum',
      quote: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..`,
      bgColor: '#f4f5f6'
    },
    {
      image: 'assets/images/Healthcare.png',
      name: 'Lorem ipsum',
      quote: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..`,
      bgColor: '#faf6f2'
    }
  ];

}
