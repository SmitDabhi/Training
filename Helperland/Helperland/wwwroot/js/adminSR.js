$(document).ready(function () {

    getSRAdminData();
    
});

function getSRAdminData() {
    $.ajax({
        url: "/Admin/GetSRAdminData",
        method: "GET",
        success: (data) => {
            console.log(data);
            if (data != "notfound") {
                var dataList = $("#servReqTB tbody");
                dataList.empty();


                for (var i in data) {
                    if (data[i].status == "New") {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Edit & Reschedule</a></li><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Cancel</a></li></ul></div ></td></tr>');
                    } else if (data[i].status == "Completed") {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="SPData"><div><img src="/img/avatar-' + data[i].profIcon + '.png" alt=""></div><div class="SPNameRate"><span class="spName">' + data[i].spName + '</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateNumber">' + data[i].rating + '</span></div></div></div></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Refund</a></li></ul></div ></td></tr>');
                    } else if (data[i].status == "Pending") {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="SPData"><div><img src="/img/avatar-' + data[i].profIcon + '.png" alt=""></div><div class="SPNameRate"><span class="spName">' + data[i].spName + '</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateNumber">' + data[i].rating + '</span></div></div></div></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Edit & Reschedule</a></li><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Cancel</a></li></ul></div ></td></tr>');
                    } else if (data[i].status == "Cancelled" && data[i].spName != null) {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="SPData"><div><img src="/img/avatar-' + data[i].profIcon + '.png" alt=""></div><div class="SPNameRate"><span class="spName">' + data[i].spName + '</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateNumber">' + data[i].rating + '</span></div></div></div></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Refund</a></li></ul></div ></td></tr>');
                    } else if (data[i].status == "Cancelled" && data[i].spName == null) {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" href="#" value="' + data[i].id + '">Refund</a></li></ul></div ></td></tr>');
                    }
                }
            }

            $('#servReqTB').DataTable({
                "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                "searching": false,
                'columnDefs': [{
                    'targets': [6],
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

            $("#servReqTB").click((e) => {

                if (e.target.className == "reqIdSR" || e.target.className == "custNameSH" || e.target.className == "custAdd1SH" || e.target.className == "custAdd2SH" || e.target.className == "CustomerDataSH" || e.target.className == "CustomerDataIcon" || e.target.className == "spanSPNewReqDT") {
                    var reqId = e.target.closest('tr').childNodes[0].textContent;
                    var spDiv = $(e.target.closest('tr').childNodes[3]).html();

                    $.ajax({
                        url: "/Admin/GetReqData",
                        method: "GET",
                        data: { Reqid: reqId },
                        success: (data) => {
                            console.log(data);
                            if (data != "notfound") {
                                $(".reqDataDate").text(data.serviceDateTime);
                                $(".reqDataDuration").html('<strong>Duration</strong> : ' + data.duration + ' Hours');
                                $(".reqDataId").html('<strong>Service Id</strong> : ' + data.serviceId);
                                $(".reqDataPayment").html(data.netPay + " &euro;");
                                $(".reqDataAddress").html('<strong>Service Address</strong> : ' + data.address);
                                $(".reqDataPhone").html('<strong>Phone</strong> : ' + data.phone);
                                $(".reqDataEmail").html('<strong>Email</strong> : ' + data.email);

                                if (data.comment != null) {
                                    $(".reqCommentText").text(data.comment);
                                }

                                if (data.pets) {
                                    $(".reqDataHasPetTrue").removeClass("d-none");
                                    $(".reqDataHasPetFalse").addClass("d-none");
                                } else {
                                    $(".reqDataHasPetTrue").addClass("d-none");
                                    $(".reqDataHasPetFalse").removeClass("d-none");
                                }

                                $(".reqDataExtra").empty();

                                if (data.cabinet) {
                                    $(".reqDataExtra").append("Inside Cabinet,");
                                }
                                if (data.fridge) {
                                    $(".reqDataExtra").append(" Inside Fridge,");
                                }
                                if (data.oven) {
                                    $(".reqDataExtra").append(" Inside Oven,");
                                }
                                if (data.wash) {
                                    $(".reqDataExtra").append(" Laundry wash & dry,");
                                }
                                if (data.window) {
                                    $(".reqDataExtra").append(" Inside Windows");
                                }
                                if (spDiv != "") {
                                    $("#serReqSpDataSH").html(spDiv).removeClass('d-none');

                                } else {
                                    $("#serReqSpDataSH").addClass("d-none");
                                }

                                $("#reqDetailsModal").modal('show');
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
$("#servReqTB").on('click', 'th', function () {
    $("#servReqTB thead th").each(function (i, th) {
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

$("#servReqTB th").first().click().click();