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
});