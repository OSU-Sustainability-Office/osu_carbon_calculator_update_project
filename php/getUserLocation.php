<?php
  // Collect some user data (approximate ip, location, etc)
  $location = file_get_contents("http://freegeoip.net/json/".$_SERVER['REMOTE_ADDR']);
  // Print info as part of the HTTP reply.
  print substr($location, 0, -2);
 ?>
