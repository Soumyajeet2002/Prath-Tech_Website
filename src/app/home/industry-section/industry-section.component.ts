import {
  Component,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-industry-section',
  templateUrl: './industry-section.component.html',
  styleUrls: ['./industry-section.component.scss'],
})
export class IndustrySectionComponent implements AfterViewInit {
  @ViewChildren('zone') zones!: QueryList<ElementRef>;

  activeClass = 'active';
  activeIndex = 0;
  mobileView = false;
  autoSlideInterval: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {

    const zonesArray = this.zones.toArray();

    // if (window.innerWidth <= 768) {
    //   this.mobileView = true;
    //   this.startAutoSlide();
    // }

    // Hover interactions for desktop
    zonesArray.forEach((zone, index) => {
      const el = zone.nativeElement;

      this.renderer.listen(el, 'mouseenter', () => {
        if (!this.mobileView) {
          this.setActiveZoneByIndex(index, false); // Temporarily highlight hovered zone
        }
      });

      this.renderer.listen(el, 'mouseleave', () => {
        if (!this.mobileView) {
          this.setActiveZoneByIndex(this.activeIndex, false); // Restore original active slide
        }
      });
    });

    // Set initial active zone
    this.setActiveZoneByIndex(this.activeIndex);
  }

  /**
   * Set active class to the zone at the given index.
   * @param index Index of the zone to activate
   * @param updateIndex Whether to update the main activeIndex (default: true)
   */
  private setActiveZoneByIndex(index: number, updateIndex: boolean = true): void {
    const zonesArray = this.zones.toArray();

    zonesArray.forEach((zone, i) => {
      if (i === index) {
        this.renderer.addClass(zone.nativeElement, this.activeClass);
      } else {
        this.renderer.removeClass(zone.nativeElement, this.activeClass);
      }
    });

    if (updateIndex) {
      this.activeIndex = index;
    }
  }

  private scrollToActiveZone(): void {
    const activeZone = this.zones.toArray()[this.activeIndex];
    if (activeZone) {
      activeZone.nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
    }
  }

  nextZone(): void {
    this.stopAutoSlide();
    const total = this.zones.length;
    const nextIndex = (this.activeIndex + 1) % total;
    this.setActiveZoneByIndex(nextIndex);
    this.scrollToActiveZone();
  }

  prevZone(): void {
    this.stopAutoSlide();
    const total = this.zones.length;
    const prevIndex = (this.activeIndex - 1 + total) % total;
    this.setActiveZoneByIndex(prevIndex);
    this.scrollToActiveZone();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextZone();
    }, 5000); // Every 5 seconds
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }




  //trying owl-carousel
  services = [
  {
    title: 'Education',
    description: 'We build digital tools that make learning more engaging and efficient.',
    img: 'assets/images/Education (2).png', // Add image if needed
    class: 'education active',
  },
  {
    title: 'Govt Services',
    description: 'We streamline systems to make public services faster and more user-friendly.',
    img: 'assets/images/Govt Services.png',
    class: 'govt',
  },
  {
    title: 'Healthcare',
    description: 'We simplify tech so healthcare teams can focus on patient care.',
    img: 'assets/images/Healthcare.png',
    class: 'healthcare',
  },
  {
    title: 'Energy & Utility',
    description: 'We optimize operations with smart tech to save time and resources.',
    img: 'assets/images/Energy & Utility.png',
    class: 'energy',
  }
];


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    // navText: ['', ''],
    margin: 20,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
}
