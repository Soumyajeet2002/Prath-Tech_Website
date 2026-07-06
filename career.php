<?php include 'header.php'; ?>

<?php
$api_url = "https://hrms.prathtech.com/api/method/get_jobs";
$auth_token = "a9f3c1d7e4b28f6a91c0d5e8f7b3a2c6";

/* ========================= CACHE ========================= */
$cache_file = "jobs_cache.json";
$cache_time = 300;

$response = null;

if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_time) {
  $response = file_get_contents($cache_file);
} else {

  $ch = curl_init($api_url);

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 20);

  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: $auth_token",
    "Accept: application/json"
  ]);

  $response = curl_exec($ch);

  curl_close($ch);

  if ($response && strpos($response, 'RateLimitExceededError') === false) {
    file_put_contents($cache_file, $response);
  }
}

/* ========================= DECODE ========================= */
$data = json_decode($response, true);
if (!is_array($data))
  $data = [];

/* ========================= JOB EXTRACTION ========================= */
$jobs = [];

if (!empty($data['message']['data'])) {
  $jobs = $data['message']['data'];
} elseif (!empty($data['message']['jobs'])) {
  $jobs = $data['message']['jobs'];
} elseif (!empty($data['message']) && is_array($data['message'])) {
  $jobs = $data['message'];
} elseif (!empty($data['data'])) {
  $jobs = $data['data'];
} elseif (!empty($data['jobs'])) {
  $jobs = $data['jobs'];
}
?>

<!-- ========================= BANNER ========================= -->
<section class="innerBanner">
  <div class="container-fluid width80">
    <div class="row">
      <h6>Your next career move starts here</h6>
      <h1>Innovate <br>Succeed Grow</h1>
      <div class="bannerbtmtext">Build your future with us. <img src="images/career-user.webp" alt="prathtech"></div>
      <div>
        <a href="#currentopening" class="custombutton mt-4">
          View Current Openings <img src="images/arrow.png" alt="prathtech">
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ========================= BENEFITS ========================= -->
<section class="benefits-wrapper mt-8 mb-2">
  <hr style="width: 80%; margin: auto ; opacity: 1; margin-bottom: 60px;">
  <div class="container">
    <div class="row">
      <h1 class="ftw400">Why to join <strong>PrathTech</strong></h1>
    </div>
    <div class="row career_cards">

      <div class="benefit-box">
        <img src="images/icon2.png" alt="prathtech">
        <h4>Career Growth <br>Opportunities</h4>
      </div>

      <div class="benefit-box">
        <img src="images/icon3.png" alt="prathtech">
        <h4>Modern Workspace & <br>Vibrant Team Spirit</h4>
      </div>

      <div class="benefit-box">
        <img src="images/icon5.png" alt="prathtech">
        <h4>Continuous Learning & Development</h4>
      </div>

      <div class="benefit-box">
        <img src="images/icon8.png" alt="prathtech">
        <h4>Supportive Work & Team Culture</h4>
      </div>

    </div>
  </div>
</section>
<section class="careerslider">
  <div class="container-fluid">
    <div class="row  d-flex align-items-center">
      <div class="col item"><img src="images/career-slide-1.webp" alt="prathtech" class="img-fluid"></div>
      <div class="col item"><img src="images/career-slide-2.webp" alt="prathtech" class="img-fluid"></div>
      <div class="col item"><img src="images/career-slide-3.webp" alt="prathtech" class="img-fluid"> </div>
      <div class="col item"> <img src="images/career-slide-4.webp" alt="prathtech" class="img-fluid"> </div>
      <div class="col item"> <img src="images/career-slide-5.webp" alt="prathtech" class="img-fluid"></div>

    </div>
  </div>
</section>

<div class="careermobileslider">
  <div class="owl-carousel owl-theme mobile-career-carousel">
    <div class="item"><img src="images/career-slide-1.webp"></div>
    <div class="item"><img src="images/career-slide-2.webp"></div>
    <div class="item"><img src="images/career-slide-3.webp"></div>
    <div class="item"> <img src="images/career-slide-4.webp"></div>
    <div class="item"><img src="images/career-slide-5.webp"></div>
  </div>
</div>

<!-- ========================= JOB LIST ========================= -->
<section class="currentopeningsection" id="currentopening">
  <div class="container">

    <div class="row">
      <h1 class="mb-5 ftw400">Current Openings</h1>
    </div>

    <div class="row careerheader ">
      <!-- <div class="col-md-4"><h5>Position</h5></div>
      <div class="col-md-2"><h5>Openings</h5></div>
      <div class="col-md-2"><h5>Publish Date</h5></div>
      <div class="col-md-4"><h5>Experience</h5></div> -->
      <div class="col-lg-4 col-md-4">
        <h5>Position</h5>
      </div>
      <div class="col-lg-2 col-md-2">
        <h5>Openings</h5>
      </div>
      <div class="col-lg-2 col-md-2">
        <h5>Publish Date</h5>
      </div>
      <div class="col-lg-2 col-md-2">
        <h5>Experience</h5>
      </div>
      <div class="col-lg-2 col-md-2">
        <h5></h5>
      </div>
    </div>



    <?php if (!empty($jobs)): ?>

      <?php foreach ($jobs as $job):

        $title = $job['job_title'] ?? $job['title'] ?? $job['designation'] ?? 'N/A';
        $openings = $job['no_of_vacancies'] ?? $job['vacancies'] ?? '-';
        $date_raw = $job['posted_on'] ?? $job['creation'] ?? '';
        $experience = $job['years_of_experience'] ?? 'Not specified';
        $slug = $job['slug'] ?? '';

        $date = $date_raw ? date("d-m-Y", strtotime($date_raw)) : '-';

        $isNew = (!empty($date_raw) && strtotime($date_raw) >= strtotime('-30 days'));

      ?>

        <hr>

        <div class="row careerbox align-items-center ">

          <div class="col-lg-4 col-md-4 text-start">
            <div class="career-opening-title">
              <h4><?php echo htmlspecialchars($title); ?></h4>

              <?php if ($isNew): ?>
                <span class="new-badge">NEW</span>
              <?php endif; ?>
            </div>
          </div>

          <div class="col-lg-2 col-md-2">
            <div class="career-opening-role">
              <span><?php echo htmlspecialchars($openings); ?></span>
            </div>

          </div>

          <div class="col-lg-2 col-md-2">
            <span><?php echo $date; ?></span>
          </div>

          <div class="col-lg-4 col-md-6 d-flex justify-content-between align-items-center">
            <span class="jobtype"><?php echo htmlspecialchars($experience); ?></span>

            <!-- VIEW DETAILS BUTTON -->
            <a href="#" class="apply-btn view-job" data-slug="<?php echo htmlspecialchars($slug); ?>">
              View Details
            </a>

          </div>

        </div>

      <?php endforeach; ?>

    <?php else: ?>
      <div class="text-center mt-5">
        <h5>No job openings available right now.</h5>
      </div>
    <?php endif; ?>

  </div>
</section>

<?php include 'footer.php'; ?>

<!-- ========================= JS ========================= -->
<script>
  document.addEventListener("DOMContentLoaded", function() {

    const baseUrl = "https://hrms.prathtech.com/jobs/prath_technologies_pvt._ltd./";

    document.querySelectorAll(".view-job").forEach(btn => {

      btn.addEventListener("click", function(e) {

        e.preventDefault();

        let slug = this.getAttribute("data-slug");

        if (!slug) {
          alert("Job link not available");
          return;
        }

        let finalUrl = baseUrl + slug;

        window.open(finalUrl, "_blank");

      });

    });

  });
</script>