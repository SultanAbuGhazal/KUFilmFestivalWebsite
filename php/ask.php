<?php

$id = $_POST['senderID'];
$question = $_POST['senderQuestion'];
$user = $_POST['user'];

$to      = "100040659@kustar.ac.ae";
$headers = "From: <no-reply@kufilmfestival.com>\r\nBcc: <100040659@kustar.ac.ae>";
$subject = "[KUff] Question from " . $id;
$message = "User: ".$user."\nIP Address: ".$_SERVER['REMOTE_ADDR']."\n\nQuestion: ".$question."\n\nEND";


if(!mail($to, $subject, $message, $headers)) die("failed");
else echo "sent";



?>
