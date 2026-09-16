<?php



/* =========================================================

   CAREER APPLICATION PAGE

   ========================================================= */





/* =========================================================

   1. GET JOB NAME

   ========================================================= */



$jobName = trim($_GET['name'] ?? '');



if ($jobName === '') {

    header("Location: career.php");

    exit;
}



/*

 * Allow HRMS Job IDs such as:

 * HR-OPN-2026-0023

 */

if (!preg_match('/^[A-Za-z0-9_-]+$/', $jobName)) {

    header("Location: career.php");

    exit;
}





/* =========================================================

   2. API CONFIG

   ========================================================= */



$jobsApiUrl =

    "https://hrms.prathtech.com/api/method/get_jobs";



$jobDetailApiUrl =

    "https://hrms.prathtech.com/api/method/get_job_opening";



$submitApiUrl =

    "https://hrms.prathtech.com/api/method/submit_job_application";





/*

 * API token should remain SERVER-SIDE.

 *

 * Recommended:

 *

 * PRATHTECH_API_TOKEN

 *

 * Do NOT put the token inside JavaScript or HTML.

 */



$auth_token = getenv('PRATHTECH_API_TOKEN') ?: '';





/* =========================================================

   3. DEFAULT VALUES

   ========================================================= */



$job = null;



$jobTitle = '';



$formData = [



    'applicant_name' => '',

    'job_title' => '',



    'current_company' => '',



    'email_id' => '',



    'total_experience' => '',



    'phone_number' => '',



    'country' => 'India',

    'currency' => 'INR',



    'relevant_experience_years' => '',



    'designation' => '',



    'current_employment_status' => '',



    'notice_period' => '',



    'cover_letter' => '',



    'current_ctc' => '',



    'expected_ctc' => '',



    'key_skills' => '',



    'current_job_location' => '',



    'willing_to_reloacte' => ''



];



$errors = [];



$success = false;



$apiError = '';





/* =========================================================

   4. HELPER FUNCTIONS

   ========================================================= */



function e($value)

{

    return htmlspecialchars(

        (string)$value,

        ENT_QUOTES,

        'UTF-8'

    );
}





/*

 * Extract useful Frappe/API error text.

 */

function extractApiError($response, $httpCode = 0)

{

    if (empty($response)) {



        if ($httpCode > 0) {

            return "Application server returned HTTP {$httpCode}.";
        }



        return "Empty response received from application server.";
    }





    $data = json_decode($response, true);





    if (is_array($data)) {



        /*

         * Standard Frappe message

         */

        if (

            isset($data['message']) &&

            is_string($data['message']) &&

            trim($data['message']) !== ''

        ) {



            return trim($data['message']);
        }





        /*

         * Frappe exception

         */

        if (

            isset($data['exc_type']) &&

            isset($data['exception'])

        ) {



            $exception =

                trim((string)$data['exception']);





            /*

             * Extract ValidationError message

             */

            if (

                stripos(

                    $exception,

                    'ValidationError:'

                ) !== false

            ) {



                $parts = preg_split(

                    '/ValidationError:\s*/i',

                    $exception,

                    2

                );





                if (

                    isset($parts[1]) &&

                    trim($parts[1]) !== ''

                ) {



                    return trim($parts[1]);
                }
            }





            /*

             * Frappe _server_messages

             */

            if (

                isset($data['_server_messages'])

            ) {



                $serverMessages =

                    json_decode(

                        $data['_server_messages'],

                        true

                    );





                if (is_array($serverMessages)) {



                    foreach (

                        $serverMessages

                        as $serverMessage

                    ) {



                        if (

                            is_string($serverMessage)

                        ) {



                            $decodedMessage =

                                json_decode(

                                    $serverMessage,

                                    true

                                );





                            if (

                                is_array($decodedMessage) &&

                                isset($decodedMessage['message'])

                            ) {



                                return trim(

                                    strip_tags(

                                        (string)$decodedMessage['message']

                                    )

                                );
                            }
                        }
                    }
                }
            }





            return "The application server rejected the request.";
        }





        /*

         * Generic error

         */

        if (

            isset($data['error']) &&

            is_string($data['error'])

        ) {



            return trim($data['error']);
        }





        if (

            isset($data['errors']) &&

            is_string($data['errors'])

        ) {



            return trim($data['errors']);
        }
    }





    /*

     * Plain text response

     */

    $cleanResponse =

        trim(

            strip_tags($response)

        );





    if ($cleanResponse !== '') {

        return $cleanResponse;
    }





    return "The application could not be submitted.";
}





/*

 * Perform GET request.

 */

function apiGet($url, $authToken = '')

{

    if (!function_exists('curl_init')) {



        return [



            'success' => false,



            'http_code' => 0,



            'response' => '',



            'error' =>

            'PHP cURL extension is not enabled.'



        ];
    }





    $headers = [



        'Accept: application/json'



    ];





    if ($authToken !== '') {



        $headers[] =

            "Authorization: {$authToken}";
    }





    $ch = curl_init($url);





    curl_setopt_array($ch, [



        CURLOPT_RETURNTRANSFER => true,



        CURLOPT_FOLLOWLOCATION => true,



        CURLOPT_HTTPGET => true,



        CURLOPT_TIMEOUT => 30,



        CURLOPT_CONNECTTIMEOUT => 15,



        CURLOPT_HTTPHEADER => $headers,



        CURLOPT_SSL_VERIFYPEER => true,



        CURLOPT_SSL_VERIFYHOST => 2



    ]);





    $response =

        curl_exec($ch);





    $httpCode =

        curl_getinfo(

            $ch,

            CURLINFO_HTTP_CODE

        );





    $curlError =

        curl_error($ch);





    curl_close($ch);





    if ($response === false) {



        return [



            'success' => false,



            'http_code' => $httpCode,



            'response' => '',



            'error' => $curlError



        ];
    }





    return [



        'success' => ($httpCode >= 200 && $httpCode < 300),



        'http_code' => $httpCode,



        'response' => $response,



        'error' => $curlError



    ];
}





