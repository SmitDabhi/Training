﻿$(document).ready(() => {
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

        var data = document.getElementById("spServiceHistoryTB");
        console.log(data);

        var file = XLSX.utils.table_to_book(data, { sheet: "sheet1" });

        XLSX.write(file, { bookType: "xlsx", bookSST: true, type: "base64" });

        XLSX.writeFile(file, "SP_ServiceHistory." + "xlsx");

    });

    getSerHistoryData();
});

function getSerHistoryData() {
    $.ajax({
        url: "/Serviceprovider/GetSerHistoryData",
        method: "GET",
        success: (data) => {
            console.log(data);
            if (data != "notfound") {
                var AddList = $("#spServiceHistoryTB tbody");
                AddList.empty();

                for (var i = 0; i < data.length; i++) {
                    AddList.append('<tr><td class="sp-SH-Id"><div class="serviceReqIdDash">' + data[i].serviceId + '</div></td><td class="sp-SH-DT"><div class="serReqDateTimeDash"><span class="spanreqDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanreqDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sp-SH-CustData"><div class="CustomerDataSH"><div><img  class="CustomerDataIcon" src="/img/layer-15.png" /></div><div class="CustomerDataAdd"><span class="custNameSH">' + data[i].custName + '</span><span class="custAdd1SH">' + data[i].addLine1 + '  ' + data[i].addLine2 + '</span><span class="custAdd2SH">' + data[i].postalCode + ' ' + data[i].city + '</span></div></div></td></tr>');
                }
            }

            var table = $('#spServiceHistoryTB').DataTable({
                "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                "pagingType": "full_numbers",
                "searching": false,
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
                }

                function sort(col, order) {
                    console.log(col + " " + order)
                    table.order([col, order]).draw();
                }
            });

            $("#spServiceHistoryTB tbody tr").click((e) => {
                if (e.target.className == "serviceReqIdDash" || e.target.className == "spanreqDTDash" || e.target.className == "custNameSH" || e.target.className == "custAdd1SH" || e.target.className == "custAdd2SH" || e.target.className == "CustomerDataSH" || e.target.className == "CustomerDataIcon") {
                    var reqId = parseInt(e.target.closest('tr').childNodes[0].textContent);

                    $.ajax({
                        url: "/Serviceprovider/GetServiceReqSummary",
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
            });
        },
        error: (err) => {
            console.log(err);
        }
    });
}