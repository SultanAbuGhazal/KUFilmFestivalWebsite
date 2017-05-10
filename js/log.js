$(document).ready(function() {
    $.get("php/teams-log.php", function(list, status) {
        $("body").empty();
        list = JSON.parse(list);
        console.log(list);
        for(var i = 0; i < list.length - 1; i++){
            var team = "<div class='container box'><div class='row'><div class='col-sm-6'><h1>Team #"+ (i+1) +"</h1><dl class='list'>" +
                "<dt>Director</dt><dd>" + list[i]['directorName'] + " " + list[i]['directorID'] + "</dd><dt>Writer</dt><dd>" + list[i]['writerName'] + " " + list[i]['writerID'] + "</dd>" +
                "<dt>Editor</dt><dd>" + list[i]['editorName'] + " " + list[i]['editorID'] + "</dd><dt>Cameraman</dt><dd>" + list[i]['videographerName'] + " " + list[i]['videographerID'] + "</dd></dl></div>" +
                "<div class='col-sm-6'><dl class='list'>" +
                "<dt>Movie Genre</dt><dd>" + list[i]['genre'] + "</dd><dt>Movie Description</dt><dd>" + list[i]['Desc'] + "</dd>" +
                "<dt>Time Submitted</dt><dd>" + list[i]['ts'] + "</dd></dl></div></div></div>";
            $("body").append(team);
        }
    });

});
