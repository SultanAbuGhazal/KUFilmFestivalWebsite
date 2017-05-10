<?php

$dataFile = "data/teams.json";
$fh = fopen($dataFile, 'r') or die("error");
while(! feof($fh)){
  $line = fgets($fh);
  $obj = json_decode($line, true);
  $out_array[] = $obj;
}
fclose($fh);
echo json_encode($out_array);
