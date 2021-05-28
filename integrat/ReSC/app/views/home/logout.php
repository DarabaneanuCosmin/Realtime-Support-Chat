<?php

session_start();
session_regenerate_id(true);
session_unset();
session_destroy();
$_SESSION = array();

header("location: ../index.php");
exit();
?>