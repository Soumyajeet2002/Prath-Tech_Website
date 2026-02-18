<?php
$currentPage = basename($_SERVER['PHP_SELF'], ".php");
?>


<!DOCTYPE html>
<html lang="en">

<head>
   <title>About US : Prath Technologies Pvt. Ltd.</title>
   <meta charset="utf-8" />
   <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon">
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
      rel="stylesheet">

   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
   <link rel="stylesheet" href="webFont/stylesheet.css">
   <link rel="stylesheet" href="css/owl.carousel.css" />
   <link href="css/style.css" rel="stylesheet" />
   <!-- Header Css new  -->
   <link href="css/body-header-new.css" rel="stylesheet" />

   <!-- our innovation style start  -->

   <link href="css/custom-css.css" rel="stylesheet" />
   <link href="css/swiper-bundle.min.css" rel="stylesheet" />

   <!-- new Link for Icons -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
   <!-- our innovation style end  -->

   <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">


</head>

<body>
   <header>
      <div class="container-fluid width80">
         <div class="row">
            <!-- OG NAV-BAR -->
            <!-- <nav  class="navbar navbar-expand-xl mainmenu">
                  <a class="navbar-brand logodesktop" href="index"><img src="images/logo.png" alt="" height="100"/></a>
              
                  <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                  <span class="navbar-toggler-icon"></span>
                  </button>
                
                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="index">Home</a></li>
                     
                        <li class="nav-item"><a class="nav-link active" href="about">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="ourservices">Our Services</a></li>
                        <li class="nav-item"><a class="nav-link" href="career">Career</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact">Contact Us</a></li>
                     </ul>
                     <div class="get_started_header" style="margin-left: 10px;">
                        <a class="btn" href="contact">Get Started <img src="images/blackarrow.png" alt=""></a>
                     </div>
                  </div>
               </nav> -->


            <!-- Sticky nav-bar test -->
            <!-- <nav id="mainNav" class="navbar navbar-expand-xl mainmenu">
               <div class="container">

                  <a class="navbar-brand logodesktop" href="index">
                     <img src="images/logo.png" alt="" height="100">
                  </a>

                  <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                     <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="index">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="about">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="ourservices">Our Services</a></li>
                        <li class="nav-item dropdown">
                           <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                              Our Innovations
                           </a>
                           <ul class="dropdown-menu" aria-labelledby="productsDropdown">
                              <li><a class="dropdown-item" href="hrms.php">HRMS Software</a></li>
                              <li><a class="dropdown-item" href="product-2.html">Product 2</a></li>
                              <li><a class="dropdown-item" href="product-3.html">Product 3</a></li>
                              <li><a class="dropdown-item" href="product-4.html">Product 4</a></li>
                              <li><a class="dropdown-item" href="product-5.html">Product 5</a></li>
                           </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="career">Career</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact">Contact Us</a></li>
                     </ul>

                     <div class="get_started_header ms-3">
                        <a class="btn" href="contact">
                           Get Started <img src="images/blackarrow.png" alt="">
                        </a>
                     </div>
                  </div>

               </div>
            </nav> -->



            <!-- New NAV_BAR SECTION -->
            <nav id="mainNav" class="navbar navbar-expand-xl mainmenu">
               <div class="container">

                  <a class="navbar-brand logodesktop" href="index">
                     <img src="images/logo.png" alt="" height="100">
                  </a>

                  <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                     <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'index') ? 'active' : '' ?>" href="index">
                              Home
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'about') ? 'active' : '' ?>" href="about">
                              About Us
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'ourservices') ? 'active' : '' ?>" href="ourservices">
                              Our Services
                           </a>
                        </li>


                        <ul class="menu">

                           <li class="menu-item has-submenu">

                              <a href="#"
                                 class="<?= in_array($currentPage, [
                                             'hrms',
                                             'sms',
                                             'psil-electrical',
                                             'sgi',
                                             'e-hrms',
                                             'pma',
                                             'sma',
                                             'e-office',
                                             'grievance',
                                             'e-booking'
                                          ]) ? 'active' : '' ?>">

                                 <i class="bi bi-lightbulb me-2"></i>
                                 Our Innovations
                                 <span class="arrow">
                                    <i class="bi bi-chevron-down ms-2"></i>
                                 </span>
                              </a>

                              <ul class="submenu">

                                 <!-- PRODUCTS -->
                                 <li class="menu-item has-submenu">
                                    <a href="#">
                                       <i class="bi bi-box-seam me-2"></i>
                                       Products
                                       <span class="arrow">
                                          <i class="bi bi-chevron-right ms-2"></i>
                                       </span>
                                    </a>

                                    <ul class="submenu">
                                       <li>
                                          <a href="hrms"
                                             class="<?= ($currentPage == 'hrms') ? 'active' : '' ?>">
                                             <i class="bi bi-arrow-right-short me-2"></i> HRMS
                                          </a>
                                       </li>

                                       <li>
                                          <a href="sms"
                                             class="<?= ($currentPage == 'sms') ? 'active' : '' ?>">
                                             <i class="bi bi-arrow-right-short me-2"></i> SMS
                                          </a>
                                       </li>
                                    </ul>
                                 </li>

                                 <!-- ERP -->
                                 <li class="menu-item has-submenu">
                                    <a href="#">
                                       <i class="bi bi-diagram-3 me-2"></i>
                                       ERP
                                       <span class="arrow">
                                          <i class="bi bi-chevron-right ms-2"></i>
                                       </span>
                                    </a>

                                    <ul class="submenu">
                                       <li>
                                          <a href="psil-electrical"
                                             class="<?= ($currentPage == 'psil-electrical') ? 'active' : '' ?>">
                                             <i class="bi bi-arrow-right-short me-2"></i> PSIL Electrical
                                          </a>
                                       </li>

                                       <li>
                                          <a href="sgi"
                                             class="<?= ($currentPage == 'sgi') ? 'active' : '' ?>">
                                             <i class="bi bi-arrow-right-short me-2"></i> SGI
                                          </a>
                                       </li>
                                    </ul>
                                 </li>

                                 <!-- SOLUTIONS -->
                                 <li class="menu-item has-submenu">
                                    <a href="#">
                                       <i class="bi bi-gear me-2"></i>
                                       Solutions
                                       <span class="arrow">
                                          <i class="bi bi-chevron-right ms-2"></i>
                                       </span>
                                    </a>

                                    <ul class="submenu">
                                       <li><a href="e-hrms" class="<?= ($currentPage == 'e-hrms') ? 'active' : '' ?>"><i class="bi bi-arrow-right-short me-2"></i> E-HRMS</a></li>
                                       <li><a href="pma" class="<?= ($currentPage == 'pma') ? 'active' : '' ?>"><i class="bi bi-arrow-right-short me-2"></i> PMA</a></li>
                                       <li><a href="sma" class="<?= ($currentPage == 'sma') ? 'active' : '' ?>"><i class="bi bi-arrow-right-short me-2"></i> SMA</a></li>
                                       <li><a href="e-office" class="<?= ($currentPage == 'e-office') ? 'active' : '' ?>"><i class="bi bi-arrow-right-short me-2"></i> E-OFFICE</a></li>
                                       <li><a href="grievance" class="<?= ($currentPage == 'grievance') ? 'active' : '' ?>"><i class="bi bi-arrow-right-short me-2"></i> GRIEVANCE</a></li>
                                       <li><a href="e-booking" class="<?= ($currentPage == 'e-booking') ? 'active' : '' ?>"><i class="bi bi-arrow-right-short me-2"></i> E-BOOKING</a></li>
                                    </ul>
                                 </li>

                              </ul>

                           </li>

                        </ul>






                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'career') ? 'active' : '' ?>" href="career">
                              Career
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'contact') ? 'active' : '' ?>" href="contact">
                              Contact Us
                           </a>
                        </li>
                     </ul>


                     <div class="get_started_header ms-3">
                        <a class="btn" href="contact">
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
                  <li><a class="nav-link" href="index">Home</a></li>
                  <li><a class="nav-link" href="about">About Us</a></li>
                  <li><a class="nav-link" href="ourservices">Our Services</a></li>
                  <li><a class="nav-link" href="hrms.php">Our Innovations</a></li>
                  <li><a class="nav-link" href="career">Career</a></li>
                  <li><a class="nav-link" href="contact">Contact Us</a></li>
               </ul>
               <div class="get_started_header" style="margin-left: 10px;">
                  <a class="btn" href="contact">Get Started <img src="images/arrow.png" alt=""></a>
               </div>
            </div>
         </div>
      </div>
   </header>