// $(function () {

//   let cards = gsap.utils.toArray(".stackCard");

//   let stickDistance = 0;

//   let firstCardST = ScrollTrigger.create({
//     trigger: cards[0],
//     start: "center center"
//   });

//   let lastCardST = ScrollTrigger.create({
//     trigger: cards[cards.length - 1],
//     start: "center center"
//   });

//   cards.forEach((card, index) => {

//     var scale = 1 - (cards.length - index) * 0.025;
//     let scaleDown = gsap.to(card, { scale: scale, 'transform-origin': '"50% ' + (lastCardST.start + stickDistance) + '"' });

//     ScrollTrigger.create({
//       trigger: card,
//       start: "center center",
//       end: () => lastCardST.start + stickDistance,
//       pin: true,
//       markers: false,
//       pinSpacing: false,
//       ease: "none",
//       animation: scaleDown,
//       toggleActions: "restart none none reverse"
//     });
//   });

// }

// );


// $(function () {

//   let nav = $("#globalStickyNav");

//   nav.hide();

//   ScrollTrigger.create({
//     start: 50,
//     onEnter: () => nav.fadeIn(200),
//     onLeaveBack: () => nav.fadeOut(200)
//   });

// });

// Jeet Testing Nav-bar sticky hide/show

$(function () {

    const nav = $("#globalStickyNav");

    // Initial state
    gsap.set(nav, {
        autoAlpha: 0,
        y: -20,
        pointerEvents: "none"
    });

    ScrollTrigger.create({
        start: 50,
        onEnter: showNav,
        onEnterBack: showNav,
        onLeaveBack: hideNav
    });

    function showNav() {
        gsap.to(nav, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            pointerEvents: "auto",
            overwrite: true
        });
    }

    function hideNav() {
        gsap.to(nav, {
            autoAlpha: 0,
            y: -20,
            duration: 0.4,
            ease: "power3.in",
            pointerEvents: "none",
            overwrite: true
        });
    }

    ScrollTrigger.refresh();

});

$(function () {

  const nav = $("#mainNav");
  const navHeight = nav.outerHeight();

  $("<div/>", {
    class: "nav-spacer",
    height: navHeight
  }).insertBefore(nav).hide();

  ScrollTrigger.create({
    start: navHeight,
    end: "max",

    onEnter: () => {
      nav.addClass("is-sticky");
      $(".nav-spacer").show();
    },

    onEnterBack: () => {
      nav.addClass("is-sticky");
      $(".nav-spacer").show();
    },

    onLeaveBack: () => {
      nav.removeClass("is-sticky");
      $(".nav-spacer").hide();
    }
  });
});
// added (trupti)
$(function () {

  const hamburger = $("#hamburger");
  const menu = $("#menu");

  hamburger.on("click", function () {
    const isExpanded = hamburger.attr("aria-expanded") === "true";

    // Toggle state
    hamburger.attr("aria-expanded", !isExpanded);
    menu.attr("aria-hidden", isExpanded);

    // Toggle class (optional for styling)
    menu.toggleClass("open");
  });

});

$(function () {

  function loadCaptcha() {
    $.ajax({
      url: "generate_captcha",
      type: "GET",
      dataType: "json",
      success: function (res) {
        $("#captchaCode").text(res.captcha);
      }
    });
  }

  // Load captcha when page loads
  loadCaptcha();

  // Refresh captcha on button click
  $("#refreshCaptcha").off("click").on("click", function () {
    loadCaptcha();
  });

});


gsap.registerPlugin(ScrollTrigger);

