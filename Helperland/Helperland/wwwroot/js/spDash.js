$(document).ready( function () {
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

    showCount();
});

function showCount() {
    $.ajax({
        url: "/Serviceprovider/GetCount",
        method: "GET",
        success: (data) => {
            $(".newServCount").text(data.newSer);
            $(".upServCount").text(data.upSer);
            $(".compServCount").text(data.compSer);
        },
        error: (err) => {
            console.log(err);
        }
    });
}