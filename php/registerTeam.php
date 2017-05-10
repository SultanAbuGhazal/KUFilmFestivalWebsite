<?php

$dataFile = "data/teams.json";
$fh = fopen($dataFile, 'r') or die("error");
while(! feof($fh)){
  $line = fgets($fh);
  $obj = json_decode($line, true);
  if($obj['directorID'] == $_POST['directorID'] && $_POST['directorID'] != "100040659"){
    die("declined");
  }
}
fclose($fh);

$fh = fopen($dataFile, 'a') or die("error");
date_default_timezone_set('Asia/Dubai');
$_POST['ts'] = date('l jS \of F Y h:i:s A');
$_POST['source_ip'] = $_SERVER['REMOTE_ADDR'];
$_POST['ip-behind'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
$stringData = json_encode($_POST) . "\n";
fwrite($fh, $stringData);
fclose($fh);

echo "accepted";


$to      = $_POST['directorID'] . "@kustar.ac.ae";
$headers = "From: <no-reply@kufilmfestival.com>\r\nBcc: <100040659@kustar.ac.ae>";
$subject = "KU Film Festival Confirmation";
$message = "Dear " . $_POST['directorName'] . ",\n\nThank you for registering your team in the second KU Film Festival. " .
           "This email confirms that your team registration has been successful.\n" .
           "We wish you the best in this competition. For updates please check our website kufilmfestival.com\n" .
           "If you have any questions please contact theaterclubauh@kustar.ac.ae\nbut DO NOT reply to this email." .
           "\n\nKU Film Festival\nwebsite: kufilmfestival.com\n";


mail($to, $subject, $message, $headers);


?>
