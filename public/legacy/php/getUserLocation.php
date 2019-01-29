<?php
  // Collect some user data (approximate ip, location, etc)
  $location = file_get_contents("http://api.ipstack.com/".$_SERVER['REMOTE_ADDR']."?access_key=b9c68aebc8a30c958ed8e258a7a9a22e");
  // Print info as part of the HTTP reply.
  print $location;
 ?>
