import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationServicesComponent } from './consultation-services/consultation-services.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  // @ViewChild('cardsRow') cardsRow!: ElementRef<HTMLDivElement>;

  serviceCards = [
    {
      imageSrc: 'assets/images/1.svg',
      altText: 'Website Development',
      title: 'Website Development',
      description:
        'Create fast, responsive websites that hook visitors and push them down the conversion pipeline.',
      cardColorClass: 'card-color-1',
      titleColorClass: 'title-color-1',
    },
    {
      imageSrc: 'assets/images/Services/service-card-2.svg',
      altText: 'Application Development',
      title: 'Application Development',
      description:
        'Build custom applications that automate staff tasks, meet regulatory requirements, and improve service delivery.',
      cardColorClass: 'card-color-2',
      titleColorClass: 'title-color-2',
    },
    {
      imageSrc: 'assets/images/Services/service-card-3.svg',
      altText: 'Consultation and Managed Services',
      title: 'Consultation and Managed Services',
      description:
        'Build custom applications that automate staff tasks, meet regulatory requirements, and improve service delivery.',
      cardColorClass: 'card-color-3',
      titleColorClass: 'title-color-3',
    },
    {
      imageSrc: 'assets/images/Services/service-card-4.svg',
      altText: 'Data and Analytics',
      title: 'Data and Analytics',
      description: 'Turn data into insights to make smarter business decisions.',
      cardColorClass: 'card-color-4',
      titleColorClass: 'title-color-4',
    },
    {
      imageSrc: 'assets/images/4.svg',
      altText: 'Security Services',
      title: 'Security Services',
      description: 'Keep your systems secure with proactive security solutions.',
      cardColorClass: 'card-color-5',
      titleColorClass: 'title-color-5',
    },
    {
      imageSrc: 'assets/images/5.svg',
      altText: 'Cloud Services',
      title: 'Cloud Services',
      description: 'Access scalable, reliable cloud solutions for better business agility.',
      cardColorClass: 'card-color-6',
      titleColorClass: 'title-color-6',
    },
    {
      imageSrc: 'assets/images/6.png',
      altText: 'Emerging Technologies',
      title: 'Emerging Technologies',
      description: 'Implement cutting-edge technologies to drive innovation and growth.',
      cardColorClass: 'card-color-7',
      titleColorClass: 'title-color-7',
    },
  ];

  isLeftDisabled = true;
  isRightDisabled = false;

  private scrollAmount = 331; // Adjust to card width + gap

  scrollLeft(): void {
    const container = document.getElementById('cardsRow');
    if (container) {
      container.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
      setTimeout(() => this.updateButtonStates(), 400);
    }
  }

  scrollRight(): void {
    const container = document.getElementById('cardsRow');
    if (container) {
      container.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
      setTimeout(() => this.updateButtonStates(), 400);
    }
  }
  updateButtonStates(): void {
    const container = document.getElementById('cardsRow');
    if (container) {
      this.isLeftDisabled = container.scrollLeft <= 0;
      this.isRightDisabled =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
    }
  }
}
