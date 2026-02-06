<?php include 'header.php'; ?>

<section class="innerBanner">
      <div class="container-fluid width80">
         <div class="row">
            <h6 style="letter-spacing: -1.5px;">We’re here to support.</h6>
            <h1>Connect <br> with Our Experts.</h1>
            <div class="bannerbtmtext">Let’s bring your ideas to life.<img src="images/contact-me-thumb.webp" alt=""
                  class="contactthumb"></div>
            <div><a href="#contactfrm" class="custombutton mt-3">Let's Discuss<img src="images/arrow.png" alt=""></a>
            </div>
         </div>
      </div>
   </section>
   <section class="mt-8">
      <hr style="width: 80%; margin: auto ; opacity: 1; margin-bottom: 60px;">
      <div class="container">
         <div class="row">
            <div class="col-lg-5 col-md-12">
               <div class="subheading">Contact PrathTech</div>
            </div>
            <div class="col-lg-7 col-md-12">
               <div>
                  <p class="contacttext">Our team is here to assist you with any inquiries you may have, backed by our
                     strong presence in both <strong> India</strong> and the <strong>USA</strong>. We’d love to hear
                     from you! Whether you have a question, suggestion, or simply want to connect, feel free to reach
                     out to us. Fill out our contact form and our team will get back to you as soon as possible.
                  </p>
               </div>
            </div>
         </div>
      </div>
   </section>
   <section style="margin-top:50px;">
      <div class="container-fluid width90 mapcontainer">
         <div class="row">
            <div class="col-lg-6 col-md-12">


               <div class="position-relative india_address" id="indiaAddress">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d467.8255104895934!2d85.85238687752667!3d20.27524820114857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sfalcon%20house!5e0!3m2!1sen!2sin!4v1763696697213!5m2!1sen!2sin"
                     width="100%" height="830" style="border:0;" allowfullscreen="" loading="lazy"
                     referrerpolicy="no-referrer-when-downgrade"></iframe>
                  <div class="contactslider">
                     <h5 class="mb-3">India Address</h5>
                     <address> A/22, 1st Floor, Falcon House, Cuttack Road, <br>
                        Bhubaneswar, Odisha, India - 751006
                     </address>

                     <a class="btn viewUSA" href="javascript:void(0)">View USA Address <img src="images/arrow.png"
                           alt=""></a>

                  </div>
               </div>



               <div class="position-relative usa_address" id="usaAddress" style="display:none;">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2940.966999627949!2d-71.42285592388274!3d42.51350927117898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3971a28a44933%3A0x15bd65b4b8415a1b!2s6%20Alexandra%20Way%2C%20Acton%2C%20MA%2001720%2C%20USA!5e0!3m2!1sen!2sin!4v1763706184845!5m2!1sen!2sin"
                     width="100%" height="830" style="border:0;" allowfullscreen="" loading="lazy"
                     referrerpolicy="no-referrer-when-downgrade"></iframe>
                  <div class="contactslider">
                     <h5 class="mb-3">USA Address</h5>
                     <address> Prath Technologies Incorporated <br>6, Alexandra Way, Acton,Massachusetts, USA 01720
                     </address>

                     <a class="btn viewIndia" href="javascript:void(0)">View India Address <img src="images/arrow.png"
                           alt=""></a>

                  </div>
               </div>


               <!-- <div class="item">
                        <div class="position-relative">
                           <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d467.8255104895934!2d85.85238687752667!3d20.27524820114857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sfalcon%20house!5e0!3m2!1sen!2sin!4v1763696697213!5m2!1sen!2sin" width="100%" height="830" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  
                           <div class="contactslider">
                              <h5 class="mb-3">India Address</h5>
                              <address> A/22, 1st Floor, Falcon House, Cuttack Road, <br>
                                 Bhubaneswar, Odisha, India - 751006
                              </address>
                              <hr>
                          
                           </div>
                        </div>
                     </div> -->

            </div>
            <div class="col-lg-6 col-md-12">
               <div class="contact-form" id="contactfrm">
                  <h2 class="mb-5">Send a Message</h2>
                  <form id="contactForm" method="POST">
                     <div class="row g-3">
                        <div class="col-md-6 mb-2">
                           <label class="form-label">Full name*</label>
                           <input type="text" name="name" required class="form-control">
                           <small class="text-danger error-name"></small>
                        </div>

                        <div class="col-md-6 mb-2">
                           <label class="form-label">Mobile*</label>
                           <input type="text" name="number" required class="form-control">
                           <small class="text-danger error-number"></small>
                        </div>

                        <div class="col-12 mb-2">
                           <label class="form-label">Email*</label>
                           <input type="email" name="email" required class="form-control">
                           <small class="text-danger error-email"></small>
                        </div>

                        <div class="col-12 mb-2">
                           <label class="form-label">How Can We Help You*</label>
                           <textarea name="subject" required rows="5" class="form-control"></textarea>
                           <small class="text-danger error-subject"></small>
                        </div>

                        <div class="col-12 mb-2">
                           <label class="form-label">Captcha*</label>
                           <div class="d-flex align-items-center">
                              <input type="text" name="captcha_input" required class="form-control me-3"
                                 placeholder="Enter Captcha">
                              <span id="captchaCode" class="px-3 py-2 bg-light text-dark rounded"
                                 style="font-size:18px; letter-spacing:3px;">
                                 Loading...
                              </span>
                              <button type="button" id="refreshCaptcha" class="btn btn-sm ms-2">⟳</button>
                           </div>
                           <small class="text-danger error-captcha"></small>
                        </div>

                        <div class="col-12">
                           <button type="submit" class="btn btn-submit">Send Message</button>
                        </div>

                        <div id="formLoader" class="loader-container" style="display:none;">
                           <div class="spinner"></div>
                           <p class="loader-text">Please wait...</p>
                        </div>

                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </section>
   <section class="contactofficecontainer">
      <div class="container width80">
         <div class="row">
            <div class="d-flex align-items-center justify-content-center officecontainerbg">
               <h2>Whether you’re looking to join our team, partner with us, or explore our solutions, we’d love to hear
                  from you. We aim to respond within 24 hours.</h2>
            </div>
            <div class="col-lg-4 col-md-12 box1">
               <div class="contactboxbtm">
                  <div>
                     <img src="images/office1.jpg" alt="office1" class="img-fluid">
                  </div>
                  <h3>Be Part of the Journey</h3>
                  <span>hr@prathtech.com</span>
                  <span>+91 7008412478</span>
                  <!-- <div class="contactboxbtn"><a href="#">Contact Us</a></div> -->
               </div>
            </div>
            <div class="col-lg-4 col-md-12 box2">
               <div class="contactboxbtm">
                  <div>
                     <img src="images/office3.jpg" alt="office1" class="img-fluid">
                  </div>
                  <h3>Let’s Talk Solutions</h3>
                  <span>sales@prathtech.com</span>
                  <span>+91 7008412478</span>
                  <!--  <div class="contactboxbtn"><a href="#" class="conatctmiddlebtn">Contact Us</a></div> -->
               </div>
            </div>
            <div class="col-lg-4 col-md-12 box3">
               <div class="contactboxbtm">
                  <div>
                     <img src="images/office2.jpg" alt="office1" class="img-fluid">
                  </div>
                  <h3>Partner for Impact</h3>
                  <span>markets@prathtech.com</span>
                  <span>+91 7008412478</span>
                  <!-- <div class="contactboxbtn"><a href="#">Contact Us</a></div> -->
               </div>
            </div>
         </div>
      </div>
   </section>

<?php include 'footer.php'; ?>