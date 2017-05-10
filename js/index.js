$(document).ready(function() {
    var today = new Date();
    var first_date = new Date("1/24/2017");
    var second_date = new Date("2/27/2017");
    var third_date = new Date("4/5/2017");
    var deadline_one_due = (today.getTime() - first_date.getTime()) / 1000 >= 86400;
    var deadline_two_due = (today.getTime() - second_date.getTime()) / 1000 >= 86400;
    var deadline_three_due = (today.getTime() - third_date.getTime()) / 1000 >= 86400;
    if (deadline_one_due) $("#register").hide();

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    var user_id = localStorage.getItem('kuff_user');
    if (user_id === null) {
        user_id = makeid();
        localStorage.setItem('kuff_user', user_id);
    }
    var log = {
        user: user_id,
        device: isMobile.any(),
        ts: new Date().toString(),
        browser_code: navigator.appCodeName,
        browser_name: navigator.appName,
        browser_version: navigator.appVersion,
        browser_platform: navigator.platform,
        user_agent: navigator.userAgent
    };
    $.post("php/requestsLog.php", log, function(response) {});

    var timeDiff = (today.getTime() - first_date.getTime()) / 1000;
    if (timeDiff >= 86400) {
        $("#first-deadline").append("(Deadline Passed)");
        $(".regButton").empty();
        $(".regButton").prop('disabled', true);
        $(".regButton").append("Registration Closed");
    } else if (timeDiff >= 0) {
        $("#first-deadline").append("(Today)");
    } else {
        var diffDays = Math.ceil(timeDiff / (3600 * 24));
        diffDays = Math.abs(diffDays);
        $("#first-deadline").append("(" + diffDays + " days left)");
    }

    timeDiff = (today.getTime() - second_date.getTime()) / 1000;
    if (timeDiff >= 86400) {
        $("#second-deadline").append("(Deadline Passed)");
    } else if (timeDiff >= 0) {
        $("#second-deadline").append("(Today)");
    } else {
        diffDays = Math.ceil(timeDiff / (3600 * 24));
        diffDays = Math.abs(diffDays);
        $("#second-deadline").append("(" + diffDays + " days left)");
    }

    timeDiff = (today.getTime() - third_date.getTime()) / 1000;
    if (timeDiff >= 86400) {
        $("#third-deadline").append("(Deadline Passed)");
    } else if (timeDiff >= 0) {
        $("#third-deadline").append("(Today)");
    } else {
        diffDays = Math.ceil(timeDiff / (3600 * 24));
        diffDays = Math.abs(diffDays);
        $("#third-deadline").append("(" + diffDays + " days left)");
    }

    $("input[name=inputRole]").change(function() {
        if (this.id == "otherchkbx") {
            $("#inputOther")[0].required = true;
            $("#inputOther")[0].disabled = false;
        } else {
            $("#inputOther")[0].required = false;
            $("#inputOther")[0].disabled = true;
        }
    });
    $("#inputOther").keyup(function() {
        $("#otherchkbx").attr("value", $(this).val());
    });
    $(".askForm").submit(function() {
        console.log("Sending ask form...");
        $.post("php/ask.php", $(".askForm").serialize() + "&user=" + user_id, function(response) {
            console.log(response);
            var ask_form = $("#askFluidCont");
            if (response == "sent") {
                ask_form.empty();
                ask_form.append("<div><br><h1>Thank You</h1><p>Just count to ten.</p></div>");
            } else {
                ask_form.empty();
                ask_form.append("<div><br><h1 style='color: red;'>Somthing went wrong</h1><p>please contact us on theaterclubauh@kustar.ac.ae</p></div>");
            }
        });
        return false;
    });
    $("#teamForm > form").submit(function() {
        var form = $("#formsContainer");
        if (deadline_one_due) {
            form.empty();
            form.append("<div><h1>Sorry</h1><p>You missed the deadline.<br>If you face any problems, please drop us a question above.</p></div>");
            return false;
        }
        console.log("Sending team form...");
        $.post("php/registerTeam.php", $("#teamForm > form").serialize() + "&user=" + user_id, function(response) {
            console.log(response);
            if (response == "accepted") {
                form.empty();
                form.append("<div><h1>Thank You</h1><p>You have been successfully registered.<br>We wish you all the best.</p></div>");
            } else if (response == "declined") {
                form.empty();
                form.append("<div><h1>You Have already registered</h1><p>If you did not register,<br>please drop us a question above.</p></div>");
            } else {
                form.empty();
                form.append("<div><h1 style='color: red;'>Registration Failed</h1><p>We apologize.<br>This is not a common error.<br>The issue will be reported immediately.</p></div>");
            }
        });
        return false;
    });
    $("#individualForm > form").submit(function() {
        var form = $("#formsContainer");
        if (deadline_one_due) {
            form.empty();
            form.append("<div><h1>Sorry</h1><p>You missed the deadline.<br>If you face any problems, please drop us a question above.</p></div>");
            return false;
        }
        console.log("Sending individual form...");
        $.post("php/registerIndividual.php", $("#individualForm > form").serialize() + "&user=" + user_id, function(response) {
            console.log(response);
            if (response == "accepted") {
                form.empty();
                form.append("<div><h1>Thank You</h1><p>You have been successfully registered.<br>We wish you all the best.</p></div>");
            } else if (response == "declined") {
                form.empty();
                form.append("<div><h1>You Have already registered</h1><p>If you did not register,<br>please drop us a question above.</p></div>");
            } else {
                form.empty();
                form.append("<div><h1 style='color: red;'>Registration Failed</h1><p>We apologize.<br>This is not a common error.<br>The issue will be reported immediately.</p></div>");
            }
        });
        return false;
    });
    $("#navigation > li").click(function() {
        $("#navigation > li").removeClass("active");
        $(this).addClass("active");
    });
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

function regBtnClick() {
    window.location.href = "#register";
    $("#navigation > li").removeClass("active");
    $("#menuRegister").addClass("active");
};
