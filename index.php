<!DOCTYPE html>
<html lang="en">

<head>
   <title>Prath Technologies Pvt. Ltd.</title>
   <meta charset="utf-8" />
   <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon">
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
      rel="stylesheet">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
   <link rel="stylesheet" href="webFont/stylesheet.css">
   <link rel="stylesheet" href="css/owl.carousel.css" />
   <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
   <link href="css/style.css" rel="stylesheet" />
   <style>
      .widget-visible iframe {
         display: none;
      }
   </style>
</head>

<body>
   <header class="home-header">
      <div class="container-fluid width80">
         <div class="row">
            <nav class="navbar navbar-expand-xl mainmenu">
               <a class="navbar-brand logodesktop" href="index.php"><img src="images/logo.png" alt=""
                     height="100" /></a>
               <!-- Hamburger Button (Mobile only) -->
               <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <!-- Desktop Menu -->
               <div class="collapse navbar-collapse d-none d-xl-block">
                  <ul class="navbar-nav ms-auto">
                     <li class="nav-item"><a class="nav-link active" href="index.php">Home</a></li>
                     <li class="nav-item"><a class="nav-link" href="about.php">About Us</a></li>
                     <li class="nav-item"><a class="nav-link" href="ourservices.php">Our Services</a></li>
                     <!-- <li class="nav-item"><a class="nav-link" href="hrms.php">Our Innovations</a></li> -->
                     <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                           Our Innovations
                        </a>
                        <ul class="dropdown-menu">

                       
                           <li class="dropdown-submenu">
                              <a class="dropdown-item dropdown-toggle" href="#">Products</a>
                              <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="hrms.php">HRMS</a></li>
                                 <li><a class="dropdown-item" href="sms-product.php">SMS</a></li>
                              </ul>
                           </li>

                          
                           <li class="dropdown-submenu">
                              <a class="dropdown-item dropdown-toggle" href="#">ERP</a>
                              <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="psil-erp.php">PSIL Electrical</a></li>
                                 <li><a class="dropdown-item" href="sgi-erp.php">SGI</a></li>
                              </ul>
                           </li>

                           
                           <li class="dropdown-submenu">
                              <a class="dropdown-item dropdown-toggle" href="#">Solutions</a>
                              <ul class="dropdown-menu">
                                 <li>
                                    <a class="dropdown-item" href="solutions.php">
                                       As mentioned in the deck
                                    </a>
                                 </li>
                              </ul>
                           </li>

                        </ul>

                     </li> -->

                     <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="productsDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                           Our Innovations
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="productsDropdown">
                           <li><a class="dropdown-item" href="hrms.php">HRMS Software</a></li>
                        </ul>
                     </li> -->

                     <li class="nav-item"><a class="nav-link" href="career.php">Career</a></li>
                     <li class="nav-item"><a class="nav-link" href="contact.php">Contact Us</a></li>
                  </ul>
                  <div class="get_started_header" style="margin-left: 10px;">
                     <a class="btn" href="contact.php">Get Started <img src="images/blackarrow.png" alt=""></a>
                  </div>
               </div>
            </nav>


            <!-- Sticky nav-bar test -->


            <nav id="globalStickyNav" class="navbar navbar-expand-xl mainmenu sticky">
               <div class="container">

                  <a class="navbar-brand logodesktop" href="index.php">
                     <img src="images/logo.png" alt="" height="100">
                  </a>

                  <button class="navbar-toggler d-xl-none" type="button">
                     <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link active" href="index.php">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="about.php">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="ourservices.php">Our Services</a></li>
                        <!-- <li class="nav-item dropdown">
                           <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                              Our Innovations
                           </a>
                           <ul class="dropdown-menu">


                              <li class="dropdown-submenu">
                                 <a class="dropdown-item dropdown-toggle" href="#">Products</a>
                                 <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="hrms.php">HRMS</a></li>
                                    <li><a class="dropdown-item" href="sms-product.php">SMS</a></li>
                                 </ul>
                              </li>


                              <li class="dropdown-submenu">
                                 <a class="dropdown-item dropdown-toggle" href="#">ERP</a>
                                 <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="psil-erp.php">PSIL Electrical</a></li>
                                    <li><a class="dropdown-item" href="sgi-erp.php">SGI</a></li>
                                 </ul>
                              </li>


                              <li class="dropdown-submenu">
                                 <a class="dropdown-item dropdown-toggle" href="#">Solutions</a>
                                 <ul class="dropdown-menu">
                                    <li>
                                       <a class="dropdown-item" href="solutions.php">
                                          As mentioned in the deck
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                           </ul>
                        </li> -->
                        <li class="nav-item"><a class="nav-link" href="career.php">Career</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact.php">Contact Us</a></li>
                     </ul>

                     <div class="get_started_header ms-3">
                        <a class="btn" href="contact.php">
                           Get Started <img src="images/blackarrow.png" alt="">
                        </a>
                     </div>
                  </div>

               </div>
            </nav>



            <!-- Mobile Fullscreen Menu -->
            <div id="menu" class="d-xl-none">
               <div class="container-fluid mobilemenuheader">
                  <div class="row">
                     <div class="mobilelogo">
                        <a href="#"><img src="images/logo.png" alt="" height="80" /></a>
                     </div>
                     <div>
                        <span class="menu-close"><img src="images/mobile-menu-close.png" alt="" /></span>
                     </div>
                  </div>
               </div>
               <ul class="list-unstyled mt-5 mobilenav">
                  <li><a class="nav-link" href="index.php">Home</a></li>
                  <li><a class="nav-link" href="about.php">About Us</a></li>
                  <li><a class="nav-link" href="ourservices.php">Our Services</a></li>
                  <!-- <li><a class="nav-link" href="hrms.php">Our Innovations</a></li> -->
                  <!-- <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Our Innovations
                     </a>
                     <ul class="dropdown-menu">

                    
                        <li class="dropdown-submenu">
                           <a class="dropdown-item dropdown-toggle" href="#">Products</a>
                           <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="hrms.php">HRMS</a></li>
                              <li><a class="dropdown-item" href="sms-product.php">SMS</a></li>
                           </ul>
                        </li>

                      
                        <li class="dropdown-submenu">
                           <a class="dropdown-item dropdown-toggle" href="#">ERP</a>
                           <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="psil-erp.php">PSIL Electrical</a></li>
                              <li><a class="dropdown-item" href="sgi-erp.php">SGI</a></li>
                           </ul>
                        </li>

                        
                        <li class="dropdown-submenu">
                           <a class="dropdown-item dropdown-toggle" href="#">Solutions</a>
                           <ul class="dropdown-menu">
                              <li>
                                 <a class="dropdown-item" href="solutions.php">
                                    As mentioned in the deck
                                 </a>
                              </li>
                           </ul>
                        </li>

                     </ul>

                  </li> -->
                  <li><a class="nav-link" href="career.php">Career</a></li>
                  <li><a class="nav-link" href="contact.php">Contact Us</a></li>
               </ul>
               <div class="get_started_header" style="margin-left: 10px;">
                  <a class="btn" href="contact.php">Get Started <img src="images/arrow.png" alt=""></a>
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
                  <h6>We Create</h6>
                  <div class="banner-h1-text desktop-home-hero-heading">
                     <h1>
                        Digital Solutions
                        <span>Digital Solutions</span>
                        <span>Digital Solutions</span>
                        <span>Let's Create Together</span>
                     </h1>
                  </div>
                  <div class="mobile-home-hero-heading">
                     <h1>Digital Solutions</h1>
                  </div>
                  <div class=" homebannertext">Aligned Seamlessly With Your Vision</div>
               </div>
            </div>
         </div>
         <div class="bannerbottomImg"><img src="images/bannerBottom.png" alt="" style="width:100%"></div>
      </section>
      <section class="homeAbout_sction">
         <div class="parlgrm animate-slide-left"></div>
         <div class="container aboutContainer">
            <div class="row">
               <div class="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                  <div class="subheading">Who We Are</div>
               </div>
               <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12">
                  <div class="abouttexttop">
                     <h1 class="ftw400 split">We empower businesses to innovate, scale, and lead the digital future
                        through cutting-edge IT solutions, deep expertise, and end-to-end technology excellence.</h1>
                     <!-- <p class="abouttext-home split">With a robust in-house team of more than 120 engineers, architects, and developers, having more than 1,500 person-years of experience in providing end-to-end technology consulting, product engineering, and enterprise-grade software solutions.</p> -->
                  </div>
               </div>
            </div>
            <div class="row aboutbottomContainer">
               <div class="col-xl-7 col-lg-5" data-aos="zoom-in-up" data-aos-delay="100">
                  <img src="images/about.jpg" alt="" class="homeaboutImage">
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
                        <h1>120</h1>
                        <span>Engineers, Architects, and Developers</span>
                     </div>
                     <div data-aos="fade-up" data-aos-delay="200">
                        <h1>1500+</h1>
                        <span>Person-years of experience in consulting</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="ourapproachSection">
         <div class="approachbg"><img src="images/approachbg.png" alt="" class="img-fluid"></div>
         <div class="container">
            <div class="row">
               <div class="subheading mb-5">Our Approach</div>
               <h1 class="split">We embrace a transparent, agile approach that drives efficiency, ensures on-time
                  delivery, and delivers measurable business results.</h1>
            </div>
         </div>
         <div class="container-fluid approachContainer">
            <div class="d-flex gap-5 processcontentBox">
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
         <div><img src="images/processbg.png" alt="" class="processbackground"></div>
         <div class="services">
            <div class="container mt-5 mb-8">
               <div class="row">
                  <div class="col-xl-3 col-md-12">
                     <div class="subheading">Our Services</div>
                  </div>
                  <div class="col-xl-9 col-md-12">
                     <div class="abouttexttop">
                        <h1 class="ftw400 split">From application development to advanced DevOps, analytics,
                           integration, and robust security, we deliver comprehensive technology solutions that drive
                           digital transformation and operational excellence</h1>
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
                  <img src="images/enterprise-application.jpg" alt="" class="img-fluid">
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
                  <img src="images/software-developement.jpg" alt="" class="img-fluid">
               </div>
               <div class="card">
                  <div class="servicenumber">03.</div>
                  <div class="card-content">
                     <h2 class="color-animate">Mobile App Development</h2>
                     <p>We create powerful, user-centric mobile applications that boost customer engagement, streamline
                        operations, and drive sustained business growth across all platforms.</p>
                  </div>
                  <img src="images/web-application-developement.jpg" alt="" class="img-fluid">
               </div>
               <div class="card">
                  <div class="servicenumber">04.</div>
                  <div class="card-content">
                     <h2 class="color-animate">DevOps & CI/CD Implementation </h2>
                     <p>We accelerate software delivery with secure, automated DevOps and CI/CD practices that
                        streamline development, boost cross-team collaboration, and improve product quality.
                     </p>
                  </div>
                  <img src="images/devOps.jpg" alt="devOps">
               </div>
            </div>
            <!--  <div class="text-center exploreservicebtnholder mt-5">
               <a href="#" class="exploreservicebtn">Explore all Our Services <img src="images/arrow.png" alt=""></a>
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
               <h1>We offer many more services to help you grow.</h1>
            </div>
            <div class="text-center">
               <a href="ourservices.php" class="custombutton">Explore All Our Services <img src="images/arrow.png"
                     alt=""></a>
            </div>
         </div>
         <div class="tickerContainer">
            <div class="container-fluid servicetext-carousel">
               <div class="row">

                  <h3 class="textticker"><span>Web Application Development</span> <span>Mobile App Development</span>
                     <span>Government & Public Sector Solutions</span>
                     <span>DevOps & CI/CD Implementation </span><span> Grafana Implementation & Dashboard
                        Analytics</span>
                     <span>Containerization & Orchestration Services</span> <span>Cloud Monitoring & Logging
                        Solutions</span>
                     <span>Cybersecurity & Compliance</span><span>Network Security & Firewall Configuration </span>
                     <span>Enterprise Application Integration </span> <span>Software Testing & QA Services</span> <span>
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
                  <h1 class="choose-title mt-5">Great Solutions for your<br> Business</h1>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="100">
                     <div class="choose-icon"><img src="images/checkicon.png" alt=""></div>
                     <div class="choose-content">
                        <h5>Client–Centric Approach</h5>
                        <p>We deeply understand your goals and craft tailored solutions that align perfectly with your
                           unique business needs.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="200">
                     <div class="choose-icon"><img src="images/checkicon.png" alt=""></div>
                     <div class="choose-content">
                        <h5>Proven Expertise</h5>
                        <p>Our team of seasoned professionals brings extensive experience across a wide range of
                           technologies and industries, ensuring reliable and innovative outcomes.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="300">
                     <div class="choose-icon"><img src="images/checkicon.png" alt=""></div>
                     <div class="choose-content">
                        <h5>Quality & Reliability</h5>
                        <p>We uphold the highest standards of quality, performance, and security in every project we
                           deliver.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="400">
                     <div class="choose-icon"><img src="images/checkicon.png" alt=""></div>
                     <div class="choose-content">
                        <h5>End–to–End Solutions</h5>
                        <p>From strategic consulting to seamless deployment and ongoing support, we manage every phase
                           of your digital transformation journey.</p>
                     </div>
                  </div>
                  <div class="choose-item" data-aos="fade-bottom" data-aos-delay="500">
                     <div class="choose-icon"><img src="images/checkicon.png" alt=""></div>
                     <div class="choose-content">
                        <h5>Continuous Innovation</h5>
                        <p>We stay ahead of emerging trends to integrate the latest, most effective technologies into
                           your business.</p>
                     </div>
                  </div>
               </div>
               <div class="col-xl-5 col-md-12">
                  <div class="parlgrmbtm"></div>
                  <img src="images/whyus.jpg" alt="" class="mt-10 whyusimg">
                  <img src="images/tabwhyus.jpg" alt="" class="mt-10 tabwhyusimg">
               </div>
            </div>
         </div>
      </section>


   </main>
   <?php include 'footer.php'; ?>