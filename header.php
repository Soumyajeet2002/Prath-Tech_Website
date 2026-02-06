<?php
$currentPage = basename($_SERVER['PHP_SELF']);
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

   <!-- our innovation style start  -->

   <link href="css/custom-css.css" rel="stylesheet" />
   <link href="css/swiper-bundle.min.css" rel="stylesheet" />

   <!-- new Link for Icons -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
   <!-- our innovation style end  -->

</head>

<body>
   <header>
      <div class="container-fluid width80">
         <div class="row">
            <!-- OG NAV-BAR -->
            <!-- <nav  class="navbar navbar-expand-xl mainmenu">
                  <a class="navbar-brand logodesktop" href="index.php"><img src="images/logo.png" alt="" height="100"/></a>
              
                  <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                  <span class="navbar-toggler-icon"></span>
                  </button>
                
                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                     
                        <li class="nav-item"><a class="nav-link active" href="about.php">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="ourservices.php">Our Services</a></li>
                        <li class="nav-item"><a class="nav-link" href="career.php">Career</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact.php">Contact Us</a></li>
                     </ul>
                     <div class="get_started_header" style="margin-left: 10px;">
                        <a class="btn" href="contact.php">Get Started <img src="images/blackarrow.png" alt=""></a>
                     </div>
                  </div>
               </nav> -->


            <!-- Sticky nav-bar test -->
            <!-- <nav id="mainNav" class="navbar navbar-expand-xl mainmenu">
               <div class="container">

                  <a class="navbar-brand logodesktop" href="index.php">
                     <img src="images/logo.png" alt="" height="100">
                  </a>

                  <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                     <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="about.php">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="ourservices.php">Our Services</a></li>
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
            </nav> -->




            <nav id="mainNav" class="navbar navbar-expand-xl mainmenu">
               <div class="container">

                  <a class="navbar-brand logodesktop" href="index.php">
                     <img src="images/logo.png" alt="" height="100">
                  </a>

                  <button class="navbar-toggler d-xl-none" type="button" id="hamburger">
                     <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse d-none d-xl-block">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'index.php') ? 'active' : '' ?>" href="index.php">
                              Home
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'about.php') ? 'active' : '' ?>" href="about.php">
                              About Us
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'ourservices.php') ? 'active' : '' ?>" href="ourservices.php">
                              Our Services
                           </a>
                        </li>

                        <!-- <li class="nav-item dropdown">
                           <a class="nav-link dropdown-toggle <?= in_array($currentPage, [
                                                                  'hrms.php',
                                                                  'sms.php',
                                                                  'psil-electrical.php',
                                                                  'sgi.php',
                                                                  'solutions.php'
                                                               ]) ? 'active' : '' ?>"
                              href="#" id="productsDropdown"
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


                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'career.php') ? 'active' : '' ?>" href="career.php">
                              Career
                           </a>
                        </li>

                        <li class="nav-item">
                           <a class="nav-link <?= ($currentPage == 'contact.php') ? 'active' : '' ?>" href="contact.php">
                              Contact Us
                           </a>
                        </li>
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