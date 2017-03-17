<?php
// error_reporting(0);
$servername = "localhost";
$username = "user";
$password = "pyPYWD5dzDQc3wcX";
$dbname = "serwis_samochodowy";

$day = $_POST["dzien"];
$month = $_POST["miesiac"]+1;
$year = $_POST["rok"];
$hour = $_POST["godzina"];
$plate_number = $_POST["rejestracja"];
$phone_number = $_POST["telefon"];

date_default_timezone_set('Europe/Berlin'); // CDT

$server_time = new DateTime(date("Y/m/d"));
$client_time  = new DateTime("$year/$month/$day");
$time_difference = $server_time->diff($client_time);
$time_difference_in_days = $time_difference->days;

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error przy laczeniu sie");
}

$sql = "INSERT INTO terminarz(dzien, godzina, telefon, rejestracja)
VALUES ('$time_difference_in_days', '$hour', '$phone_number', '$plate_number')";
// VALUES ($roznica_czasu, $godzina, $telefon, $rejestracja)";

if ($conn->query($sql) === TRUE) {
  echo "OK";
} else {
  die("Błąd w trakcie dodawania do bazy danych.");
}

$conn->close();
?>
