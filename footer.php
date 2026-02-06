 <footer>
   <div class="container custom-footer">
     <div class="row">
       <!-- Left -->
       <div class="col-xl-6 col-md-12">
         <div class="footer-left">
           <h1>
             Whether you need a robust enterprise application or a complete
             IT infrastructure overhaul,
           </h1>
           <h5>we’re here to make it happen.</h5>
           <div class="footer-socials">
             <!-- <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-x-twitter"></i></a> -->
             <a href="https://www.linkedin.com/company/prath-technologies-private-limited" target="_blank"><i
                 class="fa-brands fa-linkedin-in"></i></a>
             <!--  <a href="#"><i class="fab fa-instagram"></i></a> -->
           </div>
         </div>
       </div>

       <!-- Middle -->
       <div class="col-xl-3 col-md-6">
         <div class="footer-middle">
           <h5>Quick links</h5>
           <div class="footer-links">
             <a href="index.php">Home</a>
             <a href="about.php">About Us</a>
             <a href="ourservices.php">Our Services</a>
             <!-- <a href="hrms.php">Our Innovation</a> -->
             <a href="career.php">Career</a>
             <a href="contact.php">Contact Us</a>
             <a href="contact.php">Get Started</a>
           </div>
         </div>
       </div>

       <!-- Right -->
       <div class="col-xl-3 col-md-6">
         <div class="footer-right">
           <h5>Contact</h5>
           <p class="mb-3">sales@prathtech.com</p>
           <p class="mb-3">+91 7008412478</p>
           <p>
             A/22, 1st Floor, Falcon House, Cuttack Road, Bhubaneswar,
             Odisha, India - 751006
           </p>
         </div>
       </div>
     </div>
   </div>

   <div class="container custom-footer-bottom">
     <div class="row">
       <hr />
       <div class="col-lg-6 col-md-12 mb-2 footercopyright">
         © 2026 PrathTech. All Rights Reserved
       </div>
       <div class="col-lg-6 col-md-12 mb-2 footerpolicylinks">
         <a href="privacy-policy.php">Privacy Policy</a>
         <a href="disclaimer.php">Disclaimer</a>
       </div>
     </div>
   </div>
 </footer>


 <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
 <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js'></script>

 <!--  <script  src="./script.js"></script> -->
 <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/node-marquee@3.0.6/build/cdn/index.min.js"></script>
 <script src="js/script.js"></script>
 <script>
   AOS.init();

   $(document).ready(function() {



     const hamburger = document.getElementById("hamburger");
     const menu = document.getElementById("menu");
     const closeBtn = document.querySelector(".menu-close");

     // Toggle full menu
     hamburger.addEventListener("click", () => {
       menu.classList.toggle("open");
     });

     // Close on X button
     closeBtn.addEventListener("click", () => {
       menu.classList.remove("open");
     });

     // Auto-close when clicking a link (except dropdown toggles)
     document.querySelectorAll("#menu a.nav-link").forEach((link) => {
       if (!link.classList.contains("mobile-toggle")) {
         link.addEventListener("click", () => {
           menu.classList.remove("open");
         });
       }
     });

     // Mobile dropdown toggles
     document.querySelectorAll(".mobile-toggle").forEach((toggle) => {
       toggle.addEventListener("click", () => {
         const dropdown = toggle.nextElementSibling;
         dropdown.classList.toggle("open");
       });
     });




     /* $(".servicetext-carousel").owlCarousel({
        autoplay: true,
        loop: true,
        margin: 15,
        dots: false,
        slideTransition: "linear",
        autoplayTimeout:2500,
        autoplayHoverPause: false,
        autoplaySpeed: 5500,
        responsive: {
           0: {
              items: 2
           },
           500: {
              items: 2
           },
           600: {
              items: 2
           },
           800: {
              items: 2
           },
           1400: {
              items: 3
           },
           1600:{
             items: 4
           }
        }
        }); */
     // $('#textTicker').owlCarousel({
     //     loop: true,
     //     margin: 10,
     //     items: 5,
     //     autoplay: true,
     //     autoplayTimeout: 0,      // continuous scroll
     //     autoplaySpeed: 12000,    // adjust speed
     //     smartSpeed: 12000,
     //     slideTransition: 'linear',
     //     dots: false,
     //     nav: false,
     //     autoplayHoverPause: false,  // <- IMPORTANT (no stop on hover)
     //     responsive:{
     //       0:{ items:1 },
     //       480:{ items:2 },
     //       768:{ items:3 },
     //       1024:{ items:5 }
     //     }
     //   });

     nodeMarquee({
       parent: '.textticker',
       speed: 1
     });

     gsap.registerPlugin(ScrollTrigger);

     /**
      * Splits an element's text into visual lines based on its rendered layout.
      */
     function splitIntoLines(el) {
       const text = el.textContent.trim();
       const words = text.split(/\s+/);
       el.innerHTML = "";

       // Wrap each word in span.word
       const frag = document.createDocumentFragment();
       words.forEach((w, i) => {
         const span = document.createElement("span");
         span.className = "word";
         span.textContent = w + (i < words.length - 1 ? " " : "");
         frag.appendChild(span);
       });
       el.appendChild(frag);

       const wordEls = Array.from(el.querySelectorAll(".word"));
       const groups = [];
       const tolerance = 3;

       // Group words by visual top
       wordEls.forEach(w => {
         const top = Math.round(w.getBoundingClientRect().top);
         let g = groups.find(gr => Math.abs(gr.top - top) <= tolerance);
         if (!g) {
           g = {
             top,
             words: []
           };
           groups.push(g);
         }
         g.words.push(w);
       });

       groups.sort((a, b) => a.top - b.top);

       // Wrap each line
       el.innerHTML = "";
       const lines = groups.map(g => {
         const line = document.createElement("span");
         line.className = "line";
         g.words.forEach(w => line.appendChild(w));
         el.appendChild(line);
         return line;
       });
       return lines;
     }

     /**
      * Sets up scroll animations for all elements with .split
      */
     function setupSplitAnimations() {
       document.querySelectorAll(".split").forEach(el => {
         // Clean any old content (on resize re-init)
         el.style.visibility = "hidden";

         const lines = splitIntoLines(el);
         gsap.set(lines, {
           yPercent: 100,
           opacity: 0
         });
         el.style.visibility = "visible";

         gsap.to(lines, {
           yPercent: 0,
           opacity: 1,
           duration: 2.5,
           ease: "power4.out",
           stagger: 0.25,
           scrollTrigger: {
             trigger: el,
             start: "top 85%",
             toggleActions: "play none none reverse",
           }
         });
       });
     }

     // Initial setup
     setupSplitAnimations();

     // Re-split on resize (debounced)
     let resizeTimer;
     window.addEventListener("resize", () => {
       clearTimeout(resizeTimer);
       resizeTimer = setTimeout(() => {
         ScrollTrigger.getAll().forEach(t => t.kill());
         setupSplitAnimations();
       }, 150);
     });




     // Generic WOW.js-style function
     function gsapWow(selector, animation) {
       document.querySelectorAll(selector).forEach(el => {
         el.style.visibility = "visible";
         gsap.from(el, {
           ...animation,
           opacity: 0,
           duration: 1.2,
           ease: "power3.out",
           scrollTrigger: {
             trigger: el,
             start: "top 85%",
             toggleActions: "play none none reverse"
           }
         });
       });
     }

     // Animate different classes like WOW.js
     gsapWow(".animate-fade-up", {
       y: 60
     });
     gsapWow(".animate-slide-left", {
       x: -80
     });
     gsapWow(".animate-slide-right", {
       x: 80
     });
     gsapWow(".animate-zoom-in", {
       scale: 0.8
     });


     function setupWordFadeColorAnimation() {
       document.querySelectorAll(".color-animate").forEach(el => {
         // Split text into words and wrap each in a span
         const words = el.textContent.trim().split(/\s+/);
         el.innerHTML = "";
         words.forEach((word, i) => {
           const span = document.createElement("span");
           span.textContent = word + (i < words.length - 1 ? " " : "");
           el.appendChild(span);
         });

         const wordSpans = el.querySelectorAll("span");

         // GSAP animation: fade + color change
         gsap.to(wordSpans, {
           opacity: 1,
           color: "#000",
           duration: 0.8,
           ease: "power2.out",
           stagger: 0.2,
           scrollTrigger: {
             trigger: el,
             start: "top 85%", // triggers when the element enters viewport
             toggleActions: "play none none reverse",
             once: false, // set to true if you want it to run only once
           }
         });
       });
     }

     // Initialize
     setupWordFadeColorAnimation();


   });
 </script>

 <!--Start of Tawk.to Script-->
 <!-- <script type="text/javascript">
   var Tawk_API = Tawk_API || {},
     Tawk_LoadStart = new Date();
   (function() {
     var s1 = document.createElement("script"),
       s0 = document.getElementsByTagName("script")[0];
     s1.async = true;
     s1.src = 'https://embed.tawk.to/697b3d0e28cc321c33ed9fb9/1jg4md0ts';
     s1.charset = 'UTF-8';
     s1.setAttribute('crossorigin', '*');
     s0.parentNode.insertBefore(s1, s0);
   })();
 </script> -->

 <!--End of Tawk.to Script-->


 <!-- This is the trail script for Chat bot -->
 <!-- <script>window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}</script><script id="zsiqscript" src="https://salesiq.zohopublic.in/widget?wc=siq9c373f7e89a6a8092b7fc2a992bca4c5c1f8174c3562a2395b91a95f4b490959" defer></script> -->

 <!-- our innovation page start  -->

 <script src="js/swiper-bundle.min.js"></script>
 <!-- <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js'></script>
 <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'></script> -->
 <script src="./script.js"></script>
 <script src="js/script.js"></script>

 <!-- Test SCript for banner section -->
 <script>
   if ($(window).width() > 780) {
     $(".paralax__animation").mousemove(function(e) {
       $("[data-depth]").each(function() {
         var depth = $(this).data("depth");
         var amountMovedX = (e.pageX * -depth) / 4;
         var amountMovedY = (e.pageY * -depth) / 4;

         $(this).css({
           transform: "translate3d(" +
             amountMovedX +
             "px," +
             amountMovedY +
             "px, 0)",
         });
       });
     });
   }
 </script>

 <script>
   var swiper = new Swiper(".mySwiper", {
     effect: "cards",
     grabCursor: true,
     mousewheel: {
       invert: false,
     },
     autoplay: {
       delay: 3000,
     },
   });
 </script>


 <script src="js/jarallax.js"></script>

 <!-- Script for Product page  -->
 <script>
   //Details Product Gallery
   var swiper = new Swiper(".details__gallery", {
     spaceBetween: 10,
     slidesPerView: 5,
     freeMode: true,
     watchSlidesProgress: true,
   });
   var swiper2 = new Swiper(".details__gallery__big", {
     spaceBetween: 10,
     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
     thumbs: {
       swiper: swiper,
     },
   });
 </script>

 <script>
   var buttonsPlus = document.querySelectorAll(".qty-btn-plus");
   var buttonsMinus = document.querySelectorAll(".qty-btn-minus");

   buttonsPlus.forEach(function(buttonPlus) {
     buttonPlus.addEventListener("click", function() {
       var $n = this
         .closest(".qty-container")
         .querySelector(".input-qty");
       $n.value = Number($n.value) + 1;
     });
   });

   buttonsMinus.forEach(function(buttonMinus) {
     buttonMinus.addEventListener("click", function() {
       var $n = this
         .closest(".qty-container")
         .querySelector(".input-qty");
       var amount = Number($n.value);
       if (amount > 1) {
         $n.value = amount - 1;
       }
     });
   });
 </script>
 <script>
   var swiper = new Swiper(".testimonial__3__slider__active", {
     grabCursor: true,
     pagination: {
       el: ".swiper-pagination",
       clickable: true,
     },
     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
     slidesPerView: 3,
     breakpoints: {
       350: {
         slidesPerView: 1,
       },
       575: {
         slidesPerView: 1,
       },

       768: {
         slidesPerView: 2,
       },

       992: {
         slidesPerView: 2,
       },
       1200: {
         slidesPerView: 3,
       },
       1500: {
         slidesPerView: 3,
       }
     },
   });
 </script>



 <!-- Header script for parent dropdown -->
 <script>
   document.addEventListener('DOMContentLoaded', function() {
     document.querySelectorAll('.dropdown-submenu > a').forEach(function(element) {
       element.addEventListener('click', function(e) {
         e.preventDefault();
         e.stopPropagation();

         let submenu = this.nextElementSibling;
         submenu.classList.toggle('show');
       });
     });
   });
 </script>



 <!-- our innovation page end  -->
 </body>

 </html>