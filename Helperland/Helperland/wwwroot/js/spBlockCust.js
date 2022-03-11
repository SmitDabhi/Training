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
    $('#upSerSuccessModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $("#upSerSuccessModal .successBtn button").click(() => {
        window.location.reload();
    });

    GetBlockCust();

});

function GetBlockCust() {
    $.ajax({
        url: "/Serviceprovider/GetBlockCust",
        method: "GET",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            if (data != "notfound") {
                var DataList = $("#blockCustTB tbody");
                DataList.empty();

                for (var i = 0; i < data.length; i++) {
                    if (data[i].isBlocked) {
                        DataList.append('<tr><td><img src="/img/avatar-male.png"/></td><td><span class="customerNameBlockTB">' + data[i].name + '</span><input type="hidden" value="' + data[i].uid + '"/></td><td><button class="btn unblockBtn">Unblock</button></td></tr>');
                    } else {
                        DataList.append('<tr><td><img src="/img/avatar-male.png"/></td><td><span class="customerNameBlockTB">' + data[i].name + '</span><input type="hidden" value="' + data[i].uid + '"/></td><td><button class="btn blockBtn">Block</button></td></tr>');
                    }
                }
            }

            var table = $('#blockCustTB').DataTable({
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

            $("#blockCustTB .dataTables_empty").text("No data Available!");

            $("#blockCustTB").click((e) => {
                if (e.target.className == "btn blockBtn") {
                    var uid = $(e.target.closest('tr').childNodes[1].childNodes[1]).val();
                    console.log(uid)

                    $.ajax({
                        url: "/Serviceprovider/BlockCustomer",
                        method: "POST",
                        data: { UID: uid },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            console.log(data);
                            if (data != "notfound") {
                                $(".successTxtUS").text("User has been blocked successfully!");
                                $("#upSerSuccessModal").modal("show");
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

                if (e.target.className == "btn unblockBtn") {
                    var uid = $(e.target.closest('tr').childNodes[1].childNodes[1]).val();
                    console.log(uid)

                    $.ajax({
                        url: "/Serviceprovider/UnBlockCustomer",
                        method: "POST",
                        data: { UID: uid },
                        beforeSend: () => {
                            $(".loading-div").removeClass("d-none");
                        },
                        success: (data) => {
                            console.log(data);
                            if (data != "notfound") {
                                $(".successTxtUS").text("User has been unblocked successfully!");
                                $("#upSerSuccessModal").modal("show");
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