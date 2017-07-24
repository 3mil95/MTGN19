<?php
 include_once ('functions_common.php');

  $link = connectToDB();

  if (session_status() == PHP_SESSION_NONE) {
      sec_session_start();
  }

  // Only redirect if we are not already on the login page
  if ($_SERVER['PHP_SELF'] !== '/login.php'){
    // If not logged in, redirect to login page
    if (login_check($link) == false) {
      $host = $_SERVER['HTTP_HOST'];
      $uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
      header("Location: http://$host$uri/login.php");
    }
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <!-- All the shared stuff here, specific things in each viewfile -->

    <!-- Meta -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <!--Icon-->
    <link rel="icon" href="/design/Icon.png" type="image/x-icon" />

    <!-- Include the jQuery library -->
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <!-- Include the jQuery Mobile library -->
    <script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/main.css" type="text/css">
    <link rel="stylesheet" href="css/responsive.css" type="text/css">
    <link rel="stylesheet" href="css/slideout.css" type="text/css">

    <!-- Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700|Pirata+One' rel='stylesheet' type='text/css'>


    <!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/sha512.js"></script>
    <script src="https://use.fontawesome.com/9b6ee04da3.js"></script>
    <script src="js/slideout.min.js"></script>
