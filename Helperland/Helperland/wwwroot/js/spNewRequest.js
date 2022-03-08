$(document).ready(() => {
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

    $('#newReqSuccessModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $(".successBtn button").click(() => {
        window.location.reload();
    });

    getNewReqData();
});

function getNewReqData() {
    $.ajax({
        url: "/Serviceprovider/GetNewRequestData",
        method: "GET",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            console.log(data);
            if (data != "notfound") {
                var DataList = $("#spNewRequestTB tbody");
                DataList.empty();

                for (var i = 0; i < data.length; i++) {
                    if (data[i].hasPet) {
                        DataList.append('<tr><td><div class="newReqServID">' + data[i].serviceId + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + '  ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="newReqPayment">' + data[i].payment + ' &euro;</div></td><td></td><td><div class="acceptBtnDiv"><button class="acceptBtn btn">Accept</button></div></td></tr>');
                    } else {
                        DataList.append('<tr><td><div class="newReqServID">' + data[i].serviceId + '</div></td><td><div class="spRateSerDateTimeDiv"><span class="spanSPNewReqDT"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPNewReqDT"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + '  ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td><td><div class="newReqPayment">' + data[i].payment + ' &euro;</div></td><td></td><td><div class="acceptBtnDiv"><button class="acceptBtn btn">Accept</button></div><div class="d-none">WithoutPet</div></td></tr>');
                    }
                }
            }
            var table = $('#spNewRequestTB').DataTable({
                "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                "pagingType": "full_numbers",
                "searching": true,
                retrieve: true,
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

            $("#radioSelectUl input[type=radio]").change(() => {
                var checked = $("#radioSelectUl input[type=radio]:checked").val();

                if (checked == "SID:Asc") {
                    sort(0, "asc");
                } else if (checked == "SID:Desc") {
                    sort(0, "desc");
                } else if (checked == "CUST:Asc") {
                    sort(2, "asc");
                } else if (checked == "CUST:Desc") {
                    sort(2, "desc");
                } else if (checked == "PAY:Asc") {
                    sort(3, "asc");
                } else if (checked == "PAY:Desc") {
                    sort(3, "desc");
                }

                function sort(col, order) {
                    console.log(col + " " + order)
                    table.order([col, order]).draw();
                }
            });

            $("#inputPetCheckBox").change(() => {
                var petCheck = $("#inputPetCheckBox").is(':checked');
                if (!petCheck) {
                    console.log("in")
                    table.search("withoutpet").draw();
                } else {
                    console.log("out")
                    table.search("").draw();
                }

            })

            $("#spNewRequestTB").click((e) => {
                if (e.target.className == "newReqServID" || e.target.className == "spanSPNewReqDT" || e.target.className == "custNameSH" || e.target.className == "custAdd1SH" || e.target.className == "custAdd2SH" || e.target.className == "CustomerDataSH" || e.target.className == "CustomerDataIcon") {
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);

                    $.ajax({
                        url: "/Serviceprovider/GetServiceReqSummary",
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
                                $("#acceptBtn").val(data.serviceId);
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
                        },
                        complete: () => {
                            $(".loading-div").addClass("d-none");
                        }
                    });
                }

                if (e.target.className == "acceptBtn btn") {
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);

                    console.log(reqId);

                    $.ajax({
                        url: "/Serviceprovider/AcceptNewReq",
                        method: "POST",
                        data: { ReqId: reqId },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            console.log(data);
                            if (data != "accepted") {
                                $(".newReqImg").show();
                                $(".successTxt").show().text("Service Request Accepted Successfully!");
                                $(".successSmall").css("color", "#646464").text("Accepted Service Request Id: " + data.id);
                                $("#newReqSuccessModal").modal("show");
                            } else {
                                $(".newReqImg").hide();
                                $(".successTxt").hide();
                                $(".successSmall").css("color","#ff4242").text("This service request is no more available. It has been assigned to another provider.");
                                $("#newReqSuccessModal").modal("show");
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
        },
        error: (err) => {
            console.log(err);
        },
        complete: () => {
            $(".loading-div").addClass("d-none");
        }
    });
    
}

$("#acceptBtn").click(() => {
    var id = $("#acceptBtn").val();

    $.ajax({
        url: "/Serviceprovider/AcceptNewReq",
        method: "POST",
        data: { ReqId: id },
        success: (data) => {
            console.log(data);
            if (data != "accepted") {
                $("#reqDetailsModal").modal('hide');
                $(".newReqImg").show();
                $(".successTxt").show().text("Service Request Accepted Successfully!");
                $(".successSmall").css("color", "#646464").text("Accepted Service Request Id: " + data.id);
                $("#newReqSuccessModal").modal("show");
            } else {
                $("#reqDetailsModal").modal('hide');
                $(".newReqImg").hide();
                $(".successTxt").hide();
                $(".successSmall").css("color", "#ff4242").text("This service request is no more available. It has been assigned to another provider.");
                $("#newReqSuccessModal").modal("show");
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
})

var spanSorting = '<span class="arrow-hack sort">&nbsp;&nbsp;&nbsp;</span>',
    spanAsc = '<span class="arrow-hack asc">&nbsp;&nbsp;&nbsp;</span>',
    spanDesc = '<span class="arrow-hack desc">&nbsp;&nbsp;&nbsp;</span>';
$("#spNewRequestTB").on('click', 'th', function () {
    $("#spNewRequestTB thead th").each(function (i, th) {
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

$("#spNewRequestTB th").first().click().click();