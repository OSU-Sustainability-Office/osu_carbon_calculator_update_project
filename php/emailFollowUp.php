<?php
$to      = 'jackrwoods@gmail.com';
$subject = 'OSU Sustainability Office';
$message = 'Thank you so much for visiting the OSU Sustainability Office Booth! For more information regarding sustainability at OSU, feel free to check out:<br>1. <a href=\"https://www.instagram.com/osusustainable/\">Instagram</a><br>2. <a href=\"https://www.facebook.com/OSUsustainable">Facebook</a><br>3. <a href=\"http://carbon.campusops.oregonstate.edu/index.html?email=true\">The OSU Carbon Calculator</a><br>4. <a href=\"http://fa.oregonstate.edu/sustainability/about/sustainability-office\">Our Website</a>';
$headers = 'From: sustainability@oregonstate.edu' . "\r\n" .
    'Reply-To: sustainability@oregonstate.edu' . "\r\n" .
    'Content-type: text/html; charset=utf-8' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?>
