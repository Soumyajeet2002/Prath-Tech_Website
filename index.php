<?php
$currentPage = basename($_SERVER['PHP_SELF'], ".php");
$apiPage = ($currentPage === 'index') ? 'home' : $currentPage;

$seoApiUrl = "https://hrms.prathtech.com/api/method/get_seo_meta?page=" . urlencode($apiPage);

$seoData = [];

$ch = curl_init();
curl_setopt_array($ch, [
   CURLOPT_URL => $seoApiUrl,
   CURLOPT_RETURNTRANSFER => true,
   CURLOPT_FOLLOWLOCATION => true,
   CURLOPT_TIMEOUT => 15,
   CURLOPT_SSL_VERIFYPEER => false
]);

$seoResponse = curl_exec($ch);
curl_close($ch);

if ($seoResponse) {
   $seoJson = json_decode($seoResponse, true);

   if (isset($seoJson['message'])) {
      $seoData = is_array($seoJson['message'][0] ?? null)
         ? $seoJson['message'][0]
         : $seoJson['message'];
   }
}

/*
|--------------------------------------------------------------------------
| MAP API KEYS FLEXIBLY
|--------------------------------------------------------------------------
*/
$metaTitle = $seoData['meta_title']
   ?? $seoData['title']
   ?? $seoData['page_title']
   ?? 'Prath Technologies Pvt. Ltd.';

$metaDescription = $seoData['meta_description']
   ?? $seoData['description']
   ?? $seoData['seo_description']
   ?? 'Prath Technologies Pvt. Ltd.';

$metaKeywords = $seoData['meta_keywords']
   ?? $seoData['keywords']
   ?? $seoData['seo_keywords']
   ?? '';

$metaImage = $seoData['meta_image']
   ?? $seoData['image']
   ?? $seoData['seo_image']
   ?? 'https://prathtech.com/images/favicon.ico';

$canonicalUrl = "https://prathtech.com/" . ($currentPage === 'index' ? '' : $currentPage);
?>

<!DOCTYPE html>
<html lang="en">

<head>
   <title><?= htmlspecialchars($metaTitle) ?></title>

   <meta charset="utf-8" />
   <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon">
   <meta name="viewport" content="width=device-width, initial-scale=1" />

   <!-- Dynamic SEO Meta -->
   <meta name="description" content="<?= htmlspecialchars($metaDescription) ?>">
   <meta name="keywords" content="<?= htmlspecialchars($metaKeywords) ?>">
   <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl) ?>">

   <!-- Open Graph -->
   <meta property="og:title" content="<?= htmlspecialchars($metaTitle) ?>">
   <meta property="og:description" content="<?= htmlspecialchars($metaDescription) ?>">
   <meta property="og:image" content="<?= htmlspecialchars($metaImage) ?>">
   <meta property="og:url" content="<?= htmlspecialchars($canonicalUrl) ?>">
   <meta property="og:type" content="website">

   <!-- Twitter -->
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="<?= htmlspecialchars($metaTitle) ?>">
   <meta name="twitter:description" content="<?= htmlspecialchars($metaDescription) ?>">
   <meta name="twitter:image" content="<?= htmlspecialchars($metaImage) ?>">



   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
      rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
      rel="stylesheet">

   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
   <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
   <link rel="stylesheet" href="webFont/stylesheet.css">
   <link rel="stylesheet" href="css/owl.carousel.css" />
   <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
   <link href="css/style.css" rel="stylesheet" />
   <link href="css/responsive.css" rel="stylesheet" />


   <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
   <style>
      .widget-visible iframe {
         display: none;
      }
   </style>
   <link href="css/header-new.css" rel="stylesheet">




   <!-- Loader -->
   <style>
      html.loading,
      html.loading body {
         overflow: hidden;
      }

      /* html.loading body>*:not(.shape-overlays) {
         visibility: hidden;
      } */



      .shape-overlays {
         position: fixed;
         inset: 0;
         width: 100%;
         height: 100%;
         z-index: 999999;
         display: block;
      }

      html.loading body>*:not(.shape-overlays):not(.loader-logo) {
         opacity: 0;
      }

      body>*:not(.shape-overlays) {
         transition: opacity 0.4s ease;
      }
   </style>
   <script>
      document.documentElement.classList.add('loading');
   </script>
