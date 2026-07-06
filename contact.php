<?php include 'header.php'; ?>

<section class="innerBanner">
   <div class="container-fluid width80">
      <div class="row">
         <h6>We’re here to support.</h6>
         <h1>Connect <br> with Our Experts.</h1>
         <div class="bannerbtmtext">Let’s bring your ideas to life.<img src="images/contact-me-thumb.webp" alt="prathtech"
               class="contactthumb"></div>
         <div><a href="#contactfrm" class="custombutton mt-3">Let's Discuss<img src="images/arrow.png" alt="prathtech"></a>
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
                        alt="prathtech"></a>

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
                        alt="prathtech"></a>

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
                        <input type="text" name="name" required class="form-control" id="full_name">
                        <small class="text-danger error-name"></small>
                     </div>

                     <div class="col-md-6 mb-2">
                        <label class="form-label">Mobile*</label>
                        <input type="text" name="number" required class="form-control" id="mobile" maxlength="10" inputmode="numeric" pattern="[6-9][0-9]{9}">
                        <small class="text-danger error-number"></small>
                     </div>

                     <div class="col-12 mb-2">
                        <label class="form-label">Email*</label>
                        <input type="email" name="email" required class="form-control" id="email">
                        <small class="text-danger error-email"></small>
                     </div>

                     <div class="col-12 mb-2">
                        <label class="form-label">Industry*</label>
                        <select name="industry" required class="form-control" id="industry">
                           <option value="">Select industry</option>
                           <!-- Populated dynamically from API -->
                        </select>
                        <small class="text-danger error-industry"></small>
                     </div>

                     <!-- Shown only when "Other" is selected in Industry -->
                     <div class="col-12 mb-2" id="otherIndustryWrapper" style="display:none;">
                        <label class="form-label">Please specify your industry*</label>
                        <input type="text" name="name_of_industry" id="name_of_industry" class="form-control"
                           placeholder="Enter your industry">
                        <small class="text-danger error-other-industry"></small>
                     </div>

                     <div class="col-12 mb-2">
                        <label class="form-label">Product Interested In*</label>
                        <select name="productInterested" required class="form-control" id="productInterested">
                           <option value="">Select product</option>
                           <!-- Populated dynamically from API -->
                        </select>
                        <small class="text-danger error-productInterested"></small>
                     </div>

                     <div class="col-12 mb-2">
                        <label class="form-label">How Can We Help You*</label>
                        <textarea name="subject" required rows="5" class="form-control" id="message"></textarea>
                        <small class="text-danger error-subject"></small>
                     </div>

                     <div class="col-12 mb-2">
                        <label class="form-label">Captcha*</label>
                        <div class="d-flex align-items-center">
                           <input type="text" name="captcha_input" required class="form-control me-3"
                              placeholder="Enter Captcha" id="captcha_input">
                           <span id="captchaCode" class="px-3 py-2 bg-light text-dark rounded"
                              style="font-size:18px; letter-spacing:3px; min-width:100px; text-align:center;">
                              Loading...
                           </span>
                           <button type="button" id="refreshCaptcha" class="btn btn-sm ms-2">⟳</button>
                        </div>
                        <small class="text-danger error-captcha"></small>
                        <!-- Hidden field to store captcha_id sent along with form submission -->
                        <input type="hidden" name="captcha_id" id="captcha_id">
                     </div>

                     <div class="col-12">
                        <button type="submit" class="btn btn-submit" id="submitBtn">Send Message</button>
                     </div>

                  </div>

                  <div id="formLoader" class="loader-container" style="display:none;">
                     <div class="spinner"></div>
                     <p class="loader-text">Please wait...</p>
                  </div>

               </form>
            </div>
         </div>
      </div>


      <!-- Response Modal -->
      <div class="modal fade" id="responseModal" tabindex="-1">
         <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

               <div class="modal-header">
                  <h5 class="modal-title" id="modalTitle">Status</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
               </div>

               <div class="modal-body">
                  <p id="modalMessage"></p>
               </div>

               <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
               </div>

            </div>
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
               <!-- <span>hr@prathtech.com</span> -->
               <span>hradmin@prathtech.com</span>
               <!-- <span>+91 7008412478</span> -->
               <span>+91 9777555017</span>
               <!-- <div class="contactboxbtn"><a href="#">Contact Us</a></div> -->
            </div>
         </div>
         <div class="col-lg-4 col-md-12 box2">
            <div class="contactboxbtm">
               <div>
                  <img src="images/office3.jpg" alt="office1" class="img-fluid">
               </div>
               <h3>Let’s Talk Solutions</h3>
               <span>markets@prathtech.com</span>
               <span>+91 9777555017</span>
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
               <span>+91 9777555017</span>
               <!-- <div class="contactboxbtn"><a href="#">Contact Us</a></div> -->
            </div>
         </div>
      </div>
   </div>
