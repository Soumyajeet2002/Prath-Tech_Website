import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  intervalId: any;

  slides = [
    {
      title: 'Teziv',
      description: 'Hotel booking and billing platform.',
      img: 'assets/images/system.png',
      bg: 'assets/images/gsap-bg.png'
    },
    {
      title: 'e-Office',
      description: 'Automates file movement and HR management.',
      img: 'assets/images/system.png',
      bg: 'assets/images/gsap-bg.png'
    },
    {
      title: 'e-Counselling',
      description: 'Manages student registration and merit list.',
      img: 'assets/images/system.png',
      bg: 'assets/images/gsap-bg.png'
    },
    {
      title: 'ORIS',
      description: 'Automates recruitment workflow.',
      img: 'assets/images/system.png',
      bg: 'assets/images/gsap-bg.png'
    },
    {
      title: 'Grievance Management',
      description: 'Real-time citizen grievance tracking.',
      img: 'assets/images/system.png',
      bg: 'assets/images/gsap-bg.png'
    },
    {
      title: 'Document Management System',
      description: 'Securely stores and retrieves documents.',
      img: 'assets/images/system.png',
      bg: 'assets/images/gsap-bg.png'
    }
  ];

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoplay() {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
