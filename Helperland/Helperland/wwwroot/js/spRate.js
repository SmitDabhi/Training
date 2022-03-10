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

    getRateData();
});

function getRateData() {
    $.ajax({
        url: "/Serviceprovider/GetMyRatingsData",
        method: "GET",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            if (data != "notfound") {
                var DataList = $("#spRateTable tbody");
                DataList.empty();

                for (var i = 0; i < data.length; i++) {
                    DataList.append('<tr><td><div class="spRateTBFirstpart"><div class="spRateSerIDNameDiv"><span class="spRateTBID">' + data[i].serviceId + '</span><span class="spRateTBName">' + data[i].customerName + '</span></div><div class="spRateSerDateTimeDiv"><span class="spanSPRateDTDash"><img src="/img/calendar2.png" class="me-2" />' + data[i].serviceDate + '</span><span class="spanSPRateDTDash"><img src="/img/layer-14.png" class="me-2" />' + data[i].serviceStartTime + ' - ' + data[i].serviceEndTime + '</span></div><div class="spRateRatingsDiv"><span class="rateDivHead">Ratings</span><div class="Stars" style="--rating: ' + data[i].rating + ';"><span class="rateTDRatingTitle">' + data[i].ratingTitle + '</span></div></div></div></td><td><div class="custCommentDiv"><span class="custCommentHead">Customer Comment</span><span class="custCommentRateTB">' + data[i].comment +'</span></div></td></tr>');
                }

                var table = $('#spRateTable').DataTable({
                    "dom": 'Bt<"table-bottom d-flex justify-content-between"<"table-bottom-inner d-flex"li>p>',
                    "pagingType": "full_numbers",
                    "searching": true,
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

                $(".ratingSelect select").change(() => {
                    var search = $(".ratingSelect select").val();
                    if (search != "All") {
                        table.search(search).draw();
                    } else {
                        table.search("Ratings").draw();
                    }
                })
                
                $("#radioSelectUl input[type=radio]").change(() => {
                    var checked = $("#radioSelectUl input[type=radio]:checked").val();

                    if (checked == "SID:Asc") {
                        sort(0, "asc");
                    } else if (checked == "SID:Desc") {
                        sort(0, "desc");
                    }

                    function sort(col, order) {
                        table.order([col, order]).draw();
                    }
                });

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