/* =========================================================

   5. FETCH SPECIFIC JOB DIRECTLY

   ========================================================= */



$jobDetailUrl =

    $jobDetailApiUrl .

    '?name=' .

    rawurlencode($jobName);





$jobResponse =

    apiGet(

        $jobDetailUrl,

        $auth_token

    );





/* =========================================================

   6. DECODE JOB RESPONSE

   ========================================================= */



if (

    $jobResponse['success'] &&

    !empty($jobResponse['response'])

) {



    $jobData =

        json_decode(

            $jobResponse['response'],

            true

        );





    if (

        is_array($jobData) &&

        isset($jobData['message']) &&

        is_array($jobData['message'])

    ) {



        $job =

            $jobData['message'];
    }
}





/* =========================================================

   7. FALLBACK TO GET JOBS

   ========================================================= */



if (!$job) {



    $jobsResponse =

        apiGet(

            $jobsApiUrl,

            $auth_token

        );





    if (

        $jobsResponse['success'] &&

        !empty($jobsResponse['response'])

    ) {



        $data =

            json_decode(

                $jobsResponse['response'],

                true

            );





        $jobs = [];





        if (

            isset($data['message']['data']) &&

            is_array($data['message']['data'])

        ) {



            $jobs =

                $data['message']['data'];
        } elseif (

            isset($data['message']['jobs']) &&

            is_array($data['message']['jobs'])

        ) {



            $jobs =

                $data['message']['jobs'];
        } elseif (

            isset($data['message']) &&

            is_array($data['message'])

        ) {



            $jobs =

                $data['message'];
        } elseif (

            isset($data['data']) &&

            is_array($data['data'])

        ) {



            $jobs =

                $data['data'];
        } elseif (

            isset($data['jobs']) &&

            is_array($data['jobs'])

        ) {



            $jobs =

                $data['jobs'];
        }





        foreach ($jobs as $item) {



            if (!is_array($item)) {

                continue;
            }





            $itemName =

                trim(

                    (string)(

                        $item['name'] ?? ''

                    )

                );





            if ($itemName === $jobName) {



                $job = $item;



                break;
            }
        }
    }
}





/* =========================================================

   8. JOB NOT FOUND

   ========================================================= */



if (!$job) {



    http_response_code(404);



    include 'header.php';



?>



    <section class="job-not-found">



        <div class="container text-center py-5">



            <span class="error-code">

                404

            </span>



            <h1>

                Job Not Found

            </h1>



            <p>

                We couldn't find this job opening.

                Please return to the current openings

                and select a valid position.

            </p>



            <a

                href="career.php"

                class="custombutton">

                View All Jobs

            </a>



        </div>



    </section>



<?php



    include 'footer.php';



    exit;
}





/* =========================================================

   9. GET JOB INFORMATION

   ========================================================= */



$actualJobName =

    trim(

        (string)(

            $job['name'] ??

            $jobName

        )

    );





$jobTitle =

    trim(

        (string)(

            $job['job_title'] ??

            $job['title'] ??

            $job['designation'] ??

            ''

        )

    );





/*

 * Always use the official HRMS Job Opening name.

 */

$jobName = $actualJobName;



/* Keep the official HRMS job title available for submission. */

$formData['job_title'] = $jobTitle;

$formData['country'] = $formData['country'] ?: 'India';

$formData['currency'] = $formData['currency'] ?: 'INR';





/* =========================================================

   10. ALLOWED EMPLOYMENT STATUSES

   ========================================================= */



$allowedEmploymentStatuses = [



    'Employed',



    'Unemployed',



    'Serving Notice Period',



    'Self Employed',



    'Student',



    'Other'



];





/* =========================================================

   11. ALLOWED RELOCATION VALUES

   ========================================================= */



$allowedRelocationValues = [



    'Yes',



    'No'



];





/* =========================================================

   12. FORM SUBMISSION

   ========================================================= */



