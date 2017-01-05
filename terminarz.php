<?php
error_reporting(0);
$servername = "localhost";
$username = "user";
$password = "pyPYWD5dzDQc3wcX";
$dbname = "serwis_samochodowy";
$rows = array();
$godziny_przyjec = array("0900","0930","1000","1030","1100","1130","1200","1230","1300","1330","1400","1430","1500","1530","1600","1630","1700","1730");
$arrlength = count($godziny_przyjec);

$klient_dzien = $_GET["d"];
$klient_miesiac = $_GET["m"]+1;
$klient_rok = $_GET["r"];

date_default_timezone_set('Europe/Berlin'); // CDT

$czas_serwera = new DateTime(date("Y/m/d"));
$czas_klienta  = new DateTime("$klient_rok/$klient_miesiac/$klient_dzien");
$czas_roznica = $czas_serwera->diff($czas_klienta);
$roznica_czasu = $czas_roznica->days;

if ($roznica_czasu === 0) {
  $godzina_serwera = date("Hi");

  for($x = 0; $x < $arrlength; $x++) {
    if ($godzina_serwera > $godziny_przyjec[$x]){
      $rows[] = array ("godzina"=>$godziny_przyjec[$x],"status"=>"Wolne");
    }
  }
}

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error");
}

$sql = "SELECT godzina FROM terminarz WHERE dzien = $roznica_czasu";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }
}

if (date('w', strtotime("$klient_rok/$klient_miesiac/$klient_dzien"))== 6){
  for($x = 0; $x < $arrlength; $x++) {
    if ($godziny_przyjec[$x] > "1330"){
      $rows[] = array ("godzina"=>$godziny_przyjec[$x],"status"=>"Zamk.");
    }
  }
}

if (date('w', strtotime("$klient_rok/$klient_miesiac/$klient_dzien"))== 0){
  for($x = 0; $x < $arrlength; $x++) {
    $rows[] = array ("godzina"=>$godziny_przyjec[$x],"status"=>"Zamk.");
  }
}

$myJSON = json_encode($rows);
echo $myJSON;

$conn->close();

?>
