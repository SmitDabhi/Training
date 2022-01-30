$(document).ready( function () {
    $('#userManageTB').DataTable({
        "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
        "searching":false,
        'columnDefs': [ {
            'targets': [7], 
            'orderable': false, 
         }],
        "language": {
            "paginate": {
              "previous": '<img src="img/adminLeft.png" alt="">',
              "next":'<img src="img/adminRight.png" alt="">'
            },
            'info': "",
        }
    });
    $(".threeDotMenu").click(function (e) { 
        $(this).closest(".actionBTN").children(".threeDotToggleMenu").toggle();
    });
});