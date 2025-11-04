import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @ViewChild('bgVideoElement') bgVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const videoE1 = this.bgVideo.nativeElement;
    videoE1.muted = true;
    videoE1.play().catch(() => {
      console.warn('');
      setTimeout(() => videoE1.play(), 500);
    });
  }
  videoSources = [
    // { src: 'assets/images/staffAugmentation.mp4', type: 'video/mp4' },
    { src: 'https://d106xgtvupynm3.cloudfront.net/banner_section-bg-1.mp4', type: 'video/mp4' },
    // { src: 'assets/images/staffAugmentation.ogg', type: 'video/ogg' }
  ];

  tickerItems = [
    'We Build User-centric, Responsive Websites',
    'We Develop Custom Applications',
    'We Provide Scalable Cloud Solutions',
    'We Turn Data Into Actionable Business Insights',
    'We Secure Your Business with Next Gen DevSecOps services',
    'We Drive Innovation with Emerging Technologies',
  ];

  buttons = [
    { text: 'View Our Services', link: '#', icon: 'fa-solid fa-arrow-right', class: 'btn-1' },
    { text: 'Check Our Case Studies', link: '#', icon: 'fa-solid fa-arrow-right', class: 'btn-2' },
  ];

  subtitles: string[] = [
    'We Build User-centric, Responsive Websites',
    'We Develop Custom Applications',
    'We Provide Scalable Cloud Solutions',
    'We Turn Data Into Actionable Business Insights',
    'We Secure Your Business with Next Gen DevSecOps Services',
    'We Drive Innovation with Emerging Technologies',
  ];



  currentIndex = 0;
  transformStyle = 'translateY(0)';
  transition = 'transform 0.6s ease-in-out';

  // ngOnInit() {
  //   setInterval(
  //     () => {
  //       // Adjust height for mobile vs desktop
  //       const itemHeight = window.innerWidth <= 700 ? 32 : 48;

  //       this.currentIndex = (this.currentIndex + 1) % this.tickerItems.length;
  //       this.transformStyle = `translateY(-${this.currentIndex * itemHeight}px)`;
  //     },
  //     window.innerWidth <= 700 ? 3000 : 2000,
  //   );
  //   // 3000ms on mobile (slower), 2000ms for desktop
  // }
  ngOnInit() {
  // Duplicate list for seamless scrolling
  this.tickerItems = [...this.subtitles, ...this.subtitles];

  setInterval(() => {
    const itemHeight = window.innerWidth <= 700 ? 32 : 48;
    this.currentIndex++;

    this.transformStyle = `translateY(-${this.currentIndex * itemHeight}px)`;
    this.transition = 'transform 0.6s ease-in-out';

    // When we reach the first copy’s end, reset to start instantly
    if (this.currentIndex >= this.subtitles.length) {
      setTimeout(() => {
        this.transition = 'none'; // remove animation
        this.currentIndex = 0;
        this.transformStyle = `translateY(0)`; // snap back
      }, 600); // match transition duration
    }
  }, window.innerWidth <= 700 ? 3000 : 2000);
}
}
