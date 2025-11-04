import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss'],
})
export class ServiceSectionComponent {
  services = [
    {
      img: 'assets/images/1.svg',
      title: 'Website Development',
      description:
        'Create fast, responsive websites that hook visitors and push them down the conversion pipeline.',
    },
    {
      img: 'assets/images/2.svg',
      title: 'Application Development',
      description:
        'Build custom applications that automate staff tasks, meet regulatory requirements, and improve service delivery.',
    },
    {
      img: 'assets/images/3.svg',
      title: 'Data and Analytics',
      description: 'Turn data into insights to make smarter business decisions.',
    },
    {
      img: 'assets/images/4.svg',
      title: 'Security Services',
      description: 'Keep your systems secure with proactive security solutions.',
    },
    {
      img: 'assets/images/5.svg',
      title: 'Cloud Services',
      description: 'Access scalable, reliable cloud solutions for better business agility.',
    },
    {
      img: 'assets/images/6.png',
      title: 'Emerging Technologies',
      description: 'Implement cutting-edge technologies to drive innovation and growth.',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 2000,
    // navText: ['', ''],
    margin: 20,
    autoplay: true,
    autoplayTimeout: 2000, // 3 seconds per slide
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };

  activeIndex = 0; // Index of the currently active slide
  slideWidth = 180; // Width of a single slide in pixels
  autoSlideInterval: any; // Interval for auto-sliding

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval); // Clear the auto-slide interval when the component is destroyed
  }

  // Method to scroll the slider in a given direction
  scrollSlider(direction: 'left' | 'right') {
    if (direction === 'right') {
      // Move the active index forward, ensuring it wraps around to the first slide after the last one
      this.activeIndex = (this.activeIndex + 1) % this.services.length;
    } else if (direction === 'left') {
      // Move the active index backward, ensuring it wraps around to the last slide after the first one
      this.activeIndex = (this.activeIndex - 1 + this.services.length) % this.services.length;
    }
  }

  // // Method to start the auto sliding in one direction (right)
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      // Always move to the next slide in the same direction (right)
      this.activeIndex = (this.activeIndex + 1) % this.services.length;
    }, 3000); // Auto-slide every 3 seconds (3000 ms)
  }

  // // Method to get the translateX value for positioning the slider
  // get translateX() {
  //   return -(this.activeIndex * this.slideWidth); // This moves the slider based on activeIndex and slideWidth
  // }

  // Disable Left button when the active index is 0 (start of the list)
  // get isLeftDisabled() {
  //   return this.activeIndex === 0;
  // }

  // // Always enable the Right button for continuous loop
  // get isRightDisabled() {
  //   return false;
  // }
}
