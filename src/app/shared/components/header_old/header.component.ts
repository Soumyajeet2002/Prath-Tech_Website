import { Component } from '@angular/core';
// import{ RouterModule } from '@angular/router';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // products = [
  //   { name: 'Shakhyam', link: '/products/sakhyam' },
  //   { name: 'Grievance', link: '/products/grievance' },
  //   { name: 'DMS', link: './products/document-m-system' },
  //   { name: 'Shameekhsha', link: '/products/shameekhsha' },
  // ];

  // erp = [
  //   { name: 'Total-ES', link: '/erp/total-es' },
  //   { name: 'E-HRMs', link: '/erp/e-hrms' },
  // ];

  // industries = [
  //   { name: 'Education', link: '/industries/education' },
  //   { name: 'Government', link: '/industries/government' },
  //   { name: 'Healthcare', link: '/industries/healthcare' },
  //   { name: 'Ad Commerce', link: '/industries/ad-commerce' },
  //   { name: 'Energy & Utility', link: '/industries/energy-utility' },
  // ];

  // services = [
  //   { name: 'Website Development', link: '/services/website-development' },
  //   { name: 'Application Development', link: '/services/application-development' },
  //   { name: 'Consultation & Managed Services', link: 'services/consultation-services' },
  //   { name: 'Data and Analytics', link: '/services/data-analytics' },
  //   { name: 'Security / DevSecOps', link: '/services/security' },
  //   { name: 'Cloud Services', link: '/services/cloud-services' },
  //   { name: 'Emerging Technologies', link: '/services/emerging-tech' },
  // ];


  // try 

 isMenuOpen = false;
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


ngOnInit() {
  this.checkScreenSize();
}

@HostListener('window:resize')
checkScreenSize() {
  this.isMobile = window.innerWidth <= 768;
}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
  if (!this.isMenuOpen) {
    this.openDropdown = null;
  }
}

handleDropdownClick(menu: string, event: MouseEvent) {
  if (this.isMobile) {
    event.preventDefault();
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }
}

// isMenuOpen = false;

  dropdownState = {
    platform: false,
    industries: false,
    services: false
  };

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }

  toggleDropdown(type: 'platform' | 'industries' | 'services') {
    this.dropdownState[type] = !this.dropdownState[type];
  }
}
