$(document).ready( function () {
    $('#shTable').DataTable({
        "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
        "pagingType": "full_numbers",
        "searching":false,
        'columnDefs': [ {
            'targets': [4], 
            'orderable': false, 
         }],
        "language": {
            "paginate": {
                "first": '<img src="/img/leftMost.png" alt="">',
                "last": '<img src="/img/RightMost.png" alt="">',
              "previous": '<img src="/img/Left-arrow-button-copy.png" alt="">',
              "next":'<img src="/img/Right-arrow-button.png" alt="">'
            },
            'info': "Total Record: _MAX_",
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
   
} );