</head>

<body>



   <!-- LOADER START -->
   <div class="loader-logo">
      <div class="loader-scan"></div>
      <div class="loader-particles"></div>
      <img src="images/logo.svg" alt="Logo">
   </div>

   <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
         <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#edf7fa" />
            <stop offset="100%" stop-color="#b8d6e3" />
         </linearGradient>

         <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#b8d6e3" />
            <stop offset="100%" stop-color="#edf7fa" />
         </linearGradient>
      </defs>

      <path class="shape-overlays__path" fill="url(#gradient2)"></path>
      <path class="shape-overlays__path" fill="url(#gradient1)"></path>
   </svg>
   <!-- LOADER END -->



   <header class="home-header">
      <div class="container-fluid width80">
         <div class="row">
            <nav class="navbar navbar-expand-xl mainmenu">
               <a class="navbar-brand logodesktop tooltip-follow" href=" index" data-tooltip="Home"><img src="images/logo.svg" alt="PrathTech company logo"
                     height="100" /></a>
               <!-- <div id="cursorTooltip">Home</div> -->
               <!-- Hamburger Button (Mobile only) -->
               <!-- <button class="navbar-toggler d-xl-none" type="button" id="hamburger"> -->
               <button class="navbar-toggler d-xl-none" type="button" id="hamburger" aria-label="Open navigation menu"
                  aria-controls="menu" aria-expanded="false">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <!-- Desktop Menu -->
               <div class="collapse navbar-collapse d-none d-xl-block">
                  <ul class="navbar-nav ms-auto">
                     <li class="nav-item"><a class="nav-link active" href="index"> <i
                              class="bi bi-house-door me-2 nav-icon"></i> Home</a></li>
                     <li class="nav-item"><a class="nav-link" href="about"><i class="bi bi-people me-2 nav-icon"></i>
                           About Us</a></li>
                     <li class="nav-item"><a class="nav-link" href="ourservices"> <i
                              class="bi bi-gear me-2 nav-icon"></i> Our Services</a></li>
                     <!-- <ul class="menu">
                        <li class="menu-item has-submenu">
                           <a href="#">
                              <i class="bi bi-lightbulb me-2 nav-icon"></i>
                              Our Innovations
                              <i class="bi bi-chevron-down ms-2"></i>
                           </a>

                           <ul class="submenu">


                              <li class="menu-item has-submenu">
                                 <a href="#" class="new-li">
                                    <i class="bi bi-box-seam me-2"></i>
                                    Products
                                    <span class="arrow">
                                       <i class="bi bi-chevron-right ms-2"></i>
                                    </span>

                                 </a>
                                 <ul class="submenu">
                                    <li>
                                       <a href="hrms">
                                          <i class="bi bi-arrow-right-short me-2"></i> HRMS
                                       </a>
                                    </li>
                                    <li>
                                       <a href="#">
                                          <i class="bi bi-arrow-right-short me-2"></i> SMS
                                       </a>
                                    </li>
                                 </ul>
                              </li>


                              <li class="menu-item has-submenu">
                                 <a href="#" class="new-li">
                                    <i class="bi bi-diagram-3 me-2"></i>
                                    ERP
                                    <span class="arrow">
                                       <i class="bi bi-chevron-right ms-2"></i>
                                    </span>

                                 </a>
                                 <ul class="submenu">
                                    <li>
                                       <a href="#">
                                          <i class="bi bi-arrow-right-short me-2"></i> PSIL Electrical
                                       </a>
                                    </li>
                                    <li>
                                       <a href="#">
                                          <i class="bi bi-arrow-right-short me-2"></i> SGI
                                       </a>
                                    </li>
                                 </ul>
                              </li>


                              <li class="menu-item has-submenu">
                                 <a href="#" class="new-li">
                                    <i class="bi bi-gear me-2"></i>
                                    Solutions
                                    <span class="arrow">
                                       <i class="bi bi-chevron-right ms-2"></i>
                                    </span>

                                 </a>
                                 <ul class="submenu">
                                    <li><a href="#"><i class="bi bi-arrow-right-short me-2"></i> E-HRMS</a></li>
                                    <li><a href="#"><i class="bi bi-arrow-right-short me-2"></i> PMA</a></li>
                                    <li><a href="#"><i class="bi bi-arrow-right-short me-2"></i> SMA</a></li>
                                    <li><a href="#"><i class="bi bi-arrow-right-short me-2"></i> E-OFFICE</a></li>
                                    <li><a href="#"><i class="bi bi-arrow-right-short me-2"></i> GRIEVANCE</a></li>
                                    <li><a href="#"><i class="bi bi-arrow-right-short me-2"></i> E-BOOKING</a></li>
                                 </ul>
                              </li>

                           </ul>


                        </li>
                     </ul> -->
                     <li class="nav-item"><a class="nav-link" href="career"><i
                              class="bi bi-briefcase me-2 nav-icon"></i>Career</a></li>
                     <li class="nav-item"><a class="nav-link" href="contact"><i
                              class="bi bi-envelope me-2 nav-icon"></i>Contact Us</a></li>
                  </ul>
                  <div class="get_started_header" style="margin-left: 10px;">
                     <!-- <a class="btn" href="contact">Get Started<img src="images/blackarrow.png" alt="Arrow icon"></a> -->
                     <a class="btn" href="contact" aria-label="Get started with PrathTech services">
                        Get Started
                        <img src="images/blackarrow.png" alt="prathtech" aria-hidden="true">
                     </a>
                  </div>

                  <!-- Toggle theme button  -->
                  <!-- <li class="nav-item theme-toggle-item">
                     <button class="theme-toggle" id="themeToggleDesktop" aria-label="Toggle dark mode">
                        <span class="toggle-circle">
                           <svg class="icon-sun" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="5" />
                              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                           </svg>
                           <svg class="icon-moon" viewBox="0 0 24 24">
                              <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
                           </svg>
                        </span>
                     </button>
                  </li> -->
               </div>
            </nav>



            <!-- Sticky nav-bar test -->

            <!-- this nav added by trupti -->
            <nav id="globalStickyNav" class="navbar navbar-expand-xl mainmenu sticky">
               <div class="container">

                  <a class="navbar-brand logodesktop tooltip-follow" href="index" data-tooltip="Refresh Home">
                     <img src="images/logo.svg" alt="PrathTech company logo" height="100">
                  </a>
                  <div id="cursorTooltip">Home</div>

                  <!-- Mobile Toggle Button -->
                  <button class="navbar-toggler d-xl-none" type="button" data-bs-toggle="collapse"
                     data-bs-target="#stickyNavbar" aria-controls="stickyNavbar" aria-expanded="false"
                     aria-label="Toggle navigation">

                     <span class="navbar-toggler-icon"></span>
                  </button>

                  <!-- Navbar Menu -->
                  <div class="collapse navbar-collapse" id="stickyNavbar">

                     <ul class="navbar-nav ms-auto">

                        <li class="nav-item">
                           <a class="nav-link active" href="index">
                              <i class="bi bi-house-door me-2 nav-icon"></i>Home
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link" href="about">
                              <i class="bi bi-people me-2 nav-icon"></i>About Us
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link" href="ourservices">
                              <i class="bi bi-gear me-2 nav-icon"></i>Our Services
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link" href="career">
                              <i class="bi bi-briefcase me-2 nav-icon"></i>Career
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link" href="contact">
                              <i class="bi bi-envelope me-2 nav-icon"></i>Contact Us
                           </a>
                        </li>

                     </ul>

                     <div class="get_started_header ms-3">
                        <a class="btn" href="contact">
                           Get Started
                           <img src="images/blackarrow.png" alt="prathtech" aria-hidden="true">
                        </a>
                     </div>

                  </div>

               </div>
            </nav>


            <!-- New Test Nav-Bar manu -->



            <!--  -->

            <!-- Mobile Fullscreen Menu -->
            <div id="menu" class="d-xl-none">
               <div class="container-fluid mobilemenuheader">
                  <div class="row">
                     <div class="mobilelogo">
                        <a href="#"><img src="images/logo.svg" alt="PrathTech company logo" height="80" /></a>
                     </div>
                     <div>
                        <span class="menu-close"><img src="images/mobile-menu-close.png" alt="Close menu" /></span>
                     </div>
                  </div>
               </div>
               <ul class="list-unstyled mt-5 mobilenav">
                  <li><a class="nav-link" href="index">Home</a></li>
                  <li><a class="nav-link" href="about">About Us</a></li>
                  <li><a class="nav-link" href="ourservices">Our Services</a></li>
                  <!-- <li><a class="nav-link" href="hrms.php">Our Innovations</a></li> -->
                  <!-- <li class="nav-item dropdown">

                     <a class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Our Innovations
                     </a>

                     <ul class="dropdown-menu">

                       
                        <li class="dropdown-submenu">
                           <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">
                              <i class="bi bi-box-seam me-2"></i> Products
                           </a>
                           <ul class="dropdown-menu">
                              <li>
                                 <a class="dropdown-item" href="hrms">
                                    <i class="bi bi-arrow-right-short me-2"></i> HRMS
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item" href="#">
                                    <i class="bi bi-arrow-right-short me-2"></i> SMS
                                 </a>
                              </li>
                           </ul>
                        </li>

                        
                        <li class="dropdown-submenu">
                           <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">
                              <i class="bi bi-diagram-3 me-2"></i> ERP
                           </a>
                           <ul class="dropdown-menu">
                              <li>
                                 <a class="dropdown-item" href="#">PSIL Electrical</a>
                              </li>
                              <li>
                                 <a class="dropdown-item" href="#">SGI</a>
                              </li>
                           </ul>
                        </li>

                        
                        <li class="dropdown-submenu">
                           <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">
                              <i class="bi bi-gear me-2"></i> Solutions
                           </a>
                           <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">E-HRMS</a></li>
                              <li><a class="dropdown-item" href="#">PMA</a></li>
                              <li><a class="dropdown-item" href="#">SMA</a></li>
                              <li><a class="dropdown-item" href="#">E-OFFICE</a></li>
                              <li><a class="dropdown-item" href="#">GRIEVANCE</a></li>
                              <li><a class="dropdown-item" href="#">E-BOOKING</a></li>
                           </ul>
                        </li>

                     </ul>

                  </li> -->


                  <li><a class="nav-link" href="career">Career</a></li>
                  <li><a class="nav-link" href="contact">Contact Us</a></li>
               </ul>
               <div class="get_started_header" style="margin-left: 10px;">
                  <a class="btn" href="contact">Get Started <img src="images/arrow.png" alt="contact"></a>
               </div>
            </div>

         </div>
      </div>
   </header>

   <main id="siteRoot">
      <section class="homebanner">
         <div>
            <video width="100%" autoplay muted loop playsinline preload="auto" class="bannervideo">
               <source src="images/bannerVideo0.mp4" type="video/mp4" />
            </video>
         </div>
         <div class="bannercontent">
            <div class="container-fluid width80">
               <div class="row">
                  <!-- <h6>We Create</h6> -->
                  <h6>Future-Ready Innovation.</h6>
                  <div class="banner-h1-text desktop-home-hero-heading">
                     <h1>
                        Digital Solutions
                        <span>Digital Solutions</span>
                        <span>Digital Solutions</span>
                        <!-- <span>Let's Create Together</span> -->
                        <!-- <span>Let's Build Something Great</span> -->
                        <span>Built to Scale. Built to Perform.</span>
                     </h1>
                  </div>
                  <div class="mobile-home-hero-heading">
                     <h1>Digital Solutions</h1>
                  </div>
                  <!-- <div class=" homebannertext">Aligned Seamlessly With Your Vision</div> -->
                  <div class=" homebannertext">Turning Ideas Into Impact.</div>
               </div>
            </div>
         </div>
         <div class="bannerbottomImg"><img src="images/bannerBottom.png" alt="Decorative banner background design"
               style="width:100%"></div>

         <!-- <div class="scroll-indicator">
            <div class="scroll-mouse">
               <span></span>
            </div>
            <p>SCROLL</p>
         </div> -->
      </section>

      <section class="homeAbout_sction">
         <div class="parlgrm animate-slide-left"></div>
         <div class="container aboutContainer">
            <div class="row">
               <div class="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                  <div class="subheading">
                     Who We Are
                  </div>
               </div>
               <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12">
                  <div class="abouttexttop">
                     <h2 class="ftw400 split">We empower businesses to innovate, scale, and lead the digital future
                        through cutting-edge IT solutions, deep expertise, and end-to-end technology excellence.</h2>
                     <!-- <p class="abouttext-home split">With a robust in-house team of more than 120 engineers, architects, and developers, having more than 1,500 person-years of experience in providing end-to-end technology consulting, product engineering, and enterprise-grade software solutions.</p> -->
                  </div>
               </div>
            </div>
            <div class="row aboutbottomContainer">
               <div class="col-xl-7 col-lg-5" data-aos="zoom-in-up" data-aos-delay="100">
                  <img src="images/about.jpg" alt="PrathTech team working on digital solutions" class="homeaboutImage">
               </div>
               <div class="col-xl-5 col-lg-7 col-md-12 aboutstatsContent">
                  <p class="split">At PrathTech, we deliver cutting-edge IT solutions that empower businesses to
                     transform, scale, and stay ahead in the digital era. Backed by a highly experienced in-house team
                     of engineers, architects, and developers, we bring decades of combined technology expertise to
                     every engagement. From comprehensive technology consulting and product engineering to
                     enterprise-grade software solutions, PrathTech serves as a trusted partner for organizations
                     seeking innovation, reliability, and meaningful business impact.</p>
                  <hr style="border-color: #e3e3e3; opacity: 1;">
                  <div class="d-flex gap-5 aboutstats">
                     <div data-aos="fade-up" data-aos-delay="100">
                        <h2>120</h2>
                        <span>Engineers, Architects, and Developers</span>
                     </div>
                     <div data-aos="fade-up" data-aos-delay="200">
                        <h2>1500+</h2>
                        <span>Person-years of experience in consulting</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="ourapproachSection">
         <div class="approachbg"><img src="images/approachbg.png"
               alt="Background illustration representing company approach" class="img-fluid"></div>
         <div class="container">
            <div class="row">
               <div class="subheading mb-5">Our Approach</div>
               <h2 class="split">We embrace a transparent, agile approach that drives efficiency, ensures on-time
                  delivery, and delivers measurable business results.</h2>
            </div>
         </div>

         <!-- here container-fluid replaced by container-->
         <div class="container approachContainer">
            <div class="gap-5 processcontentBox">
               <!-- <div class="d-flex gap-5 "> -->
               <div class="process-step" data-aos="fade-up" data-aos-delay="100">
                  <div class="position-relative d-inline-block">
                     <div class="step-number">01</div>
                     <div class="step-label">STEP</div>
                  </div>
                  <h4 class="process-title">Discover</h4>
                  <p class="process-desc">
                     We begin by uncovering your business goals, challenges, and aspirations through strategic
                     discussions, in-depth research, and market analysis, laying a strong foundation for solution
                     design.
                  </p>
               </div>
               <div class="process-step" data-aos="fade-up" data-aos-delay="150">
                  <div class="position-relative d-inline-block">
                     <div class="step-number">02</div>
                     <div class="step-label">STEP</div>
                  </div>
                  <h4 class="process-title">Design</h4>
                  <p class="process-desc">
                     Our creative minds craft intuitive, visually stunning, and user-centered designs that blend
                     functionality with aesthetics, delivering seamless experiences across web, app, and digital
                     platforms.
                  </p>
               </div>
               <div class="process-step" data-aos="fade-up" data-aos-delay="200">
                  <div class="position-relative d-inline-block">
                     <div class="step-number">03</div>
                     <div class="step-label">STEP</div>
                  </div>
                  <h4 class="process-title">Develop</h4>
                  <p class="process-desc">
                     We transform designs into reality using modern, scalable, and secure technologies. Our development
                     approach ensures performance, reliability, and flexibility tailored to your business needs.
                  </p>
               </div>
               <div class="process-step" data-aos="fade-up" data-aos-delay="250">
                  <div class="position-relative d-inline-block">
                     <div class="step-number">04</div>
                     <div class="step-label">STEP</div>
                  </div>
                  <h4 class="process-title">Deliver</h4>
                  <p class="process-desc">
                     We launch with precision and provide ongoing support post-launch. From rigorous testing to
                     continuous optimization, we ensure your digital products perform flawlessly and evolve with your
                     goals.
                  </p>
               </div>
               <!--      <div class="process-step" >
                  <div class="position-relative d-inline-block">
                    <div class="step-number">05</div>
                    <div class="step-label">STEP</div>
                  </div>
                  <h4 class="process-title">Support</h4>
                  <p class="process-desc">
                    We listen stories of user to understand pain points and give a rough estimate about cost and time-frame
                  </p>
                  </div> -->
            </div>
         </div>
      </section>
      <section style="margin-top: -150px; position: relative; z-index: 0;">
         <!-- <section style="margin-top: -150px; position: relative; z-index: 19;"> -->
         <div><img src="images/processbg.png" alt="background" class="processbackground"></div>
         <div class="services">
            <div class="container mt-5 mb-8">
               <div class="row">
                  <div class="col-xl-3 col-md-12">
                     <div class="subheading">Our Services</div>
                  </div>
                  <div class="col-xl-9 col-md-12">
                     <div class="abouttexttop">
                        <h2 class="ftw400 split">From application development to advanced DevOps, analytics,
                           integration, and robust security, we deliver comprehensive technology solutions that drive
                           digital transformation and operational excellence</h2>
                     </div>
                  </div>
               </div>
            </div>
            <div class="cards">
               <!-- <div class="card">
                  <div class="servicenumber">01.</div>
                  <div class="card-content">
                    <h2 class="color-animate">Web Application Development</h2>
                    <p>We design and develop custom software that fits your goals, enhances productivity, and drives growth through innovative, scalable, and reliable solutions.</p>
                  </div>
                  <img src="images/web-application-developement.jpg" alt="Custom Software" class="img-fluid">
                  </div> -->
               <div class="card">
                  <div class="servicenumber">01.</div>
                  <div class="card-content">
                     <h2 class="color-animate">Enterprise Application Integration</h2>
                     <p>We unify your business systems through seamless enterprise application integration, enabling
                        efficient data flow, improved collaboration, and real-time decision-making across departments.
                     </p>
                  </div>
                  <img src="images/enterprise-application.jpg" alt="Enterprise application integration services"
                     class="img-fluid">
               </div>
               <div class="card">
                  <div class="servicenumber">02.</div>
                  <div class="card-content">
                     <h2 class="color-animate">Web Application Development</h2>
                     <p>Our Custom Software Development services deliver tailored solutions perfectly aligned with your
                        business goals, workflows, and technology needs. We don’t just build software; we craft
                        intelligent systems that boost productivity, enable seamless scalability, and enhance customer
                        satisfaction.</p>
                  </div>
                  <img src="images/software-developement.jpg" alt="Custom software development solutions"
                     class="img-fluid">
               </div>
               <div class="card">
                  <div class="servicenumber">03.</div>
                  <div class="card-content">
                     <h2 class="color-animate">Mobile App Development</h2>
                     <p>We create powerful, user-centric mobile applications that boost customer engagement, streamline
                        operations, and drive sustained business growth across all platforms.</p>
                  </div>
                  <img src="images/web-application-developement.jpg" alt="Web application development services"
                     class="img-fluid">
               </div>
               <div class="card">
                  <div class="servicenumber">04.</div>
                  <div class="card-content">
                     <h2 class="color-animate">DevOps & CI/CD Implementation </h2>
                     <p>We accelerate software delivery with secure, automated DevOps and CI/CD practices that
                        streamline development, boost cross-team collaboration, and improve product quality.
                     </p>
                  </div>
                  <img src="images/devOps.jpg" alt="DevOps and CI/CD implementation services">
               </div>
            </div>
            <!--  <div class="text-center exploreservicebtnholder mt-5">
               <a href="#" class="exploreservicebtn">Explore all Our Services <img src="images/arrow.png" alt="prathtech"></a>
               </div> -->
         </div>
      </section>
      <!-- <section class="cardStacking">
         <div class="container-fluid">
           <div class="row justify-content-center">
             <div class="col-12">
               <div class="cardStacking__cards">
         
                 <div class="stackCard d-flex justify-content-start" style="background-color: #FC88C6;">
                   <div class="stackCard__body w-100 d-flex align-items-center justify-content-start">
                     <span class="stackCard__body-content-header d-block">Custom Software Developement</span>
                   </div>
                 </div>
         
                 <div class="stackCard d-flex justify-content-start" style="background-color: #BF72FD;">
                   <div class="stackCard__body w-100 d-flex justify-content-start">
                     <span class="stackCard__body-content-header d-block">Web Design &amp; Developement</span>
                   </div>
                 </div>
         
                 <div class="stackCard d-flex justify-content-start" style="background-color: #8314F9;">
                   <div class="stackCard__body w-100 d-flex justify-content-start">
                     <span class="stackCard__body-content-header d-block">Mobile App Developement</span>
                   </div>
                 </div>
         
                 <div class="stackCard d-flex  justify-content-start" style="background-color: #f9144d;">
                   <div class="stackCard__body w-100 d-flex justify-content-start">
                     <span class="stackCard__body-content-header d-block">Cloud Solution  &amp; Migration</span>
                   </div>
                 </div>
         
                  <div class="stackCard d-flex justify-content-start" style="background-color: #14f94d;">
                   <div class="stackCard__body w-100 d-flex justify-content-start">
                     <span class="stackCard__body-content-header d-block">IT Infrastructure Management</span>
                   </div>
                 </div>
         
                 <div class="stackCard d-flex justify-content-start" style="background-color: #14f94d;">
                   <div class="stackCard__body w-100 d-flex justify-content-start">
                     <span class="stackCard__body-content-header d-block">Cybersecurity & Data Protection</span>
                   </div>
                 </div>
         
               </div>
             </div>
           </div>
         
         </div>
         </section> -->
      <section class="letstalkSection">
         <div class="container position-relative" style="z-index: 1;">
            <!-- <div class="container position-relative" style="z-index: 99;"> -->
            <div class="row">
               <h2>We offer many more services to help you grow.</h2>
            </div>
            <div class="text-center">
               <a href="ourservices" class="custombutton">Explore All Our Services <img src="images/arrow.png"
                     alt="prathtech"></a>
            </div>
         </div>
         <div class="tickerContainer">
            <div class="container-fluid servicetext-carousel">
               <div class="row">

                  <h3 class="textticker"><span class="text-ticker-css">Web Application Development</span> <span class="text-ticker-css">Mobile App Development</span>
                     <span class="text-ticker-css">Government & Public Sector Solutions</span>
                     <span class="text-ticker-css">DevOps & CI/CD Implementation </span><span class="text-ticker-css"> Grafana Implementation & Dashboard
                        Analytics</span>
                     <span class="text-ticker-css">Containerization & Orchestration Services</span> <span class="text-ticker-css">Cloud Monitoring & Logging
                        Solutions</span>
                     <span class="text-ticker-css">Cybersecurity & Compliance</span><span class="text-ticker-css">Network Security & Firewall Configuration </span>
                     <span class="text-ticker-css">Enterprise Application Integration </span> <span class="text-ticker-css">Software Testing & QA Services</span> <span class="text-ticker-css">
                        UI/UX Design & Prototyping</span>

                  </h3>
               </div>
            </div>
         </div>
      </section>
      <section class="whychooseusSection">
         <div class="container">
            <div class="row">
               <div class="col-xl-7 col-md-12">
                  <div class="subheading mt-12">Why Choose Us</div>
                  <h2 class="choose-title mt-5">Great Solutions for your<br> Business</h2>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="100">
                     <div class="choose-icon"><img src="images/checkicon.png" alt="Checkmark icon"></div>
                     <div class="choose-content">
                        <h5>Client–Centric Approach</h5>
                        <p>We deeply understand your goals and craft tailored solutions that align perfectly with your
                           unique business needs.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="200">
                     <div class="choose-icon"><img src="images/checkicon.png" alt="Checkmark icon"></div>
                     <div class="choose-content">
                        <h5>Proven Expertise</h5>
                        <p>Our team of seasoned professionals brings extensive experience across a wide range of
                           technologies and industries, ensuring reliable and innovative outcomes.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="300">
                     <div class="choose-icon"><img src="images/checkicon.png" alt="Checkmark icon"></div>
                     <div class="choose-content">
                        <h5>Quality & Reliability</h5>
                        <p>We uphold the highest standards of quality, performance, and security in every project we
                           deliver.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="400">
                     <div class="choose-icon"><img src="images/checkicon.png" alt="Checkmark icon"></div>
                     <div class="choose-content">
                        <h5>End–to–End Solutions</h5>
                        <p>From strategic consulting to seamless deployment and ongoing support, we manage every phase
                           of your digital transformation journey.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="500">
                     <div class="choose-icon"><img src="images/checkicon.png" alt="Checkmark icon"></div>
                     <div class="choose-content">
                        <h5>Continuous Innovation</h5>
                        <p>We stay ahead of emerging trends to integrate the latest, most effective technologies into
                           your business.</p>
                     </div>
                  </div>
               </div>
               <div class="col-xl-5 col-md-12 why_choose_us">
                  <!-- The Code  parlgrmbtm this commented by trupti for tablet-->
                  <!-- <div class="parlgrmbtm"></div> -->
                  <img src="images/whyus.jpg" alt="PrathTech business solutions and team collaboration"
                     class="mt-10 whyusimg">
                  <img src="images/tabwhyus.jpg" alt="PrathTech services overview on tablet view"
                     class="mt-10 tabwhyusimg">
               </div>
            </div>
         </div>
      </section>


   </main>
   <?php include 'footer.php'; ?>



   <!-- TOGGLE THEME SCRIPT  -->
   <!-- <script>
      (function() {
         const root = document.documentElement;
         const stored = localStorage.getItem('theme');
         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
         const initial = stored || (prefersDark ? 'dark' : 'light');

         if (initial === 'dark') root.setAttribute('data-theme', 'dark');

         function toggleTheme() {
            const isDark = root.getAttribute('data-theme') === 'dark';
            if (isDark) {
               root.removeAttribute('data-theme');
               localStorage.setItem('theme', 'light');
            } else {
               root.setAttribute('data-theme', 'dark');
               localStorage.setItem('theme', 'dark');
            }
         }

         // Sync all three toggles (desktop, sticky, mobile) — clicking any one flips them all
         document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', toggleTheme);
         });
      })();
   </script> -->


   <!-- Custom scrollbar -->
</body>

</html>
<!-- <script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"></script>
   <script src="https://files.bpcontent.cloud/2026/02/18/07/20260218071820-CTHM6Q0D.js" defer></script> -->