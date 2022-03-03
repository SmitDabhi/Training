$(document).ready(function () {

    var today = new Date();

    $("#bookDate").calendar({
        type: 'date',
        monthFirst: false,
        minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
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

    

    if ($("#cancelComment").val() == "") {
        $("#btnModalCancelReq").prop("disabled", true);
    }

    $("#cancelComment").on('keyup', () => {
        if ($("#cancelComment").val() == "") {
            $("#btnModalCancelReq").prop("disabled", true);
        } else {
            $("#btnModalCancelReq").prop("disabled", false);
        }
    });

    $("#btnModalCancelReq").click(() => {
        var obj = {
            ServiceRequestId: parseInt($("#getReqId").val()),
            Comments : $("#cancelComment").val()
        };

        $.ajax({
            url: "/Customer/CancelReq",
            method: "POST",
            data: obj,
            success: (data) => {
                console.log(data);
                if (data.msg == "true") {
                    $(".reCancelSuccessTxt").text("Your service request canceled successfully!");
                    $(".reCancelSuccessSmTxt").text("Cancelled Request Id : " + data.id);
                    $("#reScheCancelSuccessModal").modal("show");
                    $("#cancelReqModal").modal("hide");
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    $("#btnModalUpdateDT").click(() => {
        var obj = {
            ServiceId: parseInt($("#getReqIdReschedule").val()),
            ServiceDate : $("#bookDt").val() +" "+ $("#selectBookTime").val()
        }
        console.log(obj);

        $.ajax({
            url: "/Customer/RescheduleDT",
            method: "POST",
            data: obj,
            success: (data) => {
                if (data == "true") {
                    $(".reCancelSuccessTxt").text("Your service request reschedule successfully!");
                    $("#reScheCancelSuccessModal").modal("show");
                    $("#rescheduleModal").modal("hide");
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
    $('#reScheCancelSuccessModal').modal({
        backdrop: 'static',
        keyboard: false
    });

    $(".reCancelSuccessModalBtn a, #reScheCancelSuccessModal .modal-header a").click(() => {
        window.location.reload();
    });

    getServReqData();
});

function getServReqData() {

    $.ajax({
        url: "/Customer/GetDashData",
        method: "GET",
        success: (data) => {
            if (data != "notfound") {
                var reqDataList = $("#serReqTable tbody");
                reqDataList.empty();

                for (var i = 0; i < data.length; i++) {
                    if (data[i].spName == null && data[i].status == null) {
                        reqDataList.append('<tr><td class= "sr-tb-id"><div class="serviceReqIdDash">' + data[i].serviceId + '</div></td><td class="sr-tb-date"><div class="serReqDateTimeDash"><span class="spanreqDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanreqDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start"><button class="btn srReschedule">Reschedule</button><button class="btn srCancel">Cancel</button></div></td></tr >');
                    } else if (data[i].spName != null && data[i].status == null){
                        reqDataList.append('<tr><td class= "sr-tb-id"><div class="serviceReqIdDash">' + data[i].serviceId + '</div></td><td class="sr-tb-date"><div class="serReqDateTimeDash"><span class="spanreqDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanreqDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"><div class="sh-tb-provider"><span class="spAvatar"><img src="/img/avatar-' + data[i].spAvtar +'.png" /></span><span class="sp-Name-rate"><span>' + data[i].spName + '</span><span><div class="Stars" style="--rating: ' + data[i].spRatings + ';"><span id="rateNumber">' + data[i].spRatings +'</span></span></span></div></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start"><button class="btn srReschedule">Reschedule</button><button class="btn srCancel">Cancel</button></div></td></tr >');
                    }
                }

                var table = $("#serReqTable").DataTable({
                    "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                    "pagingType": "full_numbers",
                    "searching": false,
                    'columnDefs': [{
                        'targets': [4],
                        'orderable': false,
                    }],
                    "language": {
                        "paginate": {
                            "first": '<img src="/img/leftMost.png" alt="">',
                            "last": '<img src="/img/RightMost.png" alt="">',
                            "previous": '<img src="/img/Left-arrow-button-copy.png" alt="">',
                            "next": '<img src="/img/Right-arrow-button.png" alt="">'
                        },
                        'info': "Total Record: _MAX_",
                    }
                });

                $("#radioSelectUl input[type=radio]").change(() => {
                    var checked = $("#radioSelectUl input[type=radio]:checked").val();

                    if (checked == "SID:Asc") {
                        sort(0, "asc");
                    } else if (checked == "SID:Desc") {
                        sort(0, "desc");

                    } else if (checked == "SP:AtoZ") {
                        sort(2, "asc");
                    } else if (checked == "SP:ZtoA") {
                        sort(2, "desc");
                    } else if (checked == "Pay:L2H") {
                        sort(3, "asc");
                    } else if (checked == "Pay:H2L") {
                        sort(3, "desc");
                    }

                    function sort(col, order) {
                        console.log(col + " " + order)
                        table.order([col, order]).draw();
                    }
                });
            } else {
                var reqDataList = $("#serReqTable tbody");
                reqDataList.empty();
                $("#serReqTable").DataTable({
                    "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                    "pagingType": "full_numbers",
                    "searching": false,
                    'columnDefs': [{
                        'targets': [4],
                        'orderable': false,
                    }],
                    "language": {
                        "paginate": {
                            "first": '<img src="/img/leftMost.png" alt="">',
                            "last": '<img src="/img/RightMost.png" alt="">',
                            "previous": '<img src="/img/Left-arrow-button-copy.png" alt="">',
                            "next": '<img src="/img/Right-arrow-button.png" alt="">'
                        },
                        'info': "Total Record: _MAX_",
                    }
                });
            }

            $("#serReqTable").click((e) => {
                if (e.target.className == "btn srCancel") {
                    while (e.target && e.target.nodeName !== "TR") {
                        e.target = e.target.parentNode;
                    }
                    var reqId = $(e.target.childNodes[0]).text();
                    console.log(reqId);

                    $("#getReqId").val(reqId);
                    $("#cancelComment").val("");
                    $("#btnModalCancelReq").prop("disabled", true);
                    $("#cancelReqModal").modal('show');
                }

                if (e.target.className == "btn srReschedule") {
                    while (e.target && e.target.nodeName !== "TR") {
                        e.target = e.target.parentNode;
                    }
                    var reqId = $(e.target.childNodes[0]).text();
                    var dateTime = $(e.target.childNodes[1]).text();
                    
                    var date = dateTime.split(":")[0].slice(0, -2);
                    var time = dateTime.split("-")[2].slice(4,-1);

                    console.log(date);
                    console.log(time);

                    $("#getReqIdReschedule").val(reqId);
                    $("#bookDt").val(date);
                    $("#selectBookTime").val(time)
                    $("#rescheduleModal").modal('show');
                }

                if (e.target.className == "serReqDateTimeDash" || e.target.className == "spanreqDTDash" || e.target.className == "serviceReqIdDash") {
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);
                    var spDiv = $(e.target.closest('tr').childNodes[2]).html();

                    $.ajax({
                        url: "/Customer/GetReqData",
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

                            $("#reqDetailsModal .srReschedule").click(() => {
                                var reqId = data.serviceId;
                                var date = data.serviceDateTime.split(" ")[0];
                                var time = data.serviceDateTime.split(" ")[1].split("-")[0];
                                $("#getReqIdReschedule").val(reqId);
                                $("#bookDt").val(date);
                                $("#selectBookTime").val(time)
                                $("#rescheduleModal").modal('show');
                                $("#reqDetailsModal").modal('hide');
                            });

                            $("#reqDetailsModal .srCancel").click(() => {
                                var reqId = data.serviceId;
                                $("#getReqId").val(reqId);
                                $("#cancelComment").val("");
                                $("#btnModalCancelReq").prop("disabled", true);
                                $("#cancelReqModal").modal('show');
                                $("#reqDetailsModal").modal('hide');
                            });
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