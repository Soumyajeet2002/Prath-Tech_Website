// gsap.registerPlugin(ScrollTrigger);

// let panels = gsap.utils.toArray(".feature-panel");

// gsap.to(".feature-track",{

//     xPercent:-100 * (panels.length-1),

//     ease:"none",

//     scrollTrigger:{

//         trigger:".ehrms-features",

//         pin:true,

//         scrub:1,

//         snap:1/(panels.length-1),

//         end:()=>"+=" + window.innerWidth*(panels.length-1)

//     }

// });

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".feature-panel");

// Initial State
gsap.set(panels, {
    yPercent: 100,
    scale: 1,
    opacity: 1,
    zIndex: (i) => i + 1
});

// First panel visible
gsap.set(panels[0], {
    yPercent: 0
});

// Master Timeline
const tl = gsap.timeline({

    scrollTrigger: {

        trigger: ".ehrms-features",
        start: "top top",
        end: "+=" + (window.innerHeight * (panels.length - 1)),
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 2,
        invalidateOnRefresh: true

    }

});


// Build timeline
panels.forEach((panel, index) => {

    if (index === 0) return;

    // New card comes from bottom
    tl.to(panel, {

        yPercent: 0,

        duration: 1,

        ease: "power2.out"

    });

    // Previous card shrinks
    tl.to(panels[index - 1], {

        scale: 0.96,

        y: -20,

        opacity: 0.9,

        duration: 1,

        ease: "none"

    }, "<");

});




// Solutions for section
const swiper = new Swiper(".solutionsSwiper", {

    loop: true,

    grabCursor: true,

    centeredSlides: false,

    speed: 2000,

    spaceBetween: 20,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true
    // },

    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    // },

    breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 20
        },
        576: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2.2,
            spaceBetween: 25
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }

});

