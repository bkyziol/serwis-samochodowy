<?php
error_reporting(0);

$servername = "localhost";
$username = "user";
$password = "pyPYWD5dzDQc3wcX";
$dbname = "serwis_samochodowy";
$rows = array();
$appointments = array("0900","0930","1000","1030","1100","1130","1200","1230","1300","1330","1400","1430","1500","1530","1600","1630","1700","1730");
$arrlength = count($appointments);

$client_day = $_GET["d"];
$client_month = $_GET["m"]+1;
$client_year = $_GET["r"];

date_default_timezone_set('Europe/Berlin'); // CDT

$server_time = new DateTime(date("Y/m/d"));
$client_time  = new DateTime("$client_year/$client_month/$client_day");
$time_difference = $server_time->diff($client_time);
$time_difference_in_days = $time_difference->days;

if ($time_difference_in_days === 0) {
  $server_hour = date("Hi");

  for($x = 0; $x < $arrlength; $x++) {
    if ($server_hour > $appointments[$x]){
      $rows[] = array ("godzina"=>$appointments[$x],"status"=>"Wolne");
    }
  }
}
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error");
}else{
  $sql = "SELECT godzina FROM terminarz WHERE dzien = $time_difference_in_days";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $rows[] = $row;
      }
  }
  if (date('w', strtotime("$client_year/$client_month/$client_day"))== 6){
    for($x = 0; $x < $arrlength; $x++) {
      if ($appointments[$x] > "1330"){
        $rows[] = array ("godzina"=>$appointments[$x],"status"=>"Zamk.");
      }
    }
  }elseif (date('w', strtotime("$client_year/$client_month/$client_day"))== 0){
    for($x = 0; $x < $arrlength; $x++) {
      $rows[] = array ("godzina"=>$appointments[$x],"status"=>"Zamk.");
    }
  }
  $myJSON = json_encode($rows);
  echo $myJSON;
  $conn->close();
}
?>
