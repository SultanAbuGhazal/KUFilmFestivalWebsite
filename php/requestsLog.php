<?php

$dataFile = "data/requestsLog.json";
$fh = fopen($dataFile, 'a') or die("error");
$_POST['source_ip'] = $_SERVER['REMOTE_ADDR'];
$_POST['ip-behind'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
$stringData = json_encode($_POST) . "\n";
fwrite($fh, $stringData);
fclose($fh);
