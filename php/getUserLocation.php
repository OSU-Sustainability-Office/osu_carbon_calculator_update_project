<?php
  // Collect some user data (approximate ip, location, etc)
  $location = file_get_contents("http://api.ipstack.com/".$_SERVER['REMOTE_ADDR']."?access_key=YOUR_ACCESS_KEY");
  // Print info as part of the HTTP reply.
  print $location;
 ?>
