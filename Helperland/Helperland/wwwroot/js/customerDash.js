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
        console.log(obj);

        $.ajax({
            url: "/Customer/CancelReq",
            method: "POST",
            data: obj,
            success: (data) => {
                console.log(data);
                if (data == "true") {
                    window.location.reload();
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
                console.log(data);
                if (data == "true") {
                    window.location.reload();
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
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
                        reqDataList.append('<tr><td class= "sr-tb-id">' + data[i].serviceId + '</td><td class="sr-tb-date"><div class="d-flex flex-column justify-content-center align-items-start"><span class="d-flex justify-content-center align-items-start"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="d-flex justify-content-center align-items-start"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start"><button class="btn srReschedule">Reschedule</button><button class="btn srCancel">Cancel</button></div></td></tr >');
                    } else if (data[i].spName != null && data[i].status == null){
                        reqDataList.append('<tr><td class= "sr-tb-id">' + data[i].serviceId + '</td><td class="sr-tb-date"><div class="d-flex flex-column justify-content-center align-items-start"><span class="d-flex justify-content-center align-items-start"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="d-flex justify-content-center align-items-start"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div></td><td class="sr-tb-SP"><div class="sh-tb-provider"><span> Icon</span><span class="sp-Name-rate"><span>Name</span><span>Rating</span></span></div></td><td class="sr-tb-payment"><span>' + data[i].totalCost + ' &euro;</span></td><td class="sr-tb-action"><div class="d-flex justify-content-center align-items-start"><button class="btn srReschedule">Reschedule</button><button class="btn srCancel">Cancel</button></div></td></tr >');
                    }
                }

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

            $("#serReqTable tbody tr").click((e) => {
             
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
            });
            
        },
        error: (err) => {
            console.log(err);
        }
    });
}