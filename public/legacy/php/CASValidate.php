<?php
$ticket = $_GET["ticket"];
$app_url = "http://carbon.campusops.oregonstate.edu/";
$response = file_get_contents("https://login.oregonstate.edu/idp/profile/cas/serviceValidate?ticket=".$ticket."&service=http://carbon.campusops.oregonstate.edu/");
print($response);
?>
