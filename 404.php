<?php
http_response_code(404);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>404 - Page Not Found | Prath Technologies</title>
<meta name="robots" content="noindex, follow">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

<style>
body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #020617, #0f172a);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
}

/* Main container */
.container {
    text-align: center;
    max-width: 700px;
    padding: 20px;
    z-index: 2;
}

/* Heading */
h1 {
    font-size: 110px;
    margin: 0;
    background: linear-gradient(90deg, #38bdf8, #6366f1);
    /* -webkit-background-clip: text; */
    -webkit-text-fill-color: transparent;
}

h2 {
    margin: 10px 0;
    font-weight: 500;
}

p {
    color: #cbd5f5;
    margin-bottom: 30px;
}

/* Button */
.btn {
    text-decoration: none;
    background: linear-gradient(90deg, #38bdf8, #6366f1);
    padding: 12px 28px;
    border-radius: 30px;
    color: #fff;
    font-weight: 500;
    transition: 0.3s;
    display: inline-block;
}
.btn:hover {
    opacity: 0.85;
}

/* Lottie container */
#lottie {
    width: 300px;
    margin: 0 auto 20px;
}

/* Background glow circles */
.circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.4;
}

.c1 {
    width: 300px;
    height: 300px;
    background: #38bdf8;
    top: 10%;
    left: 10%;
    animation: move 10s infinite alternate;
}

.c2 {
    width: 250px;
    height: 250px;
    background: #6366f1;
    bottom: 10%;
    right: 10%;
    animation: move 12s infinite alternate;
}

@keyframes move {
    from { transform: translate(0,0); }
    to { transform: translate(40px, 40px); }
}

/* Floating dots */
.dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #38bdf8;
    border-radius: 50%;
    animation: floatDot 6s infinite ease-in-out;
}

@keyframes floatDot {
    0% { transform: translateY(0); opacity: 0.3;}
    50% { transform: translateY(-20px); opacity: 1;}
    100% { transform: translateY(0); opacity: 0.3;}
}

/* Responsive */
@media (max-width: 600px) {
    h1 {
        font-size: 70px;
    }
    #lottie {
        width: 220px;
    }
}
</style>
</head>

<body>

<!-- Background Effects -->
<div class="circle c1"></div>
<div class="circle c2"></div>

<div class="dot" style="top:20%; left:30%;"></div>
<div class="dot" style="top:70%; left:20%;"></div>
<div class="dot" style="top:50%; right:25%;"></div>

<div class="container">

    <!-- Lottie Animation -->
    <div id="lottie"></div>

    <!-- <h1>404</h1> -->
    <h2>Page Not Found</h2>

    <p>
        Oops! The page you're looking for doesn’t exist or has been moved.
    </p>

    <a href="https://prathtech.com/" class="btn">Back to Homepage</a>

</div>

<!-- Lottie Script -->
<script src="https://unpkg.com/lottie-web@5.7.4/build/player/lottie.min.js"></script>

<script>
lottie.loadAnimation({
  container: document.getElementById('lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets10.lottiefiles.com/packages/lf20_kcsr6fcp.json'
});
</script>

<!-- Optional Auto Redirect (after 5 sec) -->
<script>
setTimeout(() => {
  window.location.href = "https://prathtech.com/";
}, 5000);
</script>

</body>
</html>