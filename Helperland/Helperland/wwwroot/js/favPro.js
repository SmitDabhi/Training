$(document).ready(function () {

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

    getFavProData();
});

function getFavProData() {
    $.ajax({
        url: "/Customer/GetFavProData",
        method: "GET",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            console.log(data);
            if (data != "notfound") {
                var dataList = $("#favProTB tbody");
                dataList.empty();

                for (var i = 0; i < data.length; i++) {
                    if (data[i].isBlocked == false && data[i].isFav == false) {
                        dataList.append('<tr><td><img src="/img/avatar-' + data[i].profIcon + '.png" /></td><td><span class="spNameFavTB">' + data[i].name + '</span><input type="hidden" value="' + data[i].uid + '"/></td><td><div class="Stars" style="--rating: ' + data[i].rating + ';"><span id="rateNumber">' + data[i].rating + '</span></div></td><td><span class="cleaningCount">'+ data[i].servCount +' Cleanings</span></td><td><div class="favTBBtn"><button class="btn favSPBtn">Favourite</button><button class="btn blockSPBtn">Block</button></div></td></tr>');
                    } else if (data[i].isBlocked == true) {
                        dataList.append('<tr><td><img src="/img/avatar-' + data[i].profIcon + '.png" /></td><td><span class="spNameFavTB">' + data[i].name + '</span><input type="hidden" value="' + data[i].uid + '"/></td><td><div class="Stars" style="--rating: ' + data[i].rating + ';"><span id="rateNumber">' + data[i].rating + '</span></div></td><td><span class="cleaningCount">'+ data[i].servCount +' Cleanings</span></td><td><div class="favTBBtn"><button class="btn favSPBtn">Favourite</button><button class="btn unblockSPBtn">Unblock</button></div></td></tr>');
                    } else if (data[i].isFav == true) {
                        dataList.append('<tr><td><img src="/img/avatar-' + data[i].profIcon + '.png" /></td><td><span class="spNameFavTB">' + data[i].name + '</span><input type="hidden" value="' + data[i].uid + '"/></td><td><div class="Stars" style="--rating: ' + data[i].rating + ';"><span id="rateNumber">' + data[i].rating + '</span></div></td><td><span class="cleaningCount">'+ data[i].servCount +' Cleanings</span></td><td><div class="favTBBtn"><button class="btn unfavSPBtn">Unfavourite</button><button class="btn blockSPBtn">Block</button></div></td></tr>');
                    }
                }
            }

            $('#favProTB').DataTable({
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

        },
        error: (err) => {
            console.log(err);
        },
        complete: () => {
            $(".loading-div").addClass("d-none");
        }
    });
}