<?php

/* =========================================================
   JOB DETAIL PAGE
   ========================================================= */

/* -----------------------------
   1. GET JOB NAME
----------------------------- */

$jobName = trim($_GET['name'] ?? '');

if ($jobName === '') {
    header("Location: career.php");
    exit;
}

/* Allow HRMS job IDs such as:
   HR-OPN-2026-0023
*/
if (!preg_match('/^[A-Za-z0-9_-]+$/', $jobName)) {
    header("Location: career.php");
    exit;
}


/* -----------------------------
   2. API CONFIG
----------------------------- */

$apiUrl =
    "https://hrms.prathtech.com/api/method/get_job_opening?name=" .
    urlencode($jobName);


/* -----------------------------
   3. FETCH API
----------------------------- */

$response = false;
$httpCode = 0;


/* Try cURL first */

if (function_exists('curl_init')) {

    $ch = curl_init($apiUrl);

    $auth_token = "a9f3c1d7e4b28f6a91c0d5e8f7b3a2c6";

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_CONNECTTIMEOUT => 10,

        CURLOPT_HTTPHEADER => [
            "Authorization: $auth_token",
            "Accept: application/json"
        ],

        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);
}


/* -----------------------------
   4. FALLBACK
----------------------------- */

if ($response === false || empty($response)) {

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 20,
            'header' =>
            "Authorization: $auth_token\r\n" .
                "Accept: application/json\r\n"
        ]
    ]);

    $response = @file_get_contents($apiUrl, false, $context);
}


/* -----------------------------
   5. DECODE RESPONSE
----------------------------- */

$data = json_decode($response, true);

/* -----------------------------
   6. GET JOB
----------------------------- */

$job = null;

if (
    is_array($data) &&
    isset($data['message']) &&
    is_array($data['message'])
) {

    /*
     * Actual API structure:
     *
     * {
     *   "message": {
     *      "name": "...",
     *      "job_title": "...",
     *      ...
     *   }
     * }
     */

    $job = $data['message'];
}


/* -----------------------------
   7. JOB NOT FOUND
----------------------------- */

if (
    !is_array($job) ||
    empty($job['name'])
) {

    http_response_code(404);

    include 'header.php';
?>

    <section class="job-not-found">
        <div class="container text-center py-5">

            <span class="error-code">404</span>

            <h1>Job Not Found</h1>

            <p>
                We couldn't find this job opening.
                It may have been removed, closed,
                or the job reference may be incorrect.
            </p>

            <a href="career.php" class="custombutton">
                View All Jobs
            </a>

        </div>
    </section>

<?php
    include 'footer.php';
    exit;
}


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function e($value)
{
    return htmlspecialchars(
        (string)$value,
        ENT_QUOTES,
        'UTF-8'
    );
}


/* -----------------------------
   DATE FORMAT
----------------------------- */

function formatJobDate($date)
{
    if (empty($date)) {
        return '-';
    }

    $timestamp = strtotime($date);

    if (!$timestamp) {
        return e($date);
    }

    return date('d M Y', $timestamp);
}


/* -----------------------------
   CONVERT DESCRIPTION ARRAYS
   INTO INDIVIDUAL BULLETS
----------------------------- */

function normalizeJobList($items)
{
    if (empty($items)) {
        return [];
    }

    if (!is_array($items)) {
        $items = [$items];
    }

    $result = [];

    foreach ($items as $item) {

        if (is_array($item)) {
            foreach ($item as $subItem) {
                if (is_string($subItem)) {
                    $result[] = trim($subItem);
                }
            }

            continue;
        }

        $item = trim((string)$item);

        if ($item === '') {
            continue;
        }

        /*
         * The API currently returns multiple sentences
         * joined together without spaces:
         *
         * "ServiceNow modules.Develop solutions..."
         *
         * Split them into separate points.
         */
        $parts = preg_split(
            '/(?<=[.!?])\s*(?=[A-Z])/u',
            $item
        );

        if (!empty($parts)) {

            foreach ($parts as $part) {

                $part = trim($part);

                if ($part !== '') {
                    $result[] = $part;
                }
            }
        } else {
            $result[] = $item;
        }
    }

    return $result;
}


/* =========================================================
   GET ACTUAL API VALUES
   ========================================================= */

$jobTitle = $job['job_title'] ?? 'Job Opening';

$designation = $job['designation'] ?? '';

$vacancies = $job['vacancies'] ?? '-';

$experience = $job['experience'] ?? 'Not specified';

$workMode = $job['work_mode'] ?? 'Not specified';

$status = $job['status'] ?? 'Open';

$postedOn = $job['posted_on'] ?? '';

$closesOn = $job['closes_on'] ?? '';

$description = $job['description'] ?? [];


/* -----------------------------
   DESCRIPTION SECTIONS
----------------------------- */

$jobSummary =
    $description['Job Summary']
    ?? '';

$keyResponsibilities =
    normalizeJobList(
        $description['Key Responsibilities']
            ?? []
    );

$requiredSkills =
    normalizeJobList(
        $description['Required Skills']
            ?? []
    );

$preferredQualifications =
    normalizeJobList(
        $description['Preferred Qualifications']
            ?? []
    );


/* -----------------------------
   APPLICATION NOTE
----------------------------- */

$applicationNote = '';

foreach ($preferredQualifications as $key => $qualification) {

    if (
        stripos($qualification, 'hradmin@prathtech.com') !== false ||
        stripos($qualification, 'face any issues while applying') !== false
    ) {

        $applicationNote = $qualification;

        unset($preferredQualifications[$key]);
    }
}

$preferredQualifications =
    array_values($preferredQualifications);


/* -----------------------------
   PAGE TITLE
----------------------------- */