if ($_SERVER['REQUEST_METHOD'] === 'POST') {





    /* =====================================================

       LOAD POST VALUES

       ===================================================== */



    foreach ($formData as $field => $value) {



        $formData[$field] =

            trim(

                (string)(

                    $_POST[$field] ?? $value

                )

            );
    }



    /* =====================================================

       JOB TITLE

       ===================================================== */



    /* Always use the official title from the HRMS Job Opening. */

    $formData['job_title'] = $jobTitle;



    if ($formData['job_title'] === '') {

        $errors['job_title'] = 'Job title could not be determined from the selected job opening.';
    }





    /* =====================================================

       APPLICANT NAME

       ===================================================== */



    if (

        $formData['applicant_name'] === ''

    ) {



        $errors['applicant_name'] =

            'Applicant name is required.';
    } elseif (

        mb_strlen(

            $formData['applicant_name']

        ) < 2

    ) {



        $errors['applicant_name'] =

            'Please enter a valid name.';
    } elseif (

        !preg_match(

            "/^[\p{L}\s.'-]+$/u",

            $formData['applicant_name']

        )

    ) {



        $errors['applicant_name'] =

            'Please enter a valid name.';
    }





    /* =====================================================

       CURRENT COMPANY

       ===================================================== */



    if (

        $formData['current_company'] === ''

    ) {



        $errors['current_company'] =

            'Current company is required.';
    }





    /* =====================================================

       EMAIL

       ===================================================== */



    if (

        $formData['email_id'] === ''

    ) {



        $errors['email_id'] =

            'Email address is required.';
    } elseif (

        !filter_var(

            $formData['email_id'],

            FILTER_VALIDATE_EMAIL

        )

    ) {



        $errors['email_id'] =

            'Please enter a valid email address.';
    }





    /* =====================================================

       PHONE

       ===================================================== */



    $phoneClean =

        preg_replace(

            '/\D/',

            '',

            $formData['phone_number']

        );





    if (

        $formData['phone_number'] === ''

    ) {



        $errors['phone_number'] =

            'Phone number is required.';
    } elseif (

        !preg_match(

            '/^[6-9][0-9]{9}$/',

            $phoneClean

        )

    ) {



        $errors['phone_number'] =

            'Please enter a valid 10-digit Indian mobile number.';
    }





    /* =====================================================

       TOTAL EXPERIENCE

       ===================================================== */



    if (

        $formData['total_experience'] === ''

    ) {



        $errors['total_experience'] =

            'Total experience is required.';
    } elseif (

        !is_numeric(

            $formData['total_experience']

        )

    ) {



        $errors['total_experience'] =

            'Please enter experience in years.';
    } elseif (

        (float)$formData['total_experience'] < 0

    ) {



        $errors['total_experience'] =

            'Experience cannot be negative.';
    } elseif (

        (float)$formData['total_experience'] > 50

    ) {



        $errors['total_experience'] =

            'Please enter a valid experience value.';
    }





    /* =====================================================

       RELEVANT EXPERIENCE

       ===================================================== */



    if (

        $formData['relevant_experience_years'] === ''

    ) {



        $errors['relevant_experience_years'] =

            'Relevant experience is required.';
    } elseif (

        !is_numeric(

            $formData['relevant_experience_years']

        )

    ) {



        $errors['relevant_experience_years'] =

            'Please enter experience in years.';
    } elseif (

        (float)$formData['relevant_experience_years'] < 0

    ) {



        $errors['relevant_experience_years'] =

            'Experience cannot be negative.';
    } elseif (

        is_numeric($formData['total_experience']) &&

        (float)$formData['relevant_experience_years'] >

        (float)$formData['total_experience']

    ) {



        $errors['relevant_experience_years'] =

            'Relevant experience cannot exceed total experience.';
    }





    /* =====================================================

       CURRENT POSITION

       ===================================================== */



    if (

        $formData['designation'] === ''

    ) {



        $errors['designation'] =

            'Current position is required.';
    }





    /* =====================================================

       EMPLOYMENT STATUS

       ===================================================== */



    $employmentStatus =

        trim(

            $formData['current_employment_status']

        );





    if ($employmentStatus === '') {



        $errors['current_employment_status'] =

            'Please select your current employment status.';
    } elseif (

        !in_array(

            $employmentStatus,

            $allowedEmploymentStatuses,

            true

        )

    ) {



        $errors['current_employment_status'] =

            'Invalid employment status.';
    }





    /* =====================================================

       KEY SKILLS

       ===================================================== */



    if (

        $formData['key_skills'] === ''

    ) {



        $errors['key_skills'] =

            'Key skills are required.';
    }





    /* =====================================================

       CURRENT JOB LOCATION

       ===================================================== */



    if (

        $formData['current_job_location'] === ''

    ) {



        $errors['current_job_location'] =

            'Current job location is required.';
    }





    /* =====================================================

       WILLING TO RELOCATE

       ===================================================== */



    if (

        $formData['willing_to_reloacte'] === ''

    ) {



        $errors['willing_to_reloacte'] =

            'Please select whether you are willing to relocate.';
    } elseif (

        !in_array(

            $formData['willing_to_reloacte'],

            $allowedRelocationValues,

            true

        )

    ) {



        $errors['willing_to_reloacte'] =

            'Invalid relocation selection.';
    }





    /* =====================================================

       RESUME VALIDATION

       ===================================================== */



    $resume =

        $_FILES['resume_attachment'] ?? null;





    if (

        !$resume ||

        !isset($resume['error']) ||

        $resume['error'] === UPLOAD_ERR_NO_FILE

    ) {



        $errors['resume_attachment'] =

            'Please attach your updated resume.';
    } elseif (

        $resume['error'] !== UPLOAD_ERR_OK

    ) {



        $errors['resume_attachment'] =

            'There was a problem uploading your resume.';
    } else {



        /* =================================================

           FILE SIZE

           ================================================= */



        $maxFileSize =

            5 * 1024 * 1024;





        if (

            $resume['size'] >

            $maxFileSize

        ) {



            $errors['resume_attachment'] =

                'Resume size must not exceed 5 MB.';
        }





        /* =================================================

           FILE EXTENSION

           ================================================= */



        $extension =

            strtolower(

                pathinfo(

                    $resume['name'],

                    PATHINFO_EXTENSION

                )

            );





        $allowedExtensions = [



            'pdf',



            'doc',



            'docx'



        ];





        if (

            !in_array(

                $extension,

                $allowedExtensions,

                true

            )

        ) {



            $errors['resume_attachment'] =

                'Only PDF, DOC, and DOCX files are allowed.';
        }





        /* =================================================

           MIME VALIDATION

           ================================================= */



        if (

            empty($errors['resume_attachment']) &&

            class_exists('finfo')

        ) {



            $finfo =

                new finfo(

                    FILEINFO_MIME_TYPE

                );





            $mimeType =

                $finfo->file(

                    $resume['tmp_name']

                );





            $allowedMimeTypes = [



                'application/pdf',



                'application/msword',



                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',



                'application/octet-stream'



            ];





            if (

                !in_array(

                    $mimeType,

                    $allowedMimeTypes,

                    true

                )

            ) {



                $errors['resume_attachment'] =

                    'Invalid resume file type.';
            }
        }
    }





    /* =====================================================

       SUBMIT TO HRMS

       ===================================================== */



    if (empty($errors)) {





        /*

         * =================================================

         * HRMS / FRAPPE FIELD MAPPING

         * =================================================

         *

         * IMPORTANT:

         *

         * These names MUST match the Frappe fieldnames.

         */





        // $postFields = [



        //     /*

        //      * Job Opening

        //      */

        //     'job_opening' =>

        //     (string)$jobName,





        //     /*

        //      * Applicant

        //      */

        //     'applicant_name' =>

        //     (string)$formData['applicant_name'],





        //     /*

        //      * Email

        //      */

        //     'email_id' =>

        //     (string)$formData['email_id'],





        //     /*

        //      * Phone

        //      */

        //     'phone_number' =>

        //     (string)$phoneClean,





        //     /*

        //      * NEW FRAPPE FIELD:

        //      *

        //      * Job Position / Designation

        //      */

        //     'designation' =>

        //     (string)$jobTitle,





        //     /*

        //      * Current Company

        //      */

        //     'current_company' =>

        //     (string)$formData['current_company'],





        //     /*

        //      * Total Experience

        //      */

        //     'total_experience' =>

        //     (string)$formData['total_experience'],





        //     /*

        //      * NEW FRAPPE FIELD:

        //      *

        //      * Relevant Experience (Years)

        //      */

        //     'relevant_experience_years' =>

        //     (string)$formData['relevant_experience_years'],





        //     /*

        //      * NEW FRAPPE FIELD:

        //      *

        //      * Current Position

        //      */

        //     'custom_current_position' =>

        //     (string)$formData['designation'],





        //     /*

        //      * Employment Status

        //      */

        //     'current_employment_status' =>

        //     (string)$formData['current_employment_status'],





        //     /*

        //      * Notice Period

        //      */

        //     'notice_period' =>

        //     (string)$formData['notice_period'],





        //     /*

        //      * Cover Letter

        //      */

        //     'cover_letter' =>

        //     (string)$formData['cover_letter'],





        //     /*

        //      * NEW FRAPPE FIELD:

        //      *

        //      * Current / Lower CTC

        //      */

        //     'lower_range' =>

        //     (string)$formData['current_ctc'],





        //     /*

        //      * NEW FRAPPE FIELD:

        //      *

        //      * Expected / Upper CTC

        //      */

        //     'upper_range' =>

        //     (string)$formData['expected_ctc'],





        //     /*

        //      * Key Skills

        //      */

        //     'key_skills' =>

        //     (string)$formData['key_skills'],





        //     /*

        //      * Current Job Location

        //      */

        //     'current_job_location' =>

        //     (string)$formData['current_job_location'],





        //     /*

        //      * NEW FRAPPE FIELD:

        //      *

        //      * Willing to Relocate

        //      *

        //      * NOTE:

        //      * "reloacte" is intentionally spelled exactly

        //      * as provided in your Frappe fieldname.

        //      */

        //     'willing_to_reloacte' =>

        //     (string)$formData['willing_to_reloacte']



        // ];



        // EXACT CURRENT FRAPPE FIELDNAMES

        $postFields = [

            /* Required by the HRMS Server Script */

            'job_opening' => (string)$jobName,



            /* Required Job Applicant field */

            'job_title' => (string)$jobTitle,



            'applicant_name' => (string)$formData['applicant_name'],

            'email_id' => (string)$formData['email_id'],

            'designation' => (string)$formData['designation'],

            'phone_number' => (string)$phoneClean,

            'status' => 'Open',

            'country' => (string)$formData['country'],

            'currency' => (string)$formData['currency'],

            'key_skills' => (string)$formData['key_skills'],

            'current_job_location' => (string)$formData['current_job_location'],
            'notice_period' => (string)$formData['notice_period'],

            'willing_to_reloacte' => (string)$formData['willing_to_reloacte'],

            'total_experience' => (string)$formData['total_experience'],

            'relevant_experience_years' => (string)$formData['relevant_experience_years'],

            'current_employment_status' => (string)$formData['current_employment_status'],

            'current_company' => (string)$formData['current_company'],

            'lower_range' => (string)$formData['current_ctc'],
            'upper_range' => (string)$formData['expected_ctc'],

            'application_date' => date('Y-m-d H:i:s'),

        ];



        /* =================================================

           RESUME

           ================================================= */



        /*

         * NEW FRAPPE FIELD:

         *

         * resume_attachment

         */



        $postFields['resume_attachment'] =

            new CURLFile(



                $resume['tmp_name'],



                !empty($resume['type'])

                    ? $resume['type']

                    : 'application/octet-stream',



                $resume['name']



            );





        /* =================================================

           DEBUG DATA

           ================================================= */



        /*

         * This prints the exact endpoint and fields

         * into the PHP error log.

         *

         * DO NOT log the actual resume contents.

         */



        error_log(

            "========== JOB APPLICATION SUBMISSION =========="

        );



        error_log(

            "HRMS API URL: " . $submitApiUrl

        );



        error_log(

            "HRMS POST DATA:"

        );





        foreach (

            $postFields

            as $key => $value

        ) {



            if (

                $value instanceof CURLFile

            ) {



                error_log(

                    $key .

                        " => FILE: " .

                        $value->getPostFilename()

                );
            } else {



                error_log(

                    $key .

                        " => " .

                        (string)$value

                );
            }
        }





        error_log(

            "================================================="

        );





        /* =================================================

           CURL

           ================================================= */



        if (

            !function_exists('curl_init')

        ) {



            $apiError =

                'PHP cURL extension is not enabled on the server.';
        } else {





            $headers = [



                'Accept: application/json'



            ];





            /*

             * Authentication

             */

            if (

                $auth_token !== ''

            ) {



                $headers[] =

                    "Authorization: {$auth_token}";
            }





            $ch =

                curl_init(

                    $submitApiUrl

                );





            curl_setopt_array($ch, [



                CURLOPT_RETURNTRANSFER => true,



                CURLOPT_POST => true,



                /*

                 * DO NOT manually set:

                 *

                 * Content-Type: multipart/form-data

                 *

                 * CURL automatically generates the

                 * correct multipart boundary.

                 */



                CURLOPT_POSTFIELDS =>

                $postFields,



                CURLOPT_HTTPHEADER =>

                $headers,



                CURLOPT_TIMEOUT => 60,



                CURLOPT_CONNECTTIMEOUT => 15,



                CURLOPT_FOLLOWLOCATION => true,



                CURLOPT_SSL_VERIFYPEER => true,



                CURLOPT_SSL_VERIFYHOST => 2



            ]);





            $apiResponse =

                curl_exec($ch);





            $apiHttpCode =

                curl_getinfo(

                    $ch,

                    CURLINFO_HTTP_CODE

                );





            $curlError =

                curl_error($ch);





            curl_close($ch);





            /* =================================================

               CURL ERROR

               ================================================= */



            if (

                $apiResponse === false

            ) {



                $apiError =

                    'Unable to connect to the application server. ' .

                    'Please try again later.';
            } elseif (

                !empty($curlError)

            ) {



                $apiError =

                    'Unable to submit your application. ' .

                    'Please try again later.';
            } else {





                /*

                 * Log API response for debugging.

                 *

                 * Remove this later if you don't need it.

                 */



                error_log(

                    "HRMS HTTP CODE: " .

                        $apiHttpCode

                );



                error_log(

                    "HRMS RESPONSE: " .

                        $apiResponse

                );





                /* =============================================

                   DECODE RESPONSE

                   ============================================= */



                $result =

                    json_decode(

                        $apiResponse,

                        true

                    );





                /* =============================================

                   SUCCESS

                   ============================================= */



                if (

                    $apiHttpCode >= 200 &&

                    $apiHttpCode < 300

                ) {



                    $hasExplicitError = false;





                    if (

                        is_array($result)

                    ) {



                        if (

                            isset($result['exc_type']) ||

                            isset($result['exception']) ||

                            isset($result['error'])

                        ) {



                            $hasExplicitError = true;
                        }
                    }





                    if (

                        !$hasExplicitError

                    ) {



                        $success = true;
                    } else {



                        $apiError =

                            extractApiError(

                                $apiResponse,

                                $apiHttpCode

                            );
                    }
                } else {





                    /* =========================================

                       NON-2XX

                       ========================================= */



                    $apiError =

                        extractApiError(

                            $apiResponse,

                            $apiHttpCode

                        );





                    if (

                        $apiHttpCode === 404

                    ) {



                        $apiError =

                            'The application API route was not found. ' .

                            'Please verify that submit_job_application ' .

                            'is deployed on hrms.prathtech.com.';
                    } elseif (

                        $apiHttpCode === 403

                    ) {



                        $apiError =

                            'The HRMS application API denied access. ' .

                            'Please check the API authentication/permissions.';
                    } elseif (

                        $apiHttpCode === 400

                    ) {



                        $apiError =

                            extractApiError(

                                $apiResponse,

                                $apiHttpCode

                            );
                    }
                }
            }
        }
    }
}





