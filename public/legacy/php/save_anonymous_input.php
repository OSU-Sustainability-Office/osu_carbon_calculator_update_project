<?php
  // Get all of the contents in the file.
  $file_contents = file_get_contents('./data.csv');

  // Collect some user data (approximate ip, location, etc)
  $location = file_get_contents("http://freegeoip.net/csv/".$_SERVER['REMOTE_ADDR']);
  //Date(M/D/Y),Time,IP Address,Country,Country,Region,Region,City,Zip/Postal Code,Time Zone,Latitude,Longitude,Metro Code,Transportation Total,Car,Short Bus,Long Bus,Train,Airplane,Consumption Total,Textbooks,Clothing,Cellphone,eReader,Plastic Bottle,Energy Total,Dorm Energy Audit,Energy Gas Baseline,Energy Baseline,Food Total,Food Conversion,Coffee Conversion,Waste Total,Water Total,
  $txt = "\n".date("m/d/Y").",".date("h:i:sa").",".substr($location, 0, -2).",".$_POST["trans_total"].",".$_POST["trans_car_conv"].",".$_POST["transshort_bus_conv"].",".$_POST["trans_long_bus_conv"].",".$_POST["trans_train_conv"].",".$_POST["trans_airplane_conv"].","
    .$_POST["cons_total"].",".$_POST["consumption_textbook_conv"].",".$_POST["consumption_clothing_conv"].",".$_POST['consumption_cellphone_conv'].",".$_POST['consumption_eReader_conv'].",".$_POST['consumption_plastic_bottle_conv'].","
    .$_POST["energy_total"].",".$_POST['energy_audit_dorm_conv'].",".$_POST['energy_gas_baseline_conv'].",".$_POST['energy_baseline_conv'].","
    .$_POST["food_total"].",".$_POST['food_conv'].",".$_POST['consumption_coffee_conv'].","
    .$_POST["waste_total"].","
    .$_POST["water_total"].",";

  // Open file to overwrite with new data
  $myfile = fopen("./data.csv", "w") or die("Unable to open file!");
  fwrite($myfile, $file_contents.$txt);
  fclose($myfile);
 ?>
