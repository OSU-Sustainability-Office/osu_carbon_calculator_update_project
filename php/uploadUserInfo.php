<?php

$url = "http://ec2-54-186-223-223.us-west-2.compute.amazonaws.com/upload";

// The data to send to the API
$postData = $_GET["userObject"];

// Create the context for the request
$context = stream_context_create(array(
    'http' => array(
        // http://www.php.net/manual/en/context.http.php
        'method' => 'POST',
        'header' => "Authorization: {$authToken}\r\n".
            "Content-Type: application/json\r\n",
        'content' => $postData // can also use json_encode()
    )
));

// Send the request
$response = file_get_contents($url, FALSE, $context);

// Check for errors
if($response === FALSE){
    die('Error');
}


// Print the date from the response
echo $response;
?>
