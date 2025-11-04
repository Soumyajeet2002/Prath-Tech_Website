import { Component } from '@angular/core';

@Component({
  selector: 'app-ondemand-section',
  templateUrl: './ondemand-section.component.html',
  styleUrls: ['./ondemand-section.component.scss'], 
})
export class OndemandSectionComponent {
  ondemandSlides = [
    {
      heading: 'On-Demand Tech Team,',
      highlight: 'Every Time Your Business Need',
      points: [
        'Save resources on training your team. We have deep industry expertise and a team of techies that blend in effortlessly with your business.',
        'Expect results months faster and reduce experimental error with our flexible engagement options.',
      ],
      button: {
        text: 'Explore Our Consultation & Managed Services',
        link: '#',
      },
    },
    // {
    //   heading: 'A 15+ Year Journey –100+ Brands Onboard',
    //   highlight: 'A Terrific/Stellar 15+ Year Journey ',
    //   points: [
    //     'Our clients have put their trust in us for years. Some of them for the past 5 years.',
    //     'That’s the best reward we have ever received and the only way we measure our success.',
    //   ],
    //   button: {
    //     text: 'Our Best Results',
    //     link: '#',
    //   },
    // },
  ];

  currentIndex = 0;
  progressSide: 'left' | 'right' = 'left';

  get currentSlide() {
    return this.ondemandSlides[this.currentIndex];
  }

  get progressPercentage() {
    return ((this.currentIndex + 1) / this.ondemandSlides.length) * 100;
  }

  nextSlide() {
    if (this.currentIndex < this.ondemandSlides.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; 
    }
    this.updateProgressSide();
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.ondemandSlides.length - 1; 
    }
    this.updateProgressSide();
  }

  handleProgressClick(event: MouseEvent): void {
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 2) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = 1;
    }
    this.updateProgressSide();
  }

  private updateProgressSide(): void {
    this.progressSide = this.currentIndex === 0 ? 'left' : 'right';
  }
}
