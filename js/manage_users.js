function updateUser(oldUsername, username, name, group, n0llegroup, admin, profilePicture, remove) {
    var fd = new FormData();
    fd.append("oldUsername", oldUsername);
    fd.append('username', username);
    fd.append('name', name);
    fd.append('group', group);
    fd.append('n0llegroup', n0llegroup);
    fd.append('admin', admin);
    fd.append('remove', remove);

    if (profilePicture != 0)
    {
        fd.append('profilePicture', profilePicture);
    }

    $.ajax({
        url: "",
        url: '/update_users.php',
        type: "POST",
        contentType:false,
        processData: false,
        cache: false,
        data: fd,
        success: function(output) {
            if (output != "")
            {
                $("#manage_status").append(output + "<br>");
            }
        }
    });
}

$(function(){
    if ($(window).width() <= 940)
    {
        $(".content-wrapper").html("<p style='padding-top: 50px'>Sorry, men denna sida fungerar inte på mobilen! Leta upp en dator ifall du vill använda denna sida!</p>");
    }

    $("#manage_button_save").click(function() {
        var toDelete = $(".manage_users_table > tbody > tr > td:nth-child(7) > center > input[type='checkbox']:checked").length;
        if (toDelete > 0)
        {
            if (!confirm("Är du säker på att du vill ta bort " + toDelete + " användare?"))
            {
                return;
            }
        }

        $(".manage_users_table > tbody > tr").each(function(i, elem) {
            var oldUsername = $(elem).data("username");

            if (oldUsername)
            {
                var username = $($(elem).children().get(0)).children().first().val();
                var name = $($(elem).children().get(1)).children().first().val();
                var group = $($(elem).children().get(2)).children().first().val();
                var n0llegroup = $($(elem).children().get(3)).children().first().val();
                var admin = $($(elem).children().get(4)).children().first().children().first().is(':checked');
                var profilePicture = $("#filechooser-" + oldUsername)[0].files[0];
                var remove = $($(elem).children().get(6)).children().first().children().first().is(':checked');

                updateUser(oldUsername, username, name, group, n0llegroup, admin, profilePicture, remove);
            }
        });

        $("#manage_status").text("");
    });
});