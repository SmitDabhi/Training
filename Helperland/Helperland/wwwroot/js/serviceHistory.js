$(document).ready( function () {
    
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

    $(".content-header button").click(() => {
       
        var data = document.getElementById("shTable");
        console.log(data);

        var file = XLSX.utils.table_to_book(data, { sheet: "sheet1" });

        XLSX.write(file, { bookType: "xlsx", bookSST: true, type: "base64" });

        XLSX.writeFile(file, "ServiceHistory." + "xlsx");

    });

    $(".rate-submitBtn button").click(() => {
        var obj = {
            ServiceRequestId: parseInt($("#reqIdRateModal").val()),
            RatingTo: parseInt($("#spIdRateModal").val()),
            OnTimeArrival: parseInt($("#time input[type=radio]:checked").val()),
            Friendly: parseInt($("#frnd input[type=radio]:checked").val()),
            QualityOfService: parseInt($("#qos input[type=radio]:checked").val())
        }

        if ($("#spFeedBack").val() != "" && $("#spFeedBack").val() != null) {
            obj.Comments = $("#spFeedBack").val();
        }

        if (obj.OnTimeArrival == undefined) {
            obj.OnTimeArrival= 0;
        }
        if (obj.Friendly == undefined) {
            obj.Friendly= 0;
        }
        if (obj.QualityOfService == undefined) {
            obj.QualityOfService= 0;
        }

        console.log(obj);

        $.ajax({
            url: "/Customer/RateSP",
            method: "POST",
            data: obj,
            success: (data) => {
                window.location.reload();
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    getSerHistoryData();
});

function getSerHistoryData() {
    $.ajax({
        url: "/Customer/GetSerHistoryData",
        method: "GET",
        success: (data) => {

            if (data != "notfound") {

                var reqDataList = $("#shTable tbody");
                reqDataList.empty();

                for (var i = 0; i < data.length; i++) {
                    if (data[i].spName == null && data[i].status == 0) {
                        reqDataList.append('<tr><td class= "sr-tb-id"><div class="serviceReqIdDash">' + data[i].serviceId + '</div></td><td class="sr-tb-date"><div class="serReqDateTimeDash"><span class="spanreqDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanreqDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sh-tb-status-cancelled"><span>Cancelled</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start sh-tb-rate"><button class="btn" disabled>Rate SP</button></div></td></tr>')
                    } else if (data[i].spName != null && data[i].status == 0) {
                        reqDataList.append('<tr><td class= "sr-tb-id"><div class="serviceReqIdDash">' + data[i].serviceId + '</div></td><td class="sr-tb-date"><div class="serReqDateTimeDash"><span class="spanreqDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanreqDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"><div class="sh-tb-provider"><span class="spAvatar"></span><span class="sp-Name-rate"><span>' + data[i].spName + '</span><span><div class="Stars" style="--rating: ' + data[i].spRatings + ';"><span id="rateNumber">' + data[i].spRatings +'</span></span></span></div></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sh-tb-status-cancelled"><span>Cancelled</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start sh-tb-rate"><button class="btn" value="' + data[i].spID +'" disabled>Rate SP</button></div></td></tr>')
                    } else if (data[i].spName != null && data[i].status == 1) {
                        reqDataList.append('<tr><td class= "sr-tb-id"><div class="serviceReqIdDash">' + data[i].serviceId + '</div></td><td class="sr-tb-date"><div class="serReqDateTimeDash"><span class="spanreqDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanreqDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"><div class="sh-tb-provider"><span class="spAvatar"></span><span class="sp-Name-rate"><span>' + data[i].spName + '</span><span><div class="Stars" style="--rating: ' + data[i].spRatings + ';"><span id="rateNumber">' + data[i].spRatings +'</span></span></span></div></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sh-tb-status-completed"><span>Completed</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start sh-tb-rate"><button class="btn rateBtnSH" value="' + data[i].spID +'">Rate SP</button></div></td></tr>')
                    }

                    if (data[i].spAvtar == "male") {
                        $(".spAvatar").html('<img src="/img/avatar-male.png" />');
                    } else if (data[i].spAvtar == "female") {
                        $(".spAvatar").html('<img src="/img/avatar-female.png" />');
                    } else if (data[i].spAvtar == "car") {
                        $(".spAvatar").html('<img src="/img/avatar-car.png" />');
                    } else if (data[i].spAvtar == "hat") {
                        $(".spAvatar").html('<img src="/img/avatar-hat.png" />');
                    } else if (data[i].spAvtar == "ship") {
                        $(".spAvatar").html('<img src="/img/avatar-ship.png" />');
                    } else if (data[i].spAvtar == "iron") {
                        $(".spAvatar").html('<img src="/img/avatar-iron.png" />');
                    }
                }

                $('#shTable').DataTable({
                    "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                    "pagingType": "full_numbers",
                    "searching": false,
                    'columnDefs': [{
                        'targets': [5],
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
                
                
            } else {
                var reqDataList = $("#shTable tbody");
                reqDataList.empty();
                $('#shTable').DataTable({
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

            $("#shTable").click((e) => {
                if (e.target.className == "serviceReqIdDash" || e.target.className == "spanreqDTDash" || e.target.className == "serReqDateTimeDash") {
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);

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

                                $("#reqDetailsModal").modal('show');
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });

                }

                if (e.target.className == "btn rateBtnSH") {
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);
                    var spDiv = $(e.target.closest('tr').childNodes[2]).html();
                    var spId = $(e.target).val();
                    
                    $.ajax({
                        url: "/Customer/GetRateModalData",
                        method: "GET",
                        data: { reqId : reqId },
                        success: (data) => {
                            if (data == "NoRating") {
                                $(".rate-submitBtn").removeClass("d-none");
                                $("#reqIdRateModal").val(reqId);
                                $("#spIdRateModal").val(spId);
                                $('#reqRatingsModal input[type=radio]').prop('checked', false);
                                $("#spFeedBack").val("");
                                $("#showSPData").html(spDiv);
                                $("#spFeedBack").prop('disabled', false);
                                $("#time input[type=radio]").prop('disabled', false);
                                $("#frnd input[type=radio]").prop('disabled', false);
                                $("#qos input[type=radio]").prop('disabled', false);
                                $("#reqRatingsModal").modal('show');
                            } else {
                                $(".rate-submitBtn").addClass("d-none");
                                $("#time input[type=radio][value=" + data.ontime + "]").prop('checked', true);
                                $("#time input[type=radio]").prop('disabled', true);
                                $("#frnd input[type=radio][value=" + data.friendly + "]").prop('checked', true);
                                $("#frnd input[type=radio]").prop('disabled', true);
                                $("#qos input[type=radio][value=" + data.qos + "]").prop('checked', true);
                                $("#qos input[type=radio]").prop('disabled', true);
                                $("#spFeedBack").val(data.comment);
                                $("#spFeedBack").prop('disabled', true);
                                $("#showSPData").html(spDiv);
                                $("#reqRatingsModal").modal('show');
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