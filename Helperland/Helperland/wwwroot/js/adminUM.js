$(document).ready( function () {

    $("#adminUMSuccessModal .successBtn button").click(() => {
        window.location.reload();
    });

    $(".exportBtnDiv button").click(() => {

        var data = document.getElementById("userManageTB");

        var file = XLSX.utils.table_to_book(data, { sheet: "sheet1" });

        XLSX.write(file, { bookType: "xlsx", bookSST: true, type: "base64" });

        XLSX.writeFile(file, "Admin_Userlist.xlsx");
    });

    getUMAdminData();
});

function getUMAdminData() {
    $.ajax({
        url: "/Admin/GetUMAdminData",
        method: "GET",
        success: (data) => {
            if (data != "notfound") {
                var dataList = $("#userManageTB tbody");
                dataList.empty();

                for (var i in data) {
                    if (data[i].uType == "Customer" && data[i].status == "Active") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="'+ data[i].id +'">Deactivate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Customer" && data[i].status == "Inactive") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="'+ data[i].id +'">Activate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Service Provider" && data[i].status == "Active") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="'+ data[i].id +'">Deactivate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Service Provider" && data[i].status == "Inactive") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="'+ data[i].id +'">Activate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Service Provider" && data[i].status == "Not Approved") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="'+ data[i].id +'">Approve</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Admin") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">' + data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td></td></tr>');
                    }
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

            $("#userManageTB").click((e) => {
                if (e.target.className == "dropdown-item" && e.target.textContent == "Deactivate") {
                    var id = parseInt(e.target.getAttribute("value"));

                    $.ajax({
                        url: "/Admin/DeactivateUser",
                        method: "POST",
                        data: { Id: id },
                        success: (data) => {
                            if (data == "true") {
                                $(".successTxt").text("User Deactivated Successfully!");
                                $("#adminUMSuccessModal").modal("show");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
                }

                if (e.target.className == "dropdown-item" && e.target.textContent == "Activate") {
                    var id = parseInt(e.target.getAttribute("value"));

                    $.ajax({
                        url: "/Admin/ActivateUser",
                        method: "POST",
                        data: { Id: id },
                        success: (data) => {
                            if (data == "true") {
                                $(".successTxt").text("User Activated Successfully!");
                                $("#adminUMSuccessModal").modal("show");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
                }

                if (e.target.className == "dropdown-item" && e.target.textContent == "Approve") {
                    var id = parseInt(e.target.getAttribute("value"));

                    $.ajax({
                        url: "/Admin/ApproveUser",
                        method: "POST",
                        data: { Id: id },
                        success: (data) => {
                            if (data == "true") {
                                $(".successTxt").text("User Approved Successfully!");
                                $("#adminUMSuccessModal").modal("show");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
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