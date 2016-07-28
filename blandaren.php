   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Bländaren</title>
    <link rel="stylesheet" href="css/swiper.min.css" />
    <link rel="stylesheet" href="css/main.css" type="text/css">
    <script src="js/gallery.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
      $link = connectToDB();
    ?>

    <div class="content-wrapper">
      <div id="popup_container"></div>
        <?php
          if (session_status() == PHP_SESSION_NONE) {
              sec_session_start();
          }
          $admin = $_SESSION['admin'];

          // =================== BLÄNDAREN ===============
          echo '<div id="blandar_container">';
            if ($admin) {
              echo '<div class="admin-controls">';
              echo '<a class="no-link upload_link admin-control" href="blandaren_upload.php">Ladda upp Bländaren</a>';
              echo '<div id="deleteblandarenbutton" class="deletestuff admin-control">Radera bländare</div>';
              echo '</div>';
            }

            echo '<div id="blandare">';
            $query = "SELECT blandarpdf, frontpage, blandarid, blandarname FROM blandare ORDER BY uploaddate ASC";
            $result = execQuery($link, $query);

            while ($blandare = $result->fetch_object()) {
              $nextcategory = $blandare->category;

              echo '<div id="' . $blandare->blandarid . '" class="blandarDiv_container">';


              
              echo '
                    <a class="no-link" target="_blank" href="images/uploads/blandaren/pdfs/' . $blandare->blandarpdf . '">
                      <h3 class="blandartitle">' . $blandare->blandarname . '</h3>
                      <img class="blandarthumb" src="images/uploads/blandaren/frontpages/' . $blandare->frontpage . '"/>
                    </a>';

              if ($admin) {
                echo '<div class="delete deleteblandare" id="delete_' . $blandare->frontpage . '"><span class="ion-ios-trash-outline"></span> <span class="hide-on-mobile">DELETE </span>' . $blandare->blandarid . '</div>';
              }

              echo '</div>'; // blandarDiv_container

            }
            echo '</div>';
          echo '</div>';
          // ================ BLÄNDAREN ================

          ?>

    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script src="js/swiper.jquery.min.js"></script>

    </div> <!-- close push-wrap from inc_top_content -->
    </div> <!-- close site-wrap from inc_top_content -->

  </body>
</html>