</section>

<!-- <script>
   document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const form = this;
      const formData = new FormData(form);

      document.getElementById("formLoader").style.display = "block";

      // fetch("mail", {
      fetch("mail.php", {
            method: "POST",
            body: formData
         })
         .then(res => res.json())
         .then(data => {
            document.getElementById("formLoader").style.display = "none";

            let title = "";
            let message = data.message;

            if (data.status === "success") {
               title = "Success ✅";
               form.reset();
            } else if (data.status === "invalid_captcha") {
               title = "Captcha Error ❌";
            } else {
               title = "Error ❌";
            }

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalMessage").innerText = message;

            let modal = new bootstrap.Modal(document.getElementById('responseModal'));
            modal.show();
         })
         .catch(err => {
            document.getElementById("formLoader").style.display = "none";

            document.getElementById("modalTitle").innerText = "Error ❌";
            document.getElementById("modalMessage").innerText = "Something went wrong. Please try again.";

            let modal = new bootstrap.Modal(document.getElementById('responseModal'));
            modal.show();

            console.error(err);
         });
   });
</script> -->

<script>
   document.addEventListener("DOMContentLoaded", () => {

      const $ = id => document.getElementById(id);
      const setErr = (cls, msg) => {
         const e = document.querySelector(cls);
         if (e) e.innerText = msg || '';
      };

      // ── Show Modal helper ─────────────────────────────────────────────────
      const showModal = (title, message) => {
         $('modalTitle').innerText = title;
         $('modalMessage').innerText = message;
         new bootstrap.Modal($('responseModal')).show();
      };

      // ── Load Industries & Products from API ──────────────────────────────
      function populateSelect(selectId, items, nameKey) {
         const sel = $(selectId);
         items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item[nameKey];
            opt.textContent = item[nameKey];
            sel.appendChild(opt);
         });
      }

      // Fetch both APIs in parallel
      Promise.all([
         fetch('submit.php?get_industries=1').then(r => r.json()),
         fetch('submit.php?get_products=1').then(r => r.json())
      ]).then(([indData, prodData]) => {
         populateSelect('industry', (indData.message || []).reverse(), 'industry_name');
         // Add "Other" manually at end — not in API
         const otherOpt = document.createElement('option');
         otherOpt.value = 'Other';
         otherOpt.textContent = 'Other';
         $('industry').appendChild(otherOpt);

         populateSelect('productInterested', (prodData.message || []).reverse(), 'product_name');
      }).catch(() => console.error('Failed to load dropdown data'));

      // ── Other Industry toggle ─────────────────────────────────────────────
      $('industry').addEventListener('change', function() {
         const isOther = this.value === 'Other';
         $('otherIndustryWrapper').style.display = isOther ? 'block' : 'none';
         $('name_of_industry')[isOther ? 'setAttribute' : 'removeAttribute']('required', 'required');
         if (!isOther) $('name_of_industry').value = '';
      });

      // ── Captcha ───────────────────────────────────────────────────────────
      const getCaptcha = () => {
         $('captchaCode').innerText = '...';
         fetch('submit.php?get_captcha=1')
            .then(r => r.json())
            .then(d => {
               $('captchaCode').innerText = d.captcha_text || 'Error';
               $('captcha_id').value = d.captcha_id || '';
            })
            .catch(() => $('captchaCode').innerText = 'Retry');
      };
      getCaptcha();
      $('refreshCaptcha').addEventListener('click', getCaptcha);

      // ── Field rules config ────────────────────────────────────────────────
      const fields = [
         ['full_name', '.error-name', [{
            test: v => !!v,
            msg: 'Full name is required.'
         }, {
            test: v => /^[a-zA-Z\s]{3,}$/.test(v),
            msg: 'Letters only, min 3 characters.'
         }]],
         ['mobile', '.error-number', [{
            test: v => !!v,
            msg: 'Mobile is required.'
         }, {
            test: v => /^[6-9]\d{9}$/.test(v),
            msg: 'Enter valid 10-digit mobile number.'
         }]],
         ['email', '.error-email', [{
            test: v => !!v,
            msg: 'Email is required.'
         }, {
            test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            msg: 'Enter a valid email address.'
         }]],
         ['industry', '.error-industry', [{
            test: v => !!v,
            msg: 'Please select an industry.'
         }]],
         ['productInterested', '.error-productInterested', [{
            test: v => !!v,
            msg: 'Please select a product.'
         }]],
         ['message', '.error-subject', [{
            test: v => !!v,
            msg: 'Message is required.'
         }, {
            test: v => v.length >= 10,
            msg: 'Min 10 characters required.'
         }]],
         ['captcha_input', '.error-captcha', [{
            test: v => !!v,
            msg: 'Please enter the captcha.'
         }]],
      ];

      // ── Validate a single field ───────────────────────────────────────────
      function validateField(id, cls, rules) {
         const val = $(id).value.trim();
         for (const rule of rules) {
            if (!rule.test(val)) {
               setErr(cls, rule.msg);
               return false;
            }
         }
         setErr(cls, '');
         return true;
      }

      // ── Validate other industry separately ───────────────────────────────
      function validateOther() {
         if ($('industry').value === 'Other' && !$('name_of_industry').value.trim()) {
            setErr('.error-other-industry', 'Please specify your industry.');
            return false;
         }
         setErr('.error-other-industry', '');
         return true;
      }

      // ── Attach blur/change + invalid listeners via config ─────────────────
      fields.forEach(([id, cls, rules]) => {
         const event = ['industry', 'productInterested'].includes(id) ? 'change' : 'blur';
         $(id).addEventListener(event, () => validateField(id, cls, rules));
         $(id).addEventListener('invalid', e => {
            e.preventDefault();
            validateField(id, cls, rules);
         });
      });
      $('name_of_industry').addEventListener('blur', validateOther);
      $('mobile').addEventListener('input', function() {
         this.value = this.value.replace(/\D/g, '').slice(0, 10);
      });

      // ── Submit ────────────────────────────────────────────────────────────
      $('contactForm').addEventListener('submit', function(e) {
         e.preventDefault();
         const allValid = fields.every(([id, cls, rules]) => validateField(id, cls, rules)) & validateOther();
         if (!allValid) return;

         $('formLoader').style.display = 'block';
         $('submitBtn').disabled = true;

         fetch('submit.php', {
               method: 'POST',
               body: new FormData(this)
            })
            .then(r => r.json())
            .then(d => {
               const isSuccess = d.status === 'success';
               showModal(isSuccess ? '✅ Success' : '❌ Error', d.message);
               if (isSuccess) {
                  this.reset();
                  $('otherIndustryWrapper').style.display = 'none';
               }
               getCaptcha();
            })
            .catch(() => showModal('⚠️ Connection Error', 'Something went wrong. Please try again.'))
            .finally(() => {
               $('formLoader').style.display = 'none';
               $('submitBtn').disabled = false;
            });
      });

   });
</script>
<?php include 'footer.php'; ?>