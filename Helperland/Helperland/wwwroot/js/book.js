$(document).ready(function () {
    var today = new Date();
    $('#bookDate').calendar({
        type: 'date',
        monthFirst: false,
        minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var day = date.getDate();
                var month = date.getMonth()+1;
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
        }
    });
   
    $(window).scroll((e) => {
        if (window.scrollY > 0) {
            $('#homebtn').css('display', 'block');
        } else {
            $('#homebtn').css('display', 'none');
        }
    });
    $("#homebtn").click(function (e) {
        $("html, body").animate({ scrollTop: 0 }, 0);
    });
    $(".btnAddAddress").click((e) => {
        $(".addressForm").removeClass("d-none");
        $(".addressBtn").addClass("d-none");
    })
    $(".button-discard").click((e) => {
        $(".addressBtn").removeClass("d-none");
        $(".addressForm").addClass("d-none");
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

    $("#setup-tab").click((e) => {
        $("#setup-tab").removeClass("filled").addClass("active");
        $("#schedule-tab").removeClass("filled").removeClass("active");
        $("#details-tab").removeClass("filled").removeClass("active");
        $("#payment-tab").removeClass("filled").removeClass("active");
    });
    $("#schedule-tab").click((e) => {
        $("#setup-tab").removeClass("active").addClass("filled");
        $("#schedule-tab").removeClass("filled").addClass("active");
        $("#details-tab").removeClass("filled").removeClass("active");
        $("#payment-tab").removeClass("filled").removeClass("active");

    //    $("#payment-tab").css("pointer-events","none");
    });
    $("#details-tab").click((e) => {
        $("#setup-tab").removeClass("active").addClass("filled");
        $("#schedule-tab").removeClass("active").addClass("filled");
        $("#details-tab").removeClass("filled").addClass("active");
        $("#payment-tab").removeClass("filled").removeClass("active");
    });
    $("#payment-tab").click((e) => {
        $("#setup-tab").removeClass("active").addClass("filled");
        $("#schedule-tab").removeClass("active").addClass("filled");
        $("#details-tab").removeClass("active").addClass("filled");
        $("#payment-tab").removeClass("filled").addClass("active");
    })
    //function form1() {
    //    $("#setup-tab").removeClass("filled").addClass("active");
    //    $("#schedule-tab").removeClass("filled").removeClass("active");
    //    $("#details-tab").removeClass("filled").removeClass("active");
    //    $("#payment-tab").removeClass("filled").removeClass("active");
    //}
    //function form2() {
    //    $("#setup-tab").removeClass("active").addClass("filled");
    //    $("#schedule-tab").removeClass("filled").addClass("active");
    //    $("#details-tab").removeClass("filled").removeClass("active");
    //    $("#payment-tab").removeClass("filled").removeClass("active");
    //}
    //function form3() {
    //    $("#setup-tab").removeClass("active").addClass("filled");
    //    $("#schedule-tab").removeClass("active").addClass("filled");
    //    $("#details-tab").removeClass("filled").addClass("active");
    //    $("#payment-tab").removeClass("filled").removeClass("active");
    //}
    //function form4() {
    //    $("#setup-tab").removeClass("active").addClass("filled");
    //    $("#schedule-tab").removeClass("active").addClass("filled");
    //    $("#details-tab").removeClass("active").addClass("filled");
    //    $("#payment-tab").removeClass("filled").addClass("active");
    //}
});