$(document).ready(function () {

    $("#inputDate").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        startDate: '+1d',
        orientation: "top"
    });

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

    $("#customerSelect").select2();
    $("#spSelect").select2();

    $("#adminUMSuccessModal .successBtn button").click(() => {
        window.location.reload();
    });

    $("#inputStreetName, #inputHouseNo, #inputZipCode, #textComment").keyup(() => {
        if ($("#inputStreetName").val() == "") {
            $("#updateBtn").prop("disabled", true);
        } else if ($("#inputHouseNo").val() == "") {
            $("#updateBtn").prop("disabled", true);
        } else if ($("#inputZipCode").val() == "") {
            $("#updateBtn").prop("disabled", true);
        } else if ($("#textComment").val() == "") {
            $("#updateBtn").prop("disabled", true);
        } else{
            $("#updateBtn").prop("disabled", false);
        }
    });

    $("#inputZipCode").keyup(() => {
        var pin = $("#inputZipCode").val();

        if (pin.length == 6) {
            $("#pinError").addClass("d-none");
            $.ajax({
                url: "/Admin/ValidateZip",
                method: "POST",
                data: { Pin: pin },
                beforeSend: () => {
                    $(".loading-div").removeClass("d-none");
                },
                success: (data) => {
                    if (data == "false") {
                        $("#pinError").removeClass("d-none").text("Postal code not available!");
                    } else {
                        $("#pinError").addClass("d-none");
                        $("#inputCity").val(data);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                    $(".loading-div").addClass("d-none");
                }
            });
        } else {
            $("#pinError").removeClass("d-none").text("Invalid Postal Code");
        }
    });

    $("#updateBtn").click(() => {
        var obj = {
            Id: $("#serviceID").val(),
            Date: $("#inputDate").val(),
            Time: $("#selectBookTime").val(),
            AddLine1: $("#inputStreetName").val(),
            AddLine2: $("#inputHouseNo").val(),
            City: $("#inputCity").val(),
            Pincode: $("#inputZipCode").val(),
            Comment: $("#textComment").val()
        };

        $.ajax({
            url: "/Admin/UpdateService",
            method: "POST",
            data: obj,
            beforeSend: () => {
                $(".loading-div").removeClass("d-none");
            },
            success: (data) => {
                if (data == "true") {
                    $(".successTxt").text("Service Request Updated Successfully!");
                    $("#editAndRescheduleModal").modal("hide");
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
    })

    getSRAdminData();
    
});

function getSRAdminData() {
    $.ajax({
        url: "/Admin/GetSRAdminData",
        method: "GET",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            if (data != "notfound") {
                var dataList = $("#servReqTB tbody");
                dataList.empty();

                var customerList=[], spList=[];

                for (var i in data) {
                    if (data[i].status == "New") {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + ' ' + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">'+ ' ' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="' + data[i].id + '">Edit & Reschedule</a></li><li><a class="dropdown-item" value="' + data[i].id + '">Cancel</a></li></ul></div ></td><td class="d-none">'+ data[i].email +'</td><td class="d-none">'+ data[i].postalCode +'</td></tr>');
                    } else if (data[i].status == "Completed") {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + ' ' + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">'+ ' ' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="SPData"><div><img src="/img/avatar-' + data[i].profIcon + '.png" alt=""></div><div class="SPNameRate"><span class="spName">' + data[i].spName + '</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateNumber">' + data[i].rating + '</span></div></div></div></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="' + data[i].id + '">Refund</a></li></ul></div ></td><td class="d-none">'+ data[i].email +'</td><td class="d-none">'+ data[i].postalCode +'</td></tr>');
                    } else if (data[i].status == "Pending") {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + ' ' + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">'+ ' ' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="SPData"><div><img src="/img/avatar-' + data[i].profIcon + '.png" alt=""></div><div class="SPNameRate"><span class="spName">' + data[i].spName + '</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateNumber">' + data[i].rating + '</span></div></div></div></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="' + data[i].id + '">Edit & Reschedule</a></li><li><a class="dropdown-item" value="' + data[i].id + '">Cancel</a></li></ul></div ></td><td class="d-none">'+ data[i].email +'</td><td class="d-none">'+ data[i].postalCode +'</td></tr>');
                    } else if (data[i].status == "Cancelled" && data[i].spName != null) {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + ' ' + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">'+ ' ' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="SPData"><div><img src="/img/avatar-' + data[i].profIcon + '.png" alt=""></div><div class="SPNameRate"><span class="spName">' + data[i].spName + '</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateNumber">' + data[i].rating + '</span></div></div></div></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="' + data[i].id + '">Refund</a></li></ul></div ></td><td class="d-none">'+ data[i].email +'</td><td class="d-none">'+ data[i].postalCode +'</td></tr>');
                    } else if (data[i].status == "Cancelled" && data[i].spName == null) {
                        dataList.append('<tr><td><div class="reqIdSR">' + data[i].id + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + '-' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + ' ' + '</span><span class="custAdd1SH">' + data[i].addLine1 + ' ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + ' ' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td></td><td>' + data[i].payment + ' &euro;</td><td><span class="' + data[i].status + 'StausSR">' + data[i].status + '</span></td><td><div class="dropdown"><a id="dropdownMenuButton' + data[i].id + '" data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-ellipsis-v fa-lg"></i></a><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + data[i].id + '"><li><a class="dropdown-item" value="' + data[i].id + '">Refund</a></li></ul></div ></td><td class="d-none">'+ data[i].email +'</td><td class="d-none">'+ data[i].postalCode +'</td></tr>');
                    }

                    if (data[i].spName != null) {
                        spList.push(data[i].spName);
                    }
                    customerList.push(data[i].custName);
                }

                var uniqCust = [...new Set(customerList)];
                var uniqSP = [...new Set(spList)];

                for (var i in uniqCust) {
                    $("#customerSelect").append('<option value="' + uniqCust[i] + '">' + uniqCust[i] + '</option>');
                }

                for (var i in uniqSP) {
                    $("#spSelect").append('<option value="' + uniqSP[i] + '">' + uniqSP[i] + '</option>');
                }

            }

            var table = $('#servReqTB').DataTable({
                "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                "searching": true,
                'columnDefs': [{
                    'targets': [6],
                    'orderable': false,
                }],
                "language": {
                    "paginate": {
                        "previous": '<img src="/img/adminLeft.png" alt="">',
                        "next": '<img src="/img/adminRight.png" alt="">'
                    }
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
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
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
                        },
                        complete: () => {
                            $(".loading-div").addClass("d-none");
                        }
                    });


                }

                if (e.target.className == "dropdown-item" && e.target.textContent == "Refund") {
                    var payment = e.target.closest('tr').childNodes[4].textContent;
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);

                    $.ajax({
                        url: "/Admin/CheckRefund",
                        method: "GET",
                        data: { Id: reqId },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            if (data == "false") {
                                $("#refundReqId").val(reqId);
                                $("#paidAmount").text(payment);
                                $("#refundAmount").html("00 &euro;");
                                $("#balanceAmount").text(payment);
                                $("#calcShow").val("");
                                $("#inputAmount").val("").prop('disabled', false);
                                $("#textRefund").val("").prop('disabled', false);

                                if ($("#inputAmount").val() == "" || $("#textRefund").val() == "") {
                                    $("#refundBtn").val("").prop('disabled', true);
                                    $("#calcBtn").prop('disabled', true);
                                }

                                $("#inputAmount").keyup(() => {
                                    if ($("#inputAmount").val() == "") {
                                        $("#calcBtn").prop('disabled', true);
                                    } else {
                                        $("#calcBtn").prop('disabled', false);
                                    }
                                });

                                $("#refundModal").modal("show");
                            } else {
                                $("#paidAmount").text(payment);
                                $("#refundAmount").html(data+" &euro;");
                                $("#balanceAmount").html((payment.slice(0, -2) - data) + " &euro;");
                                $("#inputAmount").val("").prop('disabled', true);
                                $("#textRefund").val("").prop('disabled', true);
                                $("#refundBtn").val("").prop('disabled', true);

                                $("#refundModal").modal("show");
                            }

                            $("#calcBtn").click(() => {
                                var totalPay = parseInt(payment.slice(0, -2));
                                var percent = $("#inputAmount").val();
                                var refPay = totalPay * percent / 100;

                                if (refPay > totalPay) {
                                    $("#refundErr").removeClass("d-none");
                                    $("#refundBtn").prop('disabled', true);

                                } else {
                                    $("#refundErr").addClass("d-none");
                                    $("#calcShow").val(refPay);
                                }

                                $("#refundBtn").click(() => {
                                    var id = $("#refundReqId").val();
                                    console.log(id);

                                    $.ajax({
                                        url: "/Admin/RefundAmount",
                                        method: "POST",
                                        data: { Id: id, Refund: refPay },
                                        beforeSend: () => {
                                            $(".loading-div").removeClass("d-none");
                                        },
                                        success: (data) => {
                                            if (data == "true") {
                                                $(".successTxt").text("Service Request Refunded Successfully!");
                                                $("#refundModal").modal("hide");
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
                                });
                            });

                            $("#textRefund, #inputAmount").keyup(() => {
                                if ($("#textRefund").val() == "" || $("#inputAmount").val() == "" || $("#calcShow").val() == "") {
                                    $("#refundBtn").prop('disabled', true);
                                } else if (!$("#refundErr").hasClass("d-none")) {
                                    $("#refundBtn").prop('disabled', true);
                                } else {
                                    $("#refundBtn").prop('disabled', false);
                                }
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

                if (e.target.className == "dropdown-item" && e.target.textContent == "Edit & Reschedule") {
                    var reqId = e.target.closest('tr').childNodes[0].textContent;

                    $.ajax({
                        url: "/Admin/GetEditModalData",
                        method: "GET",
                        data: { Reqid: reqId },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            if (data != "notfound") {
                                $("#serviceID").val(data.id);
                                var sDT = data.date.split("-");
                                $("#inputDate").datepicker("setDate", new Date(sDT[1] + "-" + sDT[0] + "-" + sDT[2]));
                                $("#selectBookTime").val(data.time);
                                $("#inputStreetName").val(data.addLine1);
                                $("#inputHouseNo").val(data.addLine2);
                                $("#inputZipCode").val(data.pincode);
                                $("#inputCity").val(data.city);

                                if (data.comment != null) {
                                    $("#textComment").val(data.comment);
                                } else {
                                    $("#textComment").val("");
                                }
                                if (e.target.closest('tr').childNodes[5].textContent == "New") {
                                    $("#inputZipCode").prop('disabled', false);
                                } else if (e.target.closest('tr').childNodes[5].textContent == "Pending") {
                                    $("#inputZipCode").prop('disabled', true);
                                }

                                $("#editAndRescheduleModal").modal("show");
                            }

                            if ($("#textComment").val() == "") {
                                $("#updateBtn").prop("disabled", true);
                            } else {
                                $("#updateBtn").prop("disabled", false);
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

                if (e.target.className == "dropdown-item" && e.target.textContent == "Cancel") {
                    var id = parseInt(e.target.closest('tr').childNodes[0].textContent);

                    $.ajax({
                        url: "/Admin/CancelReq",
                        method: "POST",
                        data: { Reqid: id },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            console.log(data);
                            if (data == "true") {
                                $(".successTxt").text("Service Request Cancelled Successfully!");
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
                var serId = $("#searchServiceId").val();
                var Pin = $("#searchPinCode").val();
                console.log(Pin);
                var email = $("#searchEmail").val();
                var cust = $("#customerSelect").val();
                console.log(cust);

                var sp = $("#spSelect").val();
                var status = $("#reqStatusSelect").val();
                var FromDT = $("#searchFromDate").val();
                var ToDT = $("#searchToDate").val();

                if (serId != "") {
                    table.column(0).search(serId);
                } else {
                    table.column(0).search("");
                }

                if (cust != "") {
                    table.column(2).search(cust);
                }else {
                    table.column(2).search("");
                }

                if (Pin != "") {
                    table.column(8).search(Pin);
                } else {
                    table.column(8).search("");
                }

                if (email != "") {
                    table.column(7).search(email);
                } else {
                    table.column(7).search("");
                }

                if (sp != "") {
                    table.column(3).search(sp);
                } else {
                    table.column(3).search("");
                }

                if (status != "") {
                    table.column(5).search(status);
                } else {
                    table.column(5).search("");
                }

                if (FromDT != "" && ToDT != "") {
                    $.fn.dataTable.ext.search.push(
                        function (settings, data, dataIndex) {
                            var min = new Date(FromDT.split("/")[1] + "/" + FromDT.split("/")[0] + "/" + FromDT.split("/")[2]);
                            var max = new Date(ToDT.split("/")[1] + "/" + ToDT.split("/")[0] + "/" + ToDT.split("/")[2]);
                            console.log(min);
                            console.log(max);
                            var date = new Date(data[1].split("-")[1] + "-" + data[1].split("-")[0] + "-" + data[1].split("-")[2].slice(0, -5));
                            console.log(date);
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
                    table.column(1).search("");
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