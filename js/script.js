$(function() {

  let cards = gsap.utils.toArray(".stackCard");

  let stickDistance = 0;

  let firstCardST = ScrollTrigger.create({
    trigger: cards[0],
    start: "center center"
  });

  let lastCardST = ScrollTrigger.create({
    trigger: cards[cards.length-1],
    start: "center center"
  });

  cards.forEach((card, index) => {

    var scale = 1 - (cards.length - index) * 0.025;
    let scaleDown = gsap.to(card, {scale: scale, 'transform-origin': '"50% '+ (lastCardST.start + stickDistance) +'"' });

    ScrollTrigger.create({
      trigger: card,
      start: "center center",
      end: () => lastCardST.start + stickDistance,
      pin: true,
      markers: false,
      pinSpacing: false,
      ease: "none",
      animation: scaleDown,
      toggleActions: "restart none none reverse"
    });
  });

}

);


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

  // Always start hidden (no flash)
  gsap.set(nav, { autoAlpha: 0, display: "none" });

  ScrollTrigger.create({
    start: 50,
    end: "max",
    onEnter: showNav,
    onEnterBack: showNav,
    onLeaveBack: hideNav,
    onLeave: hideNav
  });

  function showNav() {
    if (nav.is(":visible")) return; // prevent double calls

    gsap.to(nav, {
      autoAlpha: 1,
      display: "block",
      duration: 0.2,
      overwrite: "auto",
      ease: "power1.out"
    });
  }

  function hideNav() {
    if (!nav.is(":visible")) return;

    gsap.to(nav, {
      autoAlpha: 0,
      duration: 0.2,
      overwrite: "auto",
      onComplete: () => nav.css("display", "none")
    });
  }

  // 🔥 Force recalculation after load
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