/* =========================================================

   PAGE TITLE

   ========================================================= */



$pageTitle =

    'Apply for ' .

    $jobTitle .

    ' | Prath Technologies';





/* =========================================================

   HEADER

   ========================================================= */



include 'header.php';



?>





<?php if ($success): ?>



    <!-- =======================================================

     SUCCESS

======================================================= -->



    <section class="application-success-section">



        <div class="container">



            <div class="application-success-card">



                <div class="success-icon">

                    ✓

                </div>



                <span class="success-label">

                    APPLICATION SUBMITTED

                </span>



                <h1>

                    Thank You for Applying!

                </h1>



                <p>

                    Your application for

                    <strong>

                        <?php echo e($jobTitle); ?>

                    </strong>

                    has been submitted successfully.

                </p>



                <p class="success-reference">

                    Job Reference:

                    <strong>

                        <?php echo e($jobName); ?>

                    </strong>

                </p>



                <div class="success-actions">



                    <a

                        href="career.php"

                        class="custombutton">

                        View Current Openings

                    </a>



                    <a

                        href="career-desc.php?name=<?php echo urlencode($jobName); ?>"

                        class="success-back-link">

                        Back to Job

                    </a>



                </div>



            </div>



        </div>



    </section>





<?php else: ?>





    <!-- =======================================================

     APPLICATION FORM

