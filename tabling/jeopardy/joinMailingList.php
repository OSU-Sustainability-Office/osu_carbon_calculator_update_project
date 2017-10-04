<?php
$fields = array(
	'email' => urlencode($_POST['email']),
	'fullname' => urlencode($_POST['fullname']),
	'pw' => urlencode($_POST['pw']),
	'pw-conf' => urlencode($_POST['pw-conf']),
	'language' => urlencode($_POST['language']),
	'digest' => urlencode($_POST['digest']),
  'email-button' => urlencode('Subscribe')
);

//url-ify the data for the POST
foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string, '&');
$fields_string = substr($fields_string, 0, -1);

//echo $fields_string;


print curl_spoof("http://lists.oregonstate.edu/mailman/subscribe/sustainability_at_osu");
function curl_spoof($url)
{
$curl = curl_init();

		$header[] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
    	$header[] = "Connection: keep-alive";
    	$header[] = "Content-Type: application/x-www-form-urlencoded";
    	$header[] = "Content-Length: ".strlen($fields_string);
    	$header[] = "Host: lists.oregonstate.edu";

    curl_setopt($curl, CURLOPT_URL, $url);

//Spoof the agent
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0');

//Spoof the Referer
    curl_setopt($curl, CURLOPT_REFERER,  "http://lists.oregonstate.edu/mailman/listinfo/sustainability_at_osu");


    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
		curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
    curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    curl_setopt($curl, CURLOPT_ENCODING, 'gzip, deflate');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);

//set the url, number of POST vars, POST data

    curl_setopt($curl,CURLOPT_POST,1);
    curl_setopt($curl,CURLOPT_POSTFIELDS, $fields_string);

    $html = curl_exec($curl);

    curl_close($curl);


return $html;
   }

   ?>