$pageTitle = $jobTitle . " | Prath Technologies";


/* =========================================================
   HEADER
   ========================================================= */

include 'header.php';

?>


<!-- =======================================================
     JOB HERO
======================================================= -->

<section class="job-detail-hero">

    <div class="container">

        <div class="job-hero-content">

            <div class="job-status">
                <span></span>
                <?php echo e($status); ?>
            </div>

            <h1>
                <?php echo e($jobTitle); ?>
            </h1>

            <?php if (!empty($designation)): ?>

                <p class="job-designation">
                    <?php echo e($designation); ?>
                </p>

            <?php endif; ?>


            <div class="job-meta">

                <div class="job-meta-item">

                    <strong>Experience</strong>

                    <span>
                        <?php echo e($experience); ?>
                    </span>

                </div>


                <div class="job-meta-item">

                    <strong>Openings</strong>

                    <span>
                        <?php echo e($vacancies); ?>
                    </span>

                </div>


                <div class="job-meta-item">

                    <strong>Work Mode</strong>

                    <span>
                        <?php echo e($workMode); ?>
                    </span>

                </div>


                <div class="job-meta-item">

                    <strong>Posted On</strong>

                    <span>
                        <?php echo formatJobDate($postedOn); ?>
                    </span>

                </div>


                <div class="job-meta-item">

                    <strong>Closing Date</strong>

                    <span>
                        <?php echo formatJobDate($closesOn); ?>
                    </span>

                </div>

            </div>

        </div>

    </div>

</section>



<!-- =======================================================
     JOB CONTENT
======================================================= -->

<section class="job-detail-section">

    <div class="container">

        <div class="job-detail-grid">


            <!-- =========================
                 MAIN CONTENT
            ========================== -->

            <div class="job-main-content">


                <!-- SUMMARY -->

                <?php if (!empty($jobSummary)): ?>

                    <div class="job-content-block">

                        <span class="section-label">
                            01
                        </span>

                        <h2>
                            Job Summary
                        </h2>

                        <p>
                            <?php echo nl2br(e($jobSummary)); ?>
                        </p>

                    </div>

                <?php endif; ?>


                <!-- RESPONSIBILITIES -->

                <?php if (!empty($keyResponsibilities)): ?>

                    <div class="job-content-block">

                        <span class="section-label">
                            02
                        </span>

                        <h2>
                            Key Responsibilities
                        </h2>

                        <ul class="job-list">

                            <?php foreach ($keyResponsibilities as $item): ?>

                                <li>

                                    <span class="list-icon">
                                        ✓
                                    </span>

                                    <span>
                                        <?php echo e($item); ?>
                                    </span>

                                </li>

                            <?php endforeach; ?>

                        </ul>

                    </div>

                <?php endif; ?>


                <!-- REQUIRED SKILLS -->

                <?php if (!empty($requiredSkills)): ?>

                    <div class="job-content-block">

                        <span class="section-label">
                            03
                        </span>

                        <h2>
                            Required Skills
                        </h2>

                        <ul class="job-list">

                            <?php foreach ($requiredSkills as $item): ?>

                                <li>

                                    <span class="list-icon">
                                        ✓
                                    </span>

                                    <span>
                                        <?php echo e($item); ?>
                                    </span>

                                </li>

                            <?php endforeach; ?>

                        </ul>

                    </div>

                <?php endif; ?>


                <!-- PREFERRED QUALIFICATIONS -->

                <?php if (!empty($preferredQualifications)): ?>

                    <div class="job-content-block">

                        <span class="section-label">
                            04
                        </span>

                        <h2>
                            Preferred Qualifications
                        </h2>

                        <ul class="job-list">

                            <?php foreach ($preferredQualifications as $item): ?>

                                <li>

                                    <span class="list-icon">
                                        ✓
                                    </span>

                                    <span>
                                        <?php echo e($item); ?>
                                    </span>

                                </li>

                            <?php endforeach; ?>

                        </ul>

                    </div>

                <?php endif; ?>


                <!-- APPLICATION NOTE -->

                <?php if (!empty($applicationNote)): ?>

                    <div class="application-note">

                        <strong>
                            Application Support
                        </strong>

                        <p>
                            If you face any issues while applying,
                            you can share your CV at
                            <a href="mailto:hradmin@prathtech.com">
                                hradmin@prathtech.com
                            </a>
                        </p>

                    </div>

                <?php endif; ?>


            </div>



            <!-- =========================
                 SIDEBAR
            ========================== -->

            <aside class="job-sidebar">

                <div class="job-apply-card">

                    <span class="sidebar-label">
                        Interested in this role?
                    </span>

                    <h3 class="desc-h3">
                        Ready to build
                        something great?
                    </h3>

                    <p>
                        Take the next step in your career
                        with Prath Technologies.
                    </p>

                    <!-- <a
                        href="mailto:hradmin@prathtech.com?subject=<?php echo urlencode('Application for ' . $jobTitle); ?>"
                        class="job-apply-button">
                        Apply Now
                    </a> -->
                    <a
                        href="career-apply.php?name=<?php echo urlencode($jobName); ?>"
                        class="job-apply-button">
                        Apply Now
                    </a>

                </div>


                <div class="job-reference-card">

                    <span>
                        Job Reference
                    </span>

                    <strong>
                        <?php echo e($jobName); ?>
                    </strong>

                </div>

            </aside>


        </div>

    </div>

</section>



<!-- =======================================================
     BACK TO JOBS
======================================================= -->

<section class="job-back-section">

    <div class="container">

        <a href="career.php" class="job-back-link">

            <span>←</span>

            Back to Current Openings

        </a>

    </div>

</section>



<?php include 'footer.php'; ?>