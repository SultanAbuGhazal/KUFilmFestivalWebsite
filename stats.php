<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>KUFF Statistics</title>
    <link rel="shortcut icon" type="image/x-icon" href="icons/favicon.ico">
  </head>
  <body>
    <?php
    $dataFile = "php/data/requestsLog.json";
    $hits_count = -1;
    $user_count = -1;
    $users_array = array();
    $fh = fopen($dataFile, 'r') or die("error");
    while(! feof($fh)){
      $hits_count++;
      $line = fgets($fh);
      $obj = json_decode($line, true);
      if(isset($obj['user']))
        if(!in_array($obj['user'], $users_array)){
          $user_count++;
          $users_array[] = $obj['user'];
        }
    }
    fclose($fh);


    $dataFile = "php/data/teams.json";
    $teams_count = -1;
    $fh = fopen($dataFile, 'r') or die("error");
    while(! feof($fh)){
      $teams_count++;
      fgets($fh);
    }
    fclose($fh);

    $dataFile = "php/data/individuals.json";
    $individuals_count = -1;
    $fh = fopen($dataFile, 'r') or die("error");
    while(! feof($fh)){
      $individuals_count++;
      fgets($fh);
    }
    fclose($fh);
    $vpu = number_format($hits_count / $user_count,3);
    echo "<h3>Hits: $hits_count</h3>";
    echo "<h3>Users: $user_count</h3>";
    echo "<h3> $vpu vists/user</h3>";
    echo "<h3>Teams: $teams_count</h3>";
    echo "<h3>Individuals: $individuals_count</h3>";
    ?>
    <h3>----تجربة----</h3>
  </body>
</html>
