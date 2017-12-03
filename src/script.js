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
    $("#page").load(page, function(response, status, xhr) {
        if (status == "error") {
            $("#page").html("<h3>Not found!</h3>");
        }
    });
}

function loadSection(id, page) {
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
    if (error) error = error();
    //console.log(error);
    if (error) {
        showAlert(error);
    } else {
        //console.log(target);
        //console.log($(this).serialize());
        $.post(target, $(this).serialize() + '&submit=true', function(data) {
            showAlert(data);
        });
        /*.always(function() {
            //loadPage(target);
        });*/
    }
    return false;
});


/* Responsive sidebar and item loading */
$("#toggle").click(function() {
    var x = $("#nav");
    x.css("display",  x.css("display") !== 'block' ? 'block' : 'none');
});

function loadMenuItem() {
    var hash = location.hash;
    if (hash.length > 0) hash = hash.substr(1);
    if (hash == "") hash = "switch";
    loadPage(hash + ".html");
    $('#nav > a:not(".group")').each(function(i, v) { 
        $(v).attr('class', $(v).attr('href').substr(1) == hash ? 'active' : ''); 
    });
}

function onResize() {
    $("#nav").css('display', $(window).width() > 700 ? 'block' : 'none');
    if ($(window).width() > 700) {
        $("#nav").css("minHeight", "80vh");
    }
}

$(window).on("hashchange", loadMenuItem);
$(window).on("resize", onResize);
loadMenuItem();
onResize();

/* AP click */
function setAp() {
    $("#stassid").val($(this).text());
}

/* Confirmation */
function restart() { window.location = "restart.html"; }
function cancel() { window.location.hash = "#switch"; }


/* Reload page content */
setInterval(loadMenuItem, 60000);


/* Input validation */
var regexSsid = /[^a-z0-9\-\_]/gi;
var regexAlphanum = /[^a-z0-9]/gi;
var regexNum = /[^0-9]/gi;
var regexServer = /([a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+)*)/gi;

function onApSecChange() {
    if ($("#apsec").val() == "o")
        $("#appw").attr("disabled", "disabled");
    else
        $("#appw").removeAttr("disabled");
}

function onApSubmit() { 
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

function onStaSubmit() { 
    var p = $("#stapw").val();
    if (p.length !=0 && (p.length < 8 || p.length > 32)) {
        return "Password must be 8-32 characters long";
    }
    return false;
}

function onMqttSubmit() { 
    var server = $("#mqserver").val();
    var port = $("#mpport").val();
    var user = $("#mquser").val();
    var pw = $("#mqpw").val();
    
    if (!server.match(regexServer)) {
        return "Invalid Server.";
    }
    if (port.match(regexNum)) {
        return "Invalid Port.";
    }
    if (server.length < 5 || server.length > 60) {
        return "Server must be 5-60 characters long.";
    }
    if (port.length > 5) {
        return "Port must be less than 5 digits.";
    }
    if (user.length > 5) {
        return "User must be greater than 5 characters.";
    }
    if (pw.length > 5) {
        return "Password must be greater than 5 characters.";
    }
    return false;
}