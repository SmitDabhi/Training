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
              "previous": '<img src="img/Left-arrow-button-copy.png" alt="">',
              "next":'<img src="img/Right-arrow-button.png" alt="">'
            },
            'info': "",
        }
    });
});