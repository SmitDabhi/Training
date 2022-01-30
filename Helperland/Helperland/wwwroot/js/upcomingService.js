$(document).ready( function () {
    $('#usTable').DataTable({
        "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
        "pagingType": "full_numbers",
        "searching":false,
        'columnDefs': [ {
            'targets': [4], 
            'orderable': false, 
         }],
        "language": {
            "paginate": {
                "first": '<img src="img/leftMost.png" alt="">',
                "last": '<img src="img/RightMost.png" alt="">',
              "previous": '<img src="img/Left-arrow-button-copy.png" alt="">',
              "next":'<img src="img/Right-arrow-button.png" alt="">'
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
   
} );