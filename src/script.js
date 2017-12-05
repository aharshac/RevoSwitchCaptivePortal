var spinnerText = '<div class="sp sp-3balls"></div>';

/* Alert */
function showAlert(msg) {
    $("#modalText").html(msg);
    $("#modal").css("display", "block");
}

$("#modal").on('click', function() {
    $(this).css("display", "none");
});



/* Ajax page loading */
function loadPage(page) {
    $("#page").html(spinnerText);
    $("#page").load(page, function(response, status, xhr) {
        if (status == "error") {
            $("#page").html("<h3>Not found!</h3>");
        }
        $("#modal").click();
    });
}

function loadSection(id, page) {
    $(id).html(spinnerText);
    $(id).load(page, function(response, status, xhr) {
        if (status == "error") {
            $(id).html("Could not load!");
        }
    });
}

/* Responsive form loading */
$(document).on('submit', 'form.ajax', function() {
    var target = $(this).attr('target');
    var fn = $(this).data('fn');
    console.log(fn);
    var error = fn && eval(fn);
    if (error) error = error($(this));
    //console.log(error);
    if (error) {
        showAlert(error);
    } else {
        //console.log(target);
        //console.log($(this).serialize());
        $.post(target, $(this).serialize() + '&submit=true', function(data) {
            showAlert("<div>" + data + "</div>");
            if (data.indexOf("<b></b>") == -1) setTimeout(function() { loadPage(target); }, 500);
        });
        /*.always(function() {
            //loadPage(target);
        });*/
    }
    return false;
});


/* Responsive sidebar and item loading */
$("#toggle").click(function() {
    var nav = $("#nav");
    nav.css("display",  nav.css("display") !== 'block' ? 'block' : 'none');
    $("#pageHolder").css("display",  nav.css("display") == 'none' ? 'block' : 'none');
});

function loadMenuItem() {
    var hash = location.hash;
    if (hash.length > 0) hash = hash.substr(1);
    if (hash == "") hash = "home";
    loadPage(hash + ".html");
    $('#nav > a:not(".group")').each(function(i, v) { 
        $(v).attr('class', $(v).attr('href').substr(1) == hash ? 'active' : ''); 
    });
}

function onResize() {
    $("#nav").css('display', $(window).width() > 700 ? 'block' : 'none');
    if ($(window).width() > 700) {
        $("#nav").css("minHeight", "70vh");
        $("#pageHolder").css("minHeight", "70vh");
        $("#pageHolder").css("display", 'block');
    }
}

$('#nav > a:not(".group")').click(function() {
    if ($(window).width() < 700) $("#toggle").click();
});

$(window).on("hashchange", loadMenuItem);
$(window).on("resize", onResize);
loadMenuItem();
onResize();


/* Switch change */
$(document).on('change', ".switch > input[type='checkbox']", function() {
    var target = "home.html";
    //loadPage(link);
    $.get(target, "switch=" + $(this).data('switch') + "&state=" + this.checked, function(data) {
        showAlert(data);
        if (data.indexOf("<b></b>") == -1) setTimeout(function() { loadPage(target); }, 500);
    });
    console.log(target);
});


/* AP click */
function setAp() {
    $("#stassid").val($(this).text());
}

/* Confirmation */
function restart() { window.location = "restart.html"; }
function cancel() { window.location.hash = "#home"; }


/* Reload page content */
// setInterval(loadMenuItem, 60000);


/* Input validation */
var regexSsid = /[^a-z0-9\-\_]/gi;
var regexAlphanum = /[^a-z0-9]/gi;
var regexNum = /[^0-9]/gi;
var regexServer = /([a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+)*)/gi;
var regexSwitch = /.{0,16}/gi;

function onApSecChange(form) {
    if ($("#apsec").val() == "o")
        $("#appw").attr("disabled", "disabled");
    else
        $("#appw").removeAttr("disabled");
}

function onApSubmit(form) { 
    var a = $("#apssid").val();
    var p = $("#appw").val();
    
    if (a.match(regexSsid)) {
        return "Invalid SSID.";
    }
    if (p.match(regexAlphanum)) {
        return "Invalid password.";
    }
    if (a.length < 5 || a.length > 15) {
        return "SSID must be 5-15 characters long";
    }
    if (p.length < 8 || p.length > 15) {
        return "Password must be 8-15 characters long";
    }
    return false;
} 

function onStaSubmit(form) { 
    var s = $("#stassid").val();
    var p = $("#stapw").val();
    if (s.length < 1 || s.length > 32) {
        return "SSID must be 1-32 characters long";
    }
    if (p.length !=0 && (p.length < 8 || p.length > 64)) {
        return "Password must be 8-64 characters long";
    }
    return false;
}

function onMqttSubmit(form) { 
    var server = $("#mqserver").val();
    var port = $("#mqport").val();
    var user = $("#mquser").val();
    var pw = $("#mqpw").val();
    
    if (!server.match(regexServer)) {
        return "Invalid Server.";
    }
    if (port.match(regexNum)) {
        return "Invalid Port.";
    }
    if (server.length < 5 || server.length > 32) {
        return "Server must be 5 to 32 characters long.";
    }
    if (port.length < 3 || port.length > 5 || isNaN(port)) {
        return "Port must be 3 to 5 digits long.";
    }
    if (user.length > 32) {
        return "User must be less than 32 characters.";
    }
    if (pw.length > 32) {
        return "Password must be less than 32 characters.";
    }
    return false;
}

function onSwitchSubmit(form) { 
    form.children('input[type="text"]').each(function () {
        if (!this.value.match(regexSwitch)) {
            return "Invalid input.";
        }
    });
    return false;
}