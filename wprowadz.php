<?php
// error_reporting(0);
$servername = "localhost";
$username = "user";
$password = "pyPYWD5dzDQc3wcX";
$dbname = "serwis_samochodowy";

$dzien = $_POST["dzien"];
$miesiac = $_POST["miesiac"]+1;
$rok = $_POST["rok"];
$godzina = $_POST["godzina"];
$rejestracja = $_POST["rejestracja"];
$telefon = $_POST["telefon"];

date_default_timezone_set('Europe/Berlin'); // CDT

$czas_serwera = new DateTime(date("Y/m/d"));
$czas_klienta  = new DateTime("$rok/$miesiac/$dzien");
$czas_roznica = $czas_serwera->diff($czas_klienta);
$roznica_czasu = $czas_roznica->days;

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error przy laczeniu sie");
}

$sql = "INSERT INTO terminarz(dzien, godzina, telefon, rejestracja)
VALUES ('$roznica_czasu', '$godzina', '$telefon', '$rejestracja')";
// VALUES ($roznica_czasu, $godzina, $telefon, $rejestracja)";

if ($conn->query($sql) === TRUE) {
  echo "OK";
} else {
  die("Error przy dodawaniu");
}

$conn->close();
?>