// Loader
$(function () {

  const overlay = document.querySelector(".shape-overlays");
  const paths = document.querySelectorAll(".shape-overlays__path");

  let numPoints = 10;
  let numPaths = paths.length;
  let delayPointsMax = 0.3;
  let delayPerPath = 0.25;
  let duration = 0.9;
  let isOpened = true;
  let pointsDelay = [];
  let allPoints = [];

  let tl = gsap.timeline({
    onUpdate: render,
    defaults: {
      ease: "power2.inOut",
      duration: duration
    }
  });

  // Create points
  for (let i = 0; i < numPaths; i++) {
    let points = [];
    allPoints.push(points);

    for (let j = 0; j < numPoints; j++) {
      points.push(100);
    }
  }

  function toggle() {
    console.log(document.querySelector(".loader-logo"));
    tl.progress(0).clear();

    for (let i = 0; i < numPoints; i++) {
      pointsDelay[i] = Math.random() * delayPointsMax;
    }

    for (let i = 0; i < numPaths; i++) {
      let points = allPoints[i];
      let pathDelay = delayPerPath * (isOpened ? i : (numPaths - i - 1));

      for (let j = 0; j < numPoints; j++) {
        tl.to(points, {
          [j]: isOpened ? 0 : 100
        }, pointsDelay[j] + pathDelay);
      }
    }
  }

  function render() {
    for (let i = 0; i < numPaths; i++) {

      let path = paths[i];
      let points = allPoints[i];

      let d = "";

      d += isOpened
        ? `M 0 0 V ${points[0]} C`
        : `M 0 ${points[0]} C`;

      for (let j = 0; j < numPoints - 1; j++) {
        let p = (j + 1) / (numPoints - 1) * 100;
        let cp = p - (100 / (numPoints - 1)) / 2;

        d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
      }

      d += isOpened
        ? ` V 100 H 0`
        : ` V 0 H 0`;

      path.setAttribute("d", d);
    }
  }

  // Show loader immediately
  toggle();


  const logoTl = gsap.timeline();

  logoTl
    .fromTo(
      ".loader-logo",
      {
        opacity: 0,
        scale: 0.2,
        y: 80,
        filter: "blur(40px)"
      },
      {
        opacity: 1,
        scale: 2,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out"
      }
    )
    .to(".loader-logo", {
      y: 0,
      duration: 0.2,
      scale: 2,
      // repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  $(window).on("load", function () {

    // Premium logo exit animation
    setTimeout(function () {

      gsap.timeline()

        // Small anticipation
        .to(".loader-logo", {
          scale: 2,
          rotation: 0,
          duration: 0.25,
          ease: "power2.out"
        })

        // Energy burst
        .to(".loader-logo", {
          scale: 6,
          rotation: -8,
          opacity: 0,
          filter: "blur(80px)",
          duration: 1,
          ease: "expo.in"
        });

    }, 1000);

    // Start wave AFTER logo burst
    setTimeout(function () {

      isOpened = false;
      toggle();

    }, 1800);

    setTimeout(function () {

      document.documentElement.classList.remove("loading");

      gsap.fromTo(
        "body > *:not(.shape-overlays):not(.loader-logo):not(.loader-scan):not(.loader-particles)",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );

      const particles =
        document.querySelectorAll(".particle");

      const exitTl = gsap.timeline({

        onComplete: function () {

          overlay.style.display = "none";

          document.querySelector(".loader-logo").remove();
          document.querySelector(".loader-scan").remove();
          document.querySelector(".loader-particles").remove();

          setTimeout(() => {
            ScrollTrigger.refresh(true);
          }, 100);
        }
      });

      /* Wave fades */

      exitTl.to(overlay, {

        opacity: 0,
        duration: 1,
        ease: "power2.out"

      }, 0);

    }, 2000);

  });
});



// TOOLTIP FOLLOW CURSOR
function initCursorTooltip() {

    const tooltip = document.getElementById("cursorTooltip");

    if (!tooltip) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.querySelectorAll(".tooltip-follow").forEach(el => {

        el.addEventListener("mouseenter", () => {

            tooltip.textContent =
                el.dataset.tooltip || "Tooltip";

            tooltip.classList.add("show");

        });

        el.addEventListener("mouseleave", () => {

            tooltip.classList.remove("show");

        });

        el.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY + 30;

        });

    });

    function animateTooltip() {

        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        tooltip.style.left = currentX + "px";
        tooltip.style.top = currentY + "px";

        requestAnimationFrame(animateTooltip);

    }

    animateTooltip();
}

$(function () {
    initCursorTooltip();
});




// Floating Scrollbar
$(function () {

    const $thumb = $('.floating-scroll-thumb');

    function updateScrollbar() {

        const docHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        const thumbHeight = Math.max(
            (viewportHeight / docHeight) * viewportHeight,
            60
        );

        const maxMove = viewportHeight - thumbHeight;

        const scrollPercent =
            scrollTop / (docHeight - viewportHeight);

        $thumb.css({
            height: thumbHeight + 'px',
            transform: `translateY(${scrollPercent * maxMove}px)`
        });
    }

    $(window).on('scroll resize', updateScrollbar);

    updateScrollbar();

});

