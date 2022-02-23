$(document).ready(function () {

    $(".hamburger").click(function (e) {
        $(".smNavMenu").addClass("open");
    });
    $(".firstPart").click(function (e) {
        $(".smNavMenu").removeClass("open");
    });
    $(".dashNavSide a").click(function (e) {
        $(".smNavMenu").removeClass("open");
    });
    $(window).scroll((e) => {
        if (window.scrollY > 0) {
            $('.serviceHistory-nav').css('opacity', '0.8');
            $('#homebtn').css('display', 'block');
        } else {
            $('.serviceHistory-nav').css('opacity', '1');
            $('#homebtn').css('display', 'none');
        }
    });
    $("#homebtn").click(function (e) {
        $("html, body").animate({ scrollTop: 0 }, 0);
    });
    $(window).resize(() => {
        if ($(window).width() < 425) {
            $("#nav-details-tab").html('<i class="fal fa-file-alt fa-lg"></i>');
            $("#nav-address-tab").html('<i class="fal fa-map-marker-alt fa-lg"></i>');
            $("#nav-pass-tab").html('<i class="fal fa-key fa-lg"></i>');
        } else {
            $("#nav-details-tab").html("My Details");
            $("#nav-address-tab").html("My Addresses");
            $("#nav-pass-tab").html("Change Password");
        }
    });
    $("#inputDOB").dateDropdowns({
        submitFieldName: 'inputDOB',
        minAge: 18,
        submitFormat: "dd/mm/yyyy"
    });
});