======================================================= -->



    <section class="job-application-section">



        <div class="container">



            <div class="application-header">



                <span class="application-eyebrow">

                    JOIN OUR TEAM

                </span>



                <h1>

                    Job Application

                </h1>



                <p>

                    Apply for the position and take the next

                    step in your career with Prath Technologies.

                </p>



            </div>





            <?php if (!empty($apiError)): ?>



                <div class="application-alert error">



                    <strong>

                        Application could not be submitted.

                    </strong>



                    <span>

                        <?php echo e($apiError); ?>

                    </span>



                </div>



            <?php endif; ?>





            <?php if (!empty($errors)): ?>



                <div class="application-alert validation">



                    <strong>

                        Please check the highlighted fields.

                    </strong>



                    <span>

                        All required information must be completed

                        before submitting your application.

                    </span>



                </div>



            <?php endif; ?>





            <!--

            IMPORTANT:

 

            The browser submits to THIS PHP PAGE.

 

            PHP then sends the actual request to:

 

            https://hrms.prathtech.com/api/method/submit_job_application

 

            DO NOT put the HRMS URL in this action.

        -->



            <form
                id="jobApplicationForm"
                action="<?php echo e($_SERVER['PHP_SELF']); ?>?name=<?php echo urlencode($jobName); ?>"
                method="POST"
                enctype="multipart/form-data"
                data-submit-api="<?php echo e($submitApiUrl); ?>"
                novalidate>

                <!-- HRMS submission identifiers -->
                <input
                    type="hidden"
                    name="job_opening"
                    value="<?php echo e($jobName); ?>">

                <input
                    type="hidden"
                    name="job_title"
                    value="<?php echo e($jobTitle); ?>">

                <input
                    type="hidden"
                    name="currency"
                    value="<?php echo e($formData['currency']); ?>">





                <!-- =================================================

                 JOB INFORMATION

            ================================================== -->



                <div class="form-section">



                    <div class="form-section-heading">



                        <span>01</span>



                        <div>



                            <h2>

                                Position Details

                            </h2>



                            <p>

                                The position you're applying for.

                            </p>



                        </div>



                    </div>





                    <div class="form-grid">



                        <!-- Job Opening -->



                        <div class="form-group">



                            <label>

                                Job Opening

                            </label>



                            <input

                                type="text"

                                value="<?php echo e($jobName); ?>"

                                readonly

                                class="readonly-field">



                        </div>





                        <!-- Job Position / Designation -->



                        <div class="form-group">



                            <label>

                                Job Position / Designation

                            </label>



                            <input

                                type="text"

                                value="<?php echo e($jobTitle); ?>"

                                readonly

                                class="readonly-field">



                            <input

                                type="hidden"

                                name="job_position_display"

                                value="<?php echo e($jobTitle); ?>">



                        </div>



                    </div>



                </div>





                <!-- =================================================

                 PERSONAL INFORMATION

            ================================================== -->



                <div class="form-section">



                    <div class="form-section-heading">



                        <span>02</span>



                        <div>



                            <h2>

                                Personal Information

                            </h2>



                            <p>

                                Tell us a little about yourself.

                            </p>



                        </div>



                    </div>





                    <div class="form-grid">





                        <!-- Applicant Name -->



                        <div class="form-group">



                            <label for="applicant_name">

                                Applicant Name

                                <em>*</em>

                            </label>



                            <input

                                type="text"

                                id="applicant_name"

                                name="applicant_name"

                                value="<?php echo e($formData['applicant_name']); ?>"

                                placeholder="Enter your full name"

                                autocomplete="name"

                                maxlength="100"

                                required>



                            <?php if (isset($errors['applicant_name'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['applicant_name']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Current Company -->



                        <div class="form-group">



                            <label for="current_company">

                                Current Company

                                <em>*</em>

                            </label>



                            <input

                                type="text"

                                id="current_company"

                                name="current_company"

                                value="<?php echo e($formData['current_company']); ?>"

                                placeholder="Enter your current company"

                                maxlength="150"

                                required>



                            <?php if (isset($errors['current_company'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['current_company']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Email -->



                        <div class="form-group">



                            <label for="email_id">

                                Email Address

                                <em>*</em>

                            </label>



                            <input

                                type="email"

                                id="email_id"

                                name="email_id"

                                value="<?php echo e($formData['email_id']); ?>"

                                placeholder="you@example.com"

                                autocomplete="email"

                                maxlength="150"

                                required>



                            <?php if (isset($errors['email_id'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['email_id']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Phone -->



                        <div class="form-group">



                            <label for="phone_number">

                                Phone Number

                                <em>*</em>

                            </label>



                            <input

                                type="tel"

                                id="phone_number"

                                name="phone_number"

                                value="<?php echo e($formData['phone_number']); ?>"

                                placeholder="10-digit mobile number"

                                autocomplete="tel"

                                maxlength="10"

                                inputmode="numeric"

                                required>



                            <?php if (isset($errors['phone_number'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['phone_number']); ?>

                                </small>



                            <?php endif; ?>



                        </div>



                    </div>



                </div>





                <!-- =================================================

                 EXPERIENCE

            ================================================== -->



                <div class="form-section">



                    <div class="form-section-heading">



                        <span>03</span>



                        <div>



                            <h2>

                                Experience

                            </h2>



                            <p>

                                Tell us about your professional experience.

                            </p>



                        </div>



                    </div>





                    <div class="form-grid">





                        <!-- Total Experience -->



                        <div class="form-group">



                            <label for="total_experience">

                                Total Experience (Years)

                                <em>*</em>

                            </label>



                            <input

                                type="number"

                                id="total_experience"

                                name="total_experience"

                                value="<?php echo e($formData['total_experience']); ?>"

                                placeholder="e.g. 4"

                                min="0"

                                max="50"

                                step="0.1"

                                required>



                            <?php if (isset($errors['total_experience'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['total_experience']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Relevant Experience -->



                        <div class="form-group">



                            <label for="relevant_experience">

                                Relevant Experience (Years)

                                <em>*</em>

                            </label>



                            <input

                                type="number"

                                id="relevant_experience_years"

                                name="relevant_experience_years"

                                value="<?php echo e($formData['relevant_experience_years']); ?>"

                                placeholder="e.g. 3"

                                min="0"

                                max="50"

                                step="0.1"

                                required>



                            <?php if (isset($errors['relevant_experience_years'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['relevant_experience_years']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Current Position -->



                        <div class="form-group">



                            <label for="current_position">

                                Current Position

                                <em>*</em>

                            </label>



                            <input

                                type="text"

                                id="designation"

                                name="designation"

                                value="<?php echo e($formData['designation']); ?>"

                                placeholder="e.g. Software Developer"

                                maxlength="150"

                                required>



                            <?php if (isset($errors['designation'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['designation']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Employment Status -->



                        <div class="form-group">



                            <label for="current_employment_status">

                                Current Employment Status

                                <em>*</em>

                            </label>



                            <select

                                id="current_employment_status"

                                name="current_employment_status"

                                required>



                                <option value="">

                                    Select status

                                </option>



                                <?php foreach (

                                    $allowedEmploymentStatuses

                                    as $status

                                ): ?>



                                    <option

                                        value="<?php echo e($status); ?>"

                                        <?php echo (

                                            $formData['current_employment_status'] === $status

                                        ) ? 'selected' : ''; ?>>



                                        <?php echo e($status); ?>



                                    </option>



                                <?php endforeach; ?>



                            </select>





                            <?php if (

                                isset(

                                    $errors['current_employment_status']

                                )

                            ): ?>



                                <small class="field-error">



                                    <?php echo e(

                                        $errors['current_employment_status']

                                    ); ?>



                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Notice Period -->



                        <div class="form-group">



                            <label for="notice_period">

                                Notice Period (Days)

                                <em>*</em>

                            </label>



                            <input

                                type="number"

                                id="notice_period"

                                name="notice_period"

                                value="<?php echo e($formData['notice_period']); ?>"

                                placeholder="e.g. 30"

                                min="0"

                                max="365"

                                step="1"

                                required>



                            <?php if (isset($errors['notice_period'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['notice_period']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Willing to Relocate -->



                        <div class="form-group">



                            <label for="willing_to_reloacte">

                                Willing to Relocate

                                <em>*</em>

                            </label>



                            <select

                                id="willing_to_reloacte"

                                name="willing_to_reloacte"

                                required>



                                <option value="">

                                    Select option

                                </option>



                                <?php foreach (

                                    $allowedRelocationValues

                                    as $relocation

                                ): ?>



                                    <option

                                        value="<?php echo e($relocation); ?>"

                                        <?php echo (

                                            $formData['willing_to_reloacte'] === $relocation

                                        ) ? 'selected' : ''; ?>>



                                        <?php echo e($relocation); ?>



                                    </option>



                                <?php endforeach; ?>



                            </select>





                            <?php if (

                                isset(

                                    $errors['willing_to_reloacte']

                                )

                            ): ?>



                                <small class="field-error">



                                    <?php echo e(

                                        $errors['willing_to_reloacte']

                                    ); ?>



                                </small>



                            <?php endif; ?>



                        </div>



                    </div>



                </div>





                <!-- =================================================

                 RESUME

            ================================================== -->



                <div class="form-section">



                    <div class="form-section-heading">



                        <span>04</span>



                        <div>



                            <h2>

                                Resume & Cover Letter

                            </h2>



                            <p>

                                Share your latest resume and introduce yourself.

                            </p>



                        </div>



                    </div>





                    <div class="form-grid single">





                        <!-- Resume -->



                        <div class="form-group">



                            <label for="resume">

                                Attach Updated Resume

                                <em>*</em>

                            </label>



                            <div class="file-upload">



                                <input

                                    type="file"

                                    id="resume_attachment"

                                    name="resume_attachment"

                                    accept=".pdf,.doc,.docx"

                                    required>



                                <div class="file-upload-content">



                                    <span class="file-upload-icon">

                                        ↑

                                    </span>



                                    <strong>

                                        Choose your resume

                                    </strong>



                                    <span>

                                        PDF, DOC or DOCX · Max 5 MB

                                    </span>



                                </div>



                            </div>





                            <div

                                id="fileName"

                                class="selected-file">

                            </div>





                            <?php if (isset($errors['resume_attachment'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['resume_attachment']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Cover Letter -->



                        <div class="form-group">



                            <label for="cover_letter">

                                Cover Letter

                            </label>



                            <textarea

                                id="cover_letter"

                                name="cover_letter"

                                rows="7"

                                maxlength="5000"

                                placeholder="Tell us why you're interested in this role..."><?php echo e($formData['cover_letter']); ?></textarea>



                            <div class="character-counter">



                                <span id="coverLetterCount">

                                    0

                                </span>



                                / 5000



                            </div>





                            <?php if (

                                isset($errors['cover_letter'])

                            ): ?>



                                <small class="field-error">



                                    <?php echo e(

                                        $errors['cover_letter']

                                    ); ?>



                                </small>



                            <?php endif; ?>



                        </div>



                    </div>



                </div>





                <!-- =================================================

                 COMPENSATION

            ================================================== -->



                <div class="form-section">



                    <div class="form-section-heading">



                        <span>05</span>



                        <div>



                            <h2>

                                Compensation

                            </h2>



                            <p>

                                Help us understand your current and expected compensation.

                            </p>



                        </div>



                    </div>





                    <div class="form-grid">





                        <!-- Current / Lower CTC -->



                        <div class="form-group">



                            <label for="current_ctc">

                                Current / Lower CTC

                                <em>*</em>

                            </label>



                            <div class="input-prefix">



                                <span>

                                    ₹

                                </span>



                                <input

                                    type="number"

                                    id="current_ctc"

                                    name="current_ctc"

                                    value="<?php echo e($formData['current_ctc']); ?>"

                                    placeholder="Annual CTC"

                                    min="0"

                                    step="0.01"

                                    required>



                            </div>





                            <?php if (isset($errors['current_ctc'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['current_ctc']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Expected / Upper CTC -->



                        <div class="form-group">



                            <label for="expected_ctc">

                                Expected / Upper CTC

                                <em>*</em>

                            </label>



                            <div class="input-prefix">



                                <span>

                                    ₹

                                </span>



                                <input

                                    type="number"

                                    id="expected_ctc"

                                    name="expected_ctc"

                                    value="<?php echo e($formData['expected_ctc']); ?>"

                                    placeholder="Expected annual CTC"

                                    min="0"

                                    step="0.01"

                                    required>



                            </div>





                            <?php if (isset($errors['expected_ctc'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['expected_ctc']); ?>

                                </small>



                            <?php endif; ?>



                        </div>



                    </div>



                </div>





                <!-- =================================================

                 PROFESSIONAL DETAILS

            ================================================== -->



                <div class="form-section">



                    <div class="form-section-heading">



                        <span>06</span>



                        <div>



                            <h2>

                                Professional Details

                            </h2>



                            <p>

                                Tell us about your skills and current location.

                            </p>



                        </div>



                    </div>





                    <div class="form-grid">





                        <!-- Key Skills -->



                        <div class="form-group">



                            <label for="key_skills">

                                Key Skills

                                <em>*</em>

                            </label>



                            <input

                                type="text"

                                id="key_skills"

                                name="key_skills"

                                value="<?php echo e($formData['key_skills']); ?>"

                                placeholder="e.g. Angular, Node.js, PostgreSQL"

                                maxlength="1000"

                                required>



                            <?php if (isset($errors['key_skills'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['key_skills']); ?>

                                </small>



                            <?php endif; ?>



                        </div>





                        <!-- Current Job Location -->



                        <div class="form-group">



                            <label for="current_job_location">

                                Current Job Location

                                <em>*</em>

                            </label>



                            <input

                                type="text"

                                id="current_job_location"

                                name="current_job_location"

                                value="<?php echo e($formData['current_job_location']); ?>"

                                placeholder="e.g. Bhubaneswar, Odisha"

                                maxlength="150"

                                required>



                            <?php if (isset($errors['current_job_location'])): ?>



                                <small class="field-error">

                                    <?php echo e($errors['current_job_location']); ?>

                                </small>



                            <?php endif; ?>



                        </div>



                    </div>



                </div>





                <!-- =================================================

                 ACTIONS

            ================================================== -->



                <div class="application-actions">



                    <a

                        href="career-desc.php?name=<?php echo urlencode($jobName); ?>"

                        class="application-back-button">

                        ← Back

                    </a>





                    <button

                        type="submit"

                        class="application-submit-button"

                        id="submitButton">



                        <span>

                            Submit Application

                        </span>



                        <span class="submit-arrow">

                            →

                        </span>



                    </button>



                </div>





                <p class="application-privacy">



                    By submitting this application, you confirm that

                    the information provided is accurate and may be

                    used for recruitment purposes.



                </p>





            </form>



        </div>



    </section>





<?php endif; ?>





<?php include 'footer.php'; ?>





<!-- =======================================================

     PAGE JAVASCRIPT

======================================================= -->



<script>
    document.addEventListener("DOMContentLoaded", function() {



        /* =====================================================

           FORM

           ===================================================== */



        const form =

            document.getElementById(

                "jobApplicationForm"

            );



        const submitButton =

            document.getElementById(

                "submitButton"

            );





        /* =====================================================

           RESUME FILE NAME

           ===================================================== */



        const resumeInput =

            document.getElementById(

                "resume_attachment"

            );



        const fileName =

            document.getElementById(

                "fileName"

            );





        if (

            resumeInput &&

            fileName

        ) {



            resumeInput.addEventListener(

                "change",

                function() {



                    if (

                        this.files &&

                        this.files.length > 0

                    ) {



                        fileName.textContent =

                            this.files[0].name;



                        fileName.classList.add(

                            "has-file"

                        );



                    } else {



                        fileName.textContent = "";



                        fileName.classList.remove(

                            "has-file"

                        );

                    }

                }

            );

        }





        /* =====================================================

           COVER LETTER COUNTER

           ===================================================== */



        const coverLetter =

            document.getElementById(

                "cover_letter"

            );



        const coverLetterCount =

            document.getElementById(

                "coverLetterCount"

            );





        function updateCoverLetterCount() {



            if (

                coverLetter &&

                coverLetterCount

            ) {



                coverLetterCount.textContent =

                    coverLetter.value.length;

            }

        }





        if (coverLetter) {



            coverLetter.addEventListener(

                "input",

                updateCoverLetterCount

            );



            updateCoverLetterCount();

        }





        /* =====================================================

           PHONE NUMBER

           ===================================================== */



        const phone =

            document.getElementById(

                "phone_number"

            );





        if (phone) {



            phone.addEventListener(

                "input",

                function() {



                    this.value =

                        this.value

                        .replace(/\D/g, "")

                        .substring(0, 10);

                }

            );

        }





        /* =====================================================

           EXPERIENCE VALIDATION

           ===================================================== */



        const totalExperience =

            document.getElementById(

                "total_experience"

            );



        const relevantExperience =

            document.getElementById(

                "relevant_experience_years"

            );





        function validateExperience() {



            if (

                !totalExperience ||

                !relevantExperience

            ) {



                return;

            }





            relevantExperience.setCustomValidity("");





            if (

                totalExperience.value !== "" &&

                relevantExperience.value !== ""

            ) {



                const total =

                    parseFloat(

                        totalExperience.value

                    );





                const relevant =

                    parseFloat(

                        relevantExperience.value

                    );





                if (

                    !isNaN(total) &&

                    !isNaN(relevant) &&

                    relevant > total

                ) {



                    relevantExperience.setCustomValidity(

                        "Relevant experience cannot exceed total experience."

                    );

                }

            }

        }





        if (totalExperience) {



            totalExperience.addEventListener(

                "input",

                validateExperience

            );

        }





        if (relevantExperience) {



            relevantExperience.addEventListener(

                "input",

                validateExperience

            );

        }





        /* =====================================================

           FORM SUBMIT

           ===================================================== */



        if (

            form &&

            submitButton

        ) {



            form.addEventListener(

                "submit",

                function(event) {



                    validateExperience();





                    /*

                     * Run browser validation manually because

                     * novalidate is enabled.

                     */



                    if (

                        !form.checkValidity()

                    ) {



                        event.preventDefault();



                        form.reportValidity();



                        return;

                    }





                    /* =================================================

                       CONSOLE DEBUG

                       ================================================= */



                    console.group(

                        "🚀 JOB APPLICATION SUBMISSION"

                    );





                    console.log(

                        "📌 Browser Submit URL:",

                        form.action

                    );





                    console.log(

                        "📌 HRMS API URL:",

                        "https://hrms.prathtech.com/api/method/submit_job_application"

                    );





                    console.log(

                        "📌 Method:",

                        form.method.toUpperCase()

                    );





                    console.log(

                        "📌 Current Page:",

                        window.location.href

                    );





                    const formData =

                        new FormData(form);





                    console.group(

                        "📦 FORM DATA"

                    );





                    const debugData = {};





                    for (

                        const [key, value] of formData.entries()

                    ) {



                        if (

                            value instanceof File

                        ) {



                            debugData[key] = {



                                name: value.name,



                                type: value.type,



                                size: value.size



                            };





                            console.log(

                                `📄 ${key}:`,

                                debugData[key]

                            );



                        } else {



                            debugData[key] =

                                value;





                            console.log(

                                `🔹 ${key}:`,

                                value

                            );

                        }

                    }





                    console.groupEnd();





                    console.log(

                        "📋 Complete Browser Form Data:",

                        debugData

                    );





                    console.groupEnd();





                    /* =================================================

                       DISABLE SUBMIT BUTTON

                       ================================================= */



                    submitButton.disabled =

                        true;





                    submitButton.classList.add(

                        "loading"

                    );





                    const buttonText =

                        submitButton.querySelector(

                            "span:first-child"

                        );





                    if (buttonText) {



                        buttonText.textContent =

                            "Submitting...";

                    }



                }

            );

        }



    });
</script>