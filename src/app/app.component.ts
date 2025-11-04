import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'website';

  constructor(private router: Router) {
  // this.router.events.subscribe(event => {
  //   if (event instanceof NavigationEnd) {
  //     window.scrollTo(0, 0);  // or scroll your custom container
  //   }
  // });
}

  // ngOnInit() {
  //   const loader = document.getElementById('app-loader');
  //   if (loader) {
  //     // Keep loader visible for 2.5s, then fade out
  //     document.body.style.overflow = 'hidden';
  //     setTimeout(() => {
  //       loader.classList.add('fade-out');

  //       // Remove it completely after fade animation (1s transition)
  //       setTimeout(() => {
  //       loader.remove();
  //       document.body.style.overflow = 'auto';
  //     }, 1200);

  //     }, 10000);
  //   }
  // }

  // ngOnInit() {
  //   const loader = document.getElementById('app-loader');
  //   if (loader) {
  //     document.body.style.overflow = 'hidden';

  //     setTimeout(() => {
  //       loader.classList.add('exit');

  //       setTimeout(() => {
  //         loader.remove();
  //         document.body.style.overflow = 'auto';
  //       }, 1200);
  //     }, 2000);
  //   }
  // }

  // ngOnInit() {
  //   const loader = document.getElementById('app-loader');
  //   if (loader) {
  //     // Disable page scrolling while loading
  //     document.body.style.overflow = 'hidden';

  //     // Hide loader after 2 seconds with exit animation
  //     setTimeout(() => {
  //       loader.classList.add('exit');

  //       // Remove loader from DOM and restore scrolling after exit animation
  //       setTimeout(() => {
  //         loader.remove();
  //         document.body.style.overflow = 'auto';
  //       }, 1200); // match exit animation duration
  //     }, 200000);
  //   }
  // }

  // PREFECT

  //   ngAfterViewInit() {
  //     const loader = document.getElementById('loader');
  //     if (loader) {
  //       document.body.style.overflow = 'hidden'; // disable scrolling

  //       // Keep loader visible for 30 seconds
  //    setTimeout(() => {
  //   loader.classList.add('exit'); // trigger Netflix-style exit

  //   setTimeout(() => {
  //     loader.remove();
  //     document.body.style.overflow = 'auto';
  //   }, 1000); // match exit animation duration
  // }, 8000); // 30 seconds
  //     }
  //   }

  // nnew try

  ngOnInit() {
    const loader = document.getElementById('loader-container');

    if (loader) {
      // Disable scrolling while loader is active
      document.body.style.overflow = 'hidden';

      // Keep loader visible for 3 seconds (3000ms)
      // Change to 30000 for 30 seconds
      setTimeout(() => {
        loader.classList.add('fade-out');

        // Re-enable scrolling and show content
        document.body.style.overflow = 'auto';
        document.body.classList.add('loaded');

        // Remove loader from DOM after fade-out transition
        setTimeout(() => loader.remove(), 800); // Match CSS transition duration
      }, 4000);
    }
  }


}
