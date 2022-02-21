$(document).ready(() => {
    $(window).scroll((e) => {
        if (window.scrollY > 0) {
            $('.price-navbar').css('opacity', '0.8');
        } else {
            $('.price-navbar').css('opacity', '1');
        }
    });
    $(".hamburger").click(function (e) {
        $(".smNavMenu").addClass("open");
    });
    $(".firstPart").click(function (e) {
        $(".smNavMenu").removeClass("open");
    });
    $(".dashNavSide a").click(function (e) {
        $(".smNavMenu").removeClass("open");
    });

    if ($("#inputNewPass").val() == "" || $("#inputCPass").val()) {
        $("#btnPswUpdate").prop("disabled", true);
    }

    $("#inputNewPass").on('keyup', () => {
        var pass = $("#inputNewPass").val();
        var passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);
       
        if (pass.length < 8) {
            $("#errorNewPass").removeClass("d-none");
            $("#errorNewPass").text("Password must have minimum 8 characters!");
        } else if (!passCheck) {
            $("#errorNewPass").removeClass("d-none");
            $("#errorNewPass").text("Password must have contain atleast 1 UpperCase Alphabet, 1 LowerCase Alphabet, 1 Number and 1 Special Character");
        } else {
            $("#errorNewPass").addClass("d-none");
        }
    });
    $("#inputCPass").on('keyup', () => {
        var pass = $("#inputNewPass").val();
        var cPass = $("#inputCPass").val();
        if (pass != cPass) {
            $("#errorCPass").removeClass("d-none");
            $("#errorCPass").text("Confirm password doesn't match, Type again !");
        } else {
            $("#errorCPass").addClass("d-none");
        }
    });

    $("#inputNewPass, #inputCPass").on('keyup', () => {

        if ($("#errorNewPass").hasClass("d-none") && $("#errorCPass").hasClass("d-none")) {
            $("#btnPswUpdate").prop("disabled", false);
        } else {
            $("#btnPswUpdate").prop("disabled", true);
        }
    });
    
});
