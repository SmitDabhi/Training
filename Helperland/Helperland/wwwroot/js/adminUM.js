$(document).ready( function () {

    $("#searchFromDate").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top"
    });

    $("#searchToDate").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top"
    });

    $("#spSelect").select2();
    $("#userSelect").select2();

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
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            if (data != "notfound") {
                var dataList = $("#userManageTB tbody");
                dataList.empty();

                for (var i in data) {
                    if (data[i].uType == "Customer" && data[i].status == "Active") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="'+ data[i].id +'">Deactivate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Customer" && data[i].status == "Inactive") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="'+ data[i].id +'">Activate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Service Provider" && data[i].status == "Active") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="'+ data[i].id +'">Deactivate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Service Provider" && data[i].status == "Inactive") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="'+ data[i].id +'">Activate</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Service Provider" && data[i].status == "Not Approved") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">'+ data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="'+ data[i].id +'">Approve</a></li></ul></div ></td></tr>');
                    } else if (data[i].uType == "Admin") {
                        dataList.append('<tr><td>' + data[i].name + '</td><td><div class="d-none">' + data[i].email +'</div></td><td>' + data[i].date + '</td><td>' + data[i].uType + '</td><td>' + data[i].phone + '</td><td>' + data[i].postalCode + '</td><td><span class="' + data[i].status + 'Status">' + data[i].status + '</span></td><td></td></tr>');
                    }

                    $("#userSelect").append('<option value="' + data[i].name +'">' + data[i].name +'</option>');
                }
            }

            var table = $('#userManageTB').DataTable({
                "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                "searching": true,
                'columnDefs': [{
                    'targets': [7],
                    'orderable': false,
                }],
                "language": {
                    "paginate": {
                        "previous": '<img src="/img/adminLeft.png" alt="">',
                        "next": '<img src="/img/adminRight.png" alt="">'
                    }
                }
            });

            $("#userManageTB").click((e) => {
                if (e.target.className == "dropdown-item" && e.target.textContent == "Deactivate") {
                    var id = parseInt(e.target.getAttribute("value"));

                    $.ajax({
                        url: "/Admin/DeactivateUser",
                        method: "POST",
                        data: { Id: id },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            if (data == "true") {
                                $(".successTxt").text("User Deactivated Successfully!");
                                $("#adminUMSuccessModal").modal("show");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        },
                        complete: () => {
                            $(".loading-div").addClass("d-none");
                        }
                    });
                }

                if (e.target.className == "dropdown-item" && e.target.textContent == "Activate") {
                    var id = parseInt(e.target.getAttribute("value"));

                    $.ajax({
                        url: "/Admin/ActivateUser",
                        method: "POST",
                        data: { Id: id },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            if (data == "true") {
                                $(".successTxt").text("User Activated Successfully!");
                                $("#adminUMSuccessModal").modal("show");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        },
                        complete: () => {
                            $(".loading-div").addClass("d-none");
                        }
                    });
                }

                if (e.target.className == "dropdown-item" && e.target.textContent == "Approve") {
                    var id = parseInt(e.target.getAttribute("value"));

                    $.ajax({
                        url: "/Admin/ApproveUser",
                        method: "POST",
                        data: { Id: id },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            if (data == "true") {
                                $(".successTxt").text("User Approved Successfully!");
                                $("#adminUMSuccessModal").modal("show");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        },
                        complete: () => {
                            $(".loading-div").addClass("d-none");
                        }
                    });
                }

            });

            $("#searchBtn").click(() => {
                var uName = $("#userSelect").val();
                var UType = $("#userTypeSelect").val();
                var Phone = $("#searchPhone").val();
                var Pin = $("#searchPinCode").val();
                var email = $("#searchEmail").val();
                var FromDT = $("#searchFromDate").val();
                var ToDT = $("#searchToDate").val();

                if (uName != "") {
                    table.column(0).search(uName);
                } else {
                    table.column(0).search("");
                }

                if (UType != "") {
                    table.column(3).search(UType);
                } else {
                    table.column(3).search("");
                }

                if (Phone != "") {
                    table.column(4).search(Phone);
                } else {
                    table.column(4).search("");
                }

                if (Pin != "") {
                    table.column(5).search(Pin);
                } else {
                    table.column(5).search("");
                }

                if (email != "") {
                    table.column(1).search(email);
                } else {
                    table.column(1).search("");
                }

                if (FromDT != "" && ToDT != "") {
                    $.fn.dataTable.ext.search.push(
                        function (settings, data, dataIndex) {
                            var min = new Date(FromDT.split("/")[1] + "/" + FromDT.split("/")[0] + "/" + FromDT.split("/")[2]);
                            var max = new Date(ToDT.split("/")[1] + "/" + ToDT.split("/")[0] + "/" + ToDT.split("/")[2]);
                        
                            var date = new Date(data[2].split("-")[1] + "-" + data[2].split("-")[0] + "-" + data[2].split("-")[2]);
                            if (
                                (min === null && max === null) ||
                                (min === null && date <= max) ||
                                (min <= date && max === null) ||
                                (min <= date && date <= max)
                            ) {
                                return true;
                            }
                            return false;
                        }
                    );
                } else {
                    table.column(2).search("");
                }


                table.draw();
            });

            $("#clearBtn").click(() => {
                window.location.reload();
            });

        },
        error: (err) => {
            console.log(err);
        },
        complete: () => {
            $(".loading-div").addClass("d-none");
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