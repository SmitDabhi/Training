$(document).ready( function () {

    getUMAdminData();
});

function getUMAdminData() {
    $.ajax({
        url: "/Admin/GetUMAdminData",
        method: "GET",
        success: (data) => {
            console.log(data);
            if (data != "notfound") {
                var dataList = $("#userManageTB tbody");
                dataList.empty();

                for (var i in data) {
                    dataList.append('<tr><td>' + data[i].name + '</td><td></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td>' + data[i].status + '</td><td></td></tr>');
                }
            }

            $('#userManageTB').DataTable({
                "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                "searching": false,
                'columnDefs': [{
                    'targets': [7],
                    'orderable': false,
                }],
                "language": {
                    "paginate": {
                        "previous": '<img src="/img/adminLeft.png" alt="">',
                        "next": '<img src="/img/adminRight.png" alt="">'
                    },
                    'info': "",
                }
            });
        },
        error: (err) => {
            console.log(err);
        }
    });
}

var spanSorting = '<span class="arrow-hack sort">&nbsp;&nbsp;&nbsp;</span>',
    spanAsc = '<span class="arrow-hack asc">&nbsp;&nbsp;&nbsp;</span>',
    spanDesc = '<span class="arrow-hack desc">&nbsp;&nbsp;&nbsp;</span>';
$("#userManageTB").on('click', 'th', function () {
    $("#userManageTB thead th").each(function (i, th) {
        $(th).find('.arrow-hack').remove();
        var html = $(th).html();
        if ($(th).hasClass("sorting_asc")) {
            $(th).html(html + spanAsc);
        } else if ($(th).hasClass("sorting_desc")) {
            $(th).html(html + spanDesc);
        } else {
            $(th).html(html + spanSorting);
        }
    });
});

$("#userManageTB th").first().click().click();