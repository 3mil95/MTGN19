 <?php
  //Load header
  include_once ('inc_header.php');

  $link = connectToDB();

  if (session_status() == PHP_SESSION_NONE) {
      sec_session_start();
  }
  ?>
    <title>Mottagningen 2016</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');

      $username = $_SESSION['username'];
      $admin = $_SESSION['admin'];

      if(isset($_GET['user'])) {
        $get_username = $_GET['user'];
      }

      // Kolla om det är användarens egna sida
      if ($get_username == $username || $get_username == null) {
        $ownProfile = true;
      } else {
        $ownProfile = false;
      }

      if (!$ownProfile) {
        $username = $get_username;
      }

      // Hämta föregående användare och nästa
      $query = "SELECT username FROM users ORDER BY usergroup, n0llegroup, name ASC";
      $result = execQuery($link, $query);

      $count = mysqli_num_rows($result);

      $counter = 1;
      while ($r = $result->fetch_object()) {
        if ($counter == 1) {
          $firstUser = $r->username;
        }
        if ($r->username == $username) {
          if ($nextUserObj = $result->fetch_object()) {
            $nextUser = $nextUserObj->username;
          }

          $prevUser =  $pu;
        }

        $pu = $r->username;
        $counter += 1;
        if ($counter == $count) {
          $lastUser = $r->username;
        }
      }

      if (!$prevUser) {
        $prevUser = $lastUser;
      }

      if (!$nextUser) {
        $nextUser = $firstUser;
      }

      // Hämta användaruppgifter
      // $stmt = $link->prepare("SELECT name, email, imagename, gifname, usergroup, description, gandalf, kaniner, patronus, n0llegroup FROM users WHERE username = ? LIMIT 1");
      $stmt = $link->prepare("SELECT name, email, imagename, gifname, usergroup, description, n0llegroup FROM users WHERE username = ? LIMIT 1");
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();
      // $stmt->bind_result($name, $email, $imagename, $gifname, $usergroup, $description, $gandalf, $kaniner, $patronus, $n0llegroup);
      $stmt->bind_result($name, $email, $imagename, $gifname, $usergroup, $description, $n0llegroup);
      $stmt->fetch();

      // Hämta profilbild om det finns någon
      if ($usergroup !== 'nØllan') {
        if ($gifname != null) {
          $imagepath = "images/uploads/profile_gifs/" . $gifname;
        } else {
          // $imagepath = null;
          $imagepath = "images/uploads/profile_pictures/" . $imagename;
        }
      } else {
        if ($imagename != null) {
          $imagepath = "images/uploads/profile_pictures/" . $imagename;
        } else {
          $imagepath = null;
        }
      }
    ?>

    <div class="content-wrapper">

        <?php

        //Wrapper
        echo "<div class='profile-wrapper'>";
        //Länkar
        echo "<div class='prevProfileLink'><a class='no-link' href='profile.php?user=$prevUser'><i class='fa fa-arrow-left' aria-hidden='true'></i></a></div>";
        echo "<div class='nextProfileLink'><a class='no-link' href='profile.php?user=$nextUser'><i class='fa fa-arrow-right' aria-hidden='true'></i></span></a></div>";

        // Profilbild
        if ($imagepath != null) {
          echo "<div id='profilepic-wrapper' style='background-image:url(\"$imagepath\")'>";
          echo "</div>";
          echo "<div id='profile-banner'></div>";
        }

        // namn
        if ($name != null) {
          echo "<div class='non-semantic-protector'> ";
          echo "<p class='bottom-ribbon'><span class='ribbon-content'>$name</span></p>";
          if ($usergroup == 'nØllan' || ($usergroup == 'KPH' && $n0llegroup != null)) {
            echo "<p class='n0llegroup'>$n0llegroup</p>";
          }
          echo "</div>";
        }

        // brytstreck
        // echo "<svg class='profile-divider-line'>";
        // echo "<line x1='0' y1='0' x2='100%' y2='0'/>";
        // echo "</svg>";

        // beskrivning
        echo "<div class='description-wrap'>";
        echo '<p class="description '.($usergroup == 'RSA' ? 'rsa-ser-allt' : '').'">'.
              $description.'
            </p>';
        echo "</div>";

        // Kommenterar bort detta så länge - diskutera om hur n0llegruppsnamnet ska visas /Kalle

        // if ($usergroup == 'nØllan' || ($usergroup == 'KPH' && $n0llegroup != null)) {
        //   echo "<p>
        //       <span class='question'>nØllegrupp</span>
        //       <span class='answer'>$n0llegroup</span>
        //     </p>";
        // }

        // if ($gandalf != null) {
        //   echo "<p>
        //       <span class='question'>Gandalf eller Dumbledore</span>
        //       <span class='answer'>$gandalf</span>
        //       </p> ";
        // }

        // if ($kaniner != null) {
        //   echo "<p>
        //       <span class='question'>Antal kaniner i hatten</span>
        //       <span class='answer'>$kaniner</span>
        //       </p> ";
        // }

        // if ($patronus != null) {
        //   echo "<p>
        //       <span class='question'>Skepnad på patronus</span>
        //       <span class='answer'>$patronus</span>
        //       </p> ";
        // }

        // Användaren kan bara redigera profilen om det är hens profil eller om hen är admin
        if ($admin || $ownProfile) {
          echo "<div class=\"edit_profile_link\"><a id=\"edit_profile\" class=\"no-link button\" href=\"profile_edit.php?user=$username\">Redigera profil</a></div>";
        }

        echo "</div>"; //Wrapper
      ?>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
