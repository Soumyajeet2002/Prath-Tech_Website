import { Component } from '@angular/core';

@Component({
  selector: 'app-website-development',
  templateUrl: './website-development.component.html',
  styleUrl: './website-development.component.scss'
})
export class WebsiteDevelopmentComponent {


// This section id for the Build Your Brand section 


// function getElement<T extends HTMLElement>(id: string): T | null {
//   return document.getElementById(id) as T | null;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const ctaButton = getElement<HTMLButtonElement>("ctaButton");
//   ctaButton?.addEventListener("click", () => {
//     alert("Let's start shaping your brand!");
//   });
// }); 



// This section is for the Your Business Goals section 


//  solutions: SolutionCard[] = [
//   {
//     title: "Web portals",
//     description:
//       "STL's web portal solutions bring together disparate touchpoints and processes into a single unified platform...",
//     image: "icons/web-portal.png",
//   },
//   {
//     title: "Static Websites",
//     description:
//       "STL delivers fast, secure, and cost-effective static website development solutions...",
//     image: "icons/static-site.png",
//   },
//   {
//     title: "Ecommerce",
//     description:
//       "STL provides responsive, scalable, secure website development services for platforms like Magento, WooCommerce...",
//     image: "icons/ecommerce.png",
//   },
//   {
//     title: "Web apps",
//     description:
//       "STL offers end-to-end custom web application development services, including consultation, design, development...",
//     image: "icons/web-app.png",
//   },
// ];



//  the section for Roadmap starts here 

onTalkClick() {
    console.log('Let’s Talk button clicked!');
    // You can navigate, open modal, or trigger any action
  }


  //the section for All in one 
  currentIndex = 0;
  totalCards = 4; // Update if you add more

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
  }


}
