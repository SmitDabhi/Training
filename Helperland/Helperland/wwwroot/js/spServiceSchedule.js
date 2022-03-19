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

    $('#serScheduleModal').modal({
        backdrop: 'static',
        keyboard: false
    });

    getData();
});

function getData() {
    var events = [];

    $.ajax({
        url: "/Serviceprovider/GetServiceReqCalendar",
        method: "GET",
        dataType: "JSON",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            console.log(data);

            if (data != "notfound") {
                for (var i in data) {
                    events.push({
                        id: data[i].id,
                        title: data[i].title,
                        start: data[i].start,
                        color: data[i].color
                    });
                }
            }

            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                eventClick: function (e) {
                    var eventObj = e.event;
                    var reqId = eventObj.id;
                    console.log(reqId);

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
                                $(".reqDataCName").html('<strong>Customer Name</strong> : ' + data.custName);
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

                                var arr = data.serviceDateTime.split("-");
                                var tempDT = arr[1] + "-" + arr[0] + "-" + arr[2].split(" ")[0] + " " + arr[3];
                                var completeDT = new Date(tempDT);
                                var Today = new Date();

                                if (Today > completeDT) {
                                    $("#completeBtn").show();
                                } else {
                                    $("#completeBtn").hide();
                                }

                                $("#reqIdUS").val(data.serviceId);

                                showMap(data.address.split(",")[1]);

                                $("#serScheduleModal").modal('show');
                            }

                        },
                        error: (err) => {
                            console.log(err);
                        },
                        complete: () => {
                            $(".loading-div").addClass("d-none");
                        }
                    });
                },
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next,title',
                    center: '',
                    right: ''
                },
                events: events
            });
            calendar.render();           
        },
        error: (err) => {
            console.log(err);
        },
        complete: () => {
            $(".loading-div").addClass("d-none");
        }
    });
}


var map = L.map('map');

function showMap(pin) {

    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://trueway-geocoding.p.rapidapi.com/Geocode?address=" + pin,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "2f895194afmsh2cc2623a0a2eacbp184f45jsn0be03c28e2eb"
        },
        success: (response) => {

            map.setView([response.results[0].location.lat, response.results[0].location.lng], 14);

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([response.results[0].location.lat, response.results[0].location.lng]).addTo(map);
        },
        error: (err) => {
            console.log(err);

        }
    });
}