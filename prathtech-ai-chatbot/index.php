<?php
/** PrathTech - Home Page **/

if (file_exists(__DIR__ . '/.env')) {
    foreach (file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        [$key, $value] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}
$api_url = $_ENV['PRATHTECH_API_URL'] ?? 'http://localhost:5000';

$page_title       = 'PrathTech';
$page_description = 'Revolutionize your business with cutting-edge technology, advanced analytics, and transformative products';


$bot_avatar = 'https://api.dicebear.com/7.x/bottts/svg?seed=WybbleAI&baseColor=159abb';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($page_title) ?></title>
  <meta name="description" content="<?= htmlspecialchars($page_description) ?>">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300..900&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/style.css">

  <!-- Pass API URL to JS -->
  <script>
    window.PRATHTECH_API_URL = <?= json_encode($api_url) ?>;
  </script>

  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N3P4SN3W');
  </script>
</head>
<body>

<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N3P4SN3W"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>

<!-- HOME SECTION -->
<main>
  <section id="home" class="home-section">
    <div class="container">
      <h1>PrathTech</h1>
      <h2>Future-Ready Innovation.</h2>
    </div>
  </section>
</main>

<!-- CHATBOT FLOATING BUTTON -->
<button id="chatbot-btn" aria-label="Open chat">
  <span class="ping"></span>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
    <path d="m7 22 5-4 5 4"/>
  </svg>
</button>

<!-- CHAT WIDGET -->
<div id="chat-widget" role="dialog" aria-label="PrathTech chat assistant">

  <!-- Header -->
  <div class="widget-header">
    <div class="bot-info">
      <div class="avatar">
        <img src="<?= htmlspecialchars($bot_avatar) ?>" alt="PrathTech Bot">
      </div>
      <div>
        <div class="bot-name">PrathTech</div>
        <div class="bot-sub">AI Assistant</div>
      </div>
    </div>
    <div class="header-actions">
      <!-- Download -->
      <button id="download-chat-btn" title="Download chat" aria-label="Download chat history">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>
      <!-- Close -->
      <button id="close-chat-btn" title="Close chat" aria-label="Close chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Messages -->
  <div id="chat-messages" aria-live="polite" aria-label="Chat messages">

    <!-- Typing indicator (hidden by default) -->
    <div id="typing-indicator">
      <div class="typing-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="white" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="10" x="3" y="11" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
          <line x1="8" y1="16" x2="8" y2="16"/>
          <line x1="16" y1="16" x2="16" y2="16"/>
        </svg>
      </div>
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>

  </div>

  <!-- Input -->
  <div class="widget-input">
    <div class="input-row">
      <textarea
        id="chat-input"
        placeholder="Type your message..."
        rows="1"
        aria-label="Type a message"
      ></textarea>
      <button id="send-btn" disabled aria-label="Send message">
        <!-- Send icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>

</div>

<!-- Tawk.to Code -->

<script type="text/javascript">
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  Tawk_API.onBeforeLoad = function(){ Tawk_API.hideWidget(); };
  Tawk_API.onLoad       = function(){ Tawk_API.hideWidget(); };
  (function(){
    var s1=document.createElement("script"), s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/69a3defbaa21361c33484496/1jik1u1vg';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  })();
</script>


<!-- Chatbot JS -->
<script src="js/chatbot.js"></script>

</body>
</html>
