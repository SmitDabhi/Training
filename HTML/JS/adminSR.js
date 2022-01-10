$(document).ready(function () {
    $('#servReqTB').DataTable({
        "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
        "searching":false,
        'columnDefs': [ {
            'targets': [5], 
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
});