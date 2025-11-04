import { Component, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-us',
  templateUrl: './choose-us.component.html',
  styleUrls: ['./choose-us.component.scss'],
})
export class ChooseUsComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  serviceItems = [
    {
      img: 'assets/images/choose-us/01.png',
      alt: 'Curiosity to Innovate',
      title: 'Curiosity to Innovate',
      description: 'We’re always exploring new ways to push boundaries and improve.',
    },
    {
      img: 'assets/images/choose-us/02.png',
      alt: 'Problem Solvers',
      title: 'Problem Solvers',
      description: 'Challenges excite us, and we never stop until we find solutions.',
    },
    {
      img: 'assets/images/choose-us/03.png',
      alt: 'Driven by Results',
      title: 'Driven by Results',
      description:
        'We’re obsessed with delivering outcomes that actually drives trackable results for you.',
    },
    {
      img: 'assets/images/choose-us/04.png',
      alt: 'Industry Specific Experts',
      title: 'Industry Specific Experts',
      description: 'Challenges excite us, and we never stop until we find solutions.',
    },
    {
      img: 'assets/images/choose-us/02.png',
      alt: 'Agility At Core',
      title: 'Agility At Core',
      description:
        'We adapt swiftly to change and stay ahead of trends, ensuring your evolving and keeping your business competitive.',
    },
  ];

  currentIndex = 0;
  cardsPerView = 4; // Default desktop

  ngOnInit() {
    this.updateCardsPerView();
  }

  // Automatically update on window resize
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCardsPerView();
  }

  updateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 800) {
      this.cardsPerView = 1;
    } else if (width <= 992) {
      this.cardsPerView = 2;
    } else if (width <= 1200) {
      this.cardsPerView = 3;
    } else {
      this.cardsPerView = 4;
    }

    // Reset index if overflowed
    if (this.currentIndex + this.cardsPerView > this.serviceItems.length) {
      this.currentIndex = Math.max(0, this.serviceItems.length - this.cardsPerView);
    }
  }

  get visibleItems() {
    return this.serviceItems.slice(this.currentIndex, this.currentIndex + this.cardsPerView);
  }

  nextSlide() {
    if (this.currentIndex + this.cardsPerView < this.serviceItems.length) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
