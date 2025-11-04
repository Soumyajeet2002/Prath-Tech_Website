import { Component, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // isMenuOpen = false;
  openDropdown: string | null = null;
  isMobile = false;

  products = [
    { name: 'Shakhyam', link: '/products/sakhyam' },
    { name: 'Grievance', link: '/products/grievance' },
    { name: 'DMS', link: '/products/document-m-system' },
    { name: 'Shameekhsha', link: '/products/shameekhsha' },
  ];

  erp = [
    { name: 'Total-ES', link: '/erp/total-es' },
    { name: 'E-HRMs', link: '/erp/e-hrms' },
  ];

  industries = [
    { name: 'Education', link: '/industries/education' },
    { name: 'Government', link: '/industries/government' },
    { name: 'Healthcare', link: '/industries/healthcare' },
    { name: 'Ad Commerce', link: '/industries/ad-commerce' },
    { name: 'Energy & Utility', link: '/industries/energy-utility' },
  ];

  services = [
    { name: 'Website Development', link: '/services/website-development' },
    { name: 'Application Development', link: '/services/application-development' },
    { name: 'Consultation & Managed Services', link: '/services/consultation-services' },
    { name: 'Data and Analytics', link: '/services/data-analytics' },
    { name: 'Security / DevSecOps', link: '/services/security' },
    { name: 'Cloud Services', link: '/services/cloud-services' },
    { name: 'Emerging Technologies', link: '/services/emerging-tech' },
  ];

  dropdownState = {
    platform: false,
    industries: false,
    services: false,
  };

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.closeMenu();
      this.openDropdown = null;
    }
  }

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  //   if (!this.isMenuOpen) {
  //     this.openDropdown = null;
  //   }
  // }

  // closeMenu() {
  //   this.isMenuOpen = false;
  // }

  toggleDropdown(type: 'platform' | 'industries' | 'services') {
    this.dropdownState[type] = !this.dropdownState[type];
  }

  handleDropdownClick(menu: string, event: MouseEvent) {
    if (this.isMobile) {
      event.preventDefault();
      this.openDropdown = this.openDropdown === menu ? null : menu;
    }
  }

  ngAfterViewInit() {
    AOS.init({
      once: false, // enable repeated animations on tab change
      duration: 800,
    });
  }

  isMenuOpen = false;
  menuClosing = false;

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.isMenuOpen = true;
    }
  }

  closeMenu() {
    this.menuClosing = true;
    setTimeout(() => {
      this.menuClosing = false;
      this.isMenuOpen = false;
    }, 500); // match duration of open menu transition
  }

  // new tooltip added for logo
  tooltipX = 0;
  tooltipY = 0;
  showTooltip = false;

  onMouseMove(event: MouseEvent) {
    this.showTooltip = true;
    this.tooltipX = event.clientX + 10; // 10px offset to the right of the cursor
    this.tooltipY = event.clientY + 10; // 10px offset below the cursor
  }

  onMouseLeave() {
    this.showTooltip = false;
  }
}
