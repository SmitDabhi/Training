$(document).ready(function () {
    var today = new Date();
    $('#bookDate').calendar({
        type: 'date',
        monthFirst: false,
        minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var day = date.getDate();
                var month = date.getMonth()+1;
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
        }
    });
   
    $(window).scroll((e) => {
        if (window.scrollY > 0) {
            $('#homebtn').css('display', 'block');
        } else {
            $('#homebtn').css('display', 'none');
        }
    });

    $("#homebtn").click(function (e) {
        $("html, body").animate({ scrollTop: 0 }, 0);
    });
    $(".btnAddAddress").click((e) => {
        $(".addressForm").removeClass("d-none");
        $(".addressBtn").addClass("d-none");
    })
    $(".button-discard").click((e) => {
        $(".addressBtn").removeClass("d-none");
        $(".addressForm").addClass("d-none");
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
    $("#schedule-tab").css("pointer-events", "none");
    $("#details-tab").css("pointer-events", "none");
    $("#payment-tab").css("pointer-events", "none");

    $('#bookSuccessModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});


function form1() {
    $("#setup-tab").removeClass("filled").addClass("active");
    $("#schedule-tab").removeClass("filled").removeClass("active");
    $("#details-tab").removeClass("filled").removeClass("active");
    $("#payment-tab").removeClass("filled").removeClass("active");

    $("#setup").addClass("show active");
    $("#schedule").removeClass("show active");
    $("#details").removeClass("show active");
    $("#payment").removeClass("show active");

    $("#schedule-tab").css("pointer-events", "none");
    $("#details-tab").css("pointer-events", "none");
    $("#payment-tab").css("pointer-events","none");

}
function form2() {
    $("#setup-tab").removeClass("active").addClass("filled");
    $("#schedule-tab").removeClass("filled").addClass("active");
    $("#details-tab").removeClass("filled").removeClass("active");
    $("#payment-tab").removeClass("filled").removeClass("active");

    $("#setup").removeClass("show active");
    $("#schedule").addClass("show active");
    $("#details").removeClass("show active");
    $("#payment").removeClass("show active");


    $("#details-tab").css("pointer-events", "none");
    $("#payment-tab").css("pointer-events", "none");
}
function form3() {
    $("#setup-tab").removeClass("active").addClass("filled");
    $("#schedule-tab").removeClass("active").addClass("filled");
    $("#details-tab").removeClass("filled").addClass("active");
    $("#payment-tab").removeClass("filled").removeClass("active");

    $("#setup").removeClass("show active");
    $("#schedule").removeClass("show active");
    $("#details").addClass("show active");
    $("#payment").removeClass("show active");

    $("#setup-tab").css("pointer-events", "auto");
    $("#schedule-tab").css("pointer-events", "auto");
    $("#details-tab").css("pointer-events", "auto");
    $("#payment-tab").css("pointer-events", "none");
}
function form4() {
    $("#setup-tab").removeClass("active").addClass("filled");
    $("#schedule-tab").removeClass("active").addClass("filled");
    $("#details-tab").removeClass("active").addClass("filled");
    $("#payment-tab").removeClass("filled").addClass("active");

    $("#setup").removeClass("show active");
    $("#schedule").removeClass("show active");
    $("#details").removeClass("show active");
    $("#payment").addClass("show active");
}

function btnCheckZip() {

    var ZipCode = $("#zipCodeValidate").val();
    $("#inputPostCode").val(ZipCode);
    var zipObj = {
        PostalCode: ZipCode
    }

    $.ajax({
        url:"/Customer/ValidZip",
        method: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: zipObj,
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: function (data) {
            setTimeout(function () {
                console.log(data);
                if (data.results == "Success") {
                    $("#errorPostalDiv").addClass("d-none");
                    $("#inputLocation").val(data.city);
                    form2();
                } else if (data.results == "Invalid") {
                    $("#errorPostalDiv").removeClass("d-none");
                    $(".PostalError").text("Please Enter Valid Postal Code!");
                } else {
                    $("#errorPostalDiv").removeClass("d-none");
                    $(".PostalError").text("We are not providing service in this area. We’ll notify you if any helper would start working near your area!");
                }
            }, 2000);
        },
        error: function (err) {
            alert("Fail Error");
        },
        complete: () => {
            setTimeout(() => {
                $(".loading-div").addClass("d-none");
            }, 2000);
        }
    });

}

function setupTime() {

    var bookDT = $("#bookDt").val();
    if (bookDT == "") {
        $("#BookDTError").removeClass("d-none");
    } else {
        $("#BookDTError").addClass("d-none");
        GetAddresses();
        form3();
    }
}

function PaymentSummary() {

    var duration = 0, totalHour = 0, cabVal = 0, fridgeVal = 0, ovenVal = 0, washVal = 0, windowVal = 0;

    var Date_time = $(".bookServiceDate").val() + " " + $(".selectBookTime").val(); ;

    if ($(".bookServiceDate").val() == "") {
        $(".showBookDateTime").addClass("d-none");
    } else {
        $(".showBookDateTime").text(Date_time);
        $(".showBookDateTime").removeClass("d-none");
    }

    if ($(".cabinet").is(":checked") || $(".fridge").is(":checked") || $(".oven").is(":checked") || $(".wash").is(":checked") || $(".windows").is(":checked"))
    {
        $(".extraTitle").removeClass("d-none");
    } else
    {
        $(".extraTitle").addClass("d-none");
    }

    if ($(".cabinet").is(":checked"))
    {
        $(".inCabSpan").removeClass("d-none");
        cabVal = 0.5;
    } else
    {
        $(".inCabSpan").addClass("d-none");
        cabVal = 0;
    }

    if ($(".fridge").is(":checked"))
    {
        $(".inFridgeSpan").removeClass("d-none");
        fridgeVal = 0.5;
    } else
    {
        $(".inFridgeSpan").addClass("d-none");
        fridgeVal = 0;
    }

    if ($(".oven").is(":checked"))
    {
        $(".inOvenSpan").removeClass("d-none");
        ovenVal = 0.5;
    } else
    {
        $(".inOvenSpan").addClass("d-none");
        ovenVal = 0;
    }

    if ($(".wash").is(":checked"))
    {
        $(".inWashSpan").removeClass("d-none");
        washVal = 0.5;
    } else
    {
        $(".inWashSpan").addClass("d-none");
        washVal = 0;
    }

    if ($(".windows").is(":checked"))
    {
        $(".inWinSpan").removeClass("d-none");
        windowVal = 0.5;
    } else
    {
        $(".inWinSpan").addClass("d-none");
        windowVal = 0;
    }

    duration = parseFloat($(".selectBookDuration").val());
    $(".basicHourTime").text(duration + " Hrs");

    totalHour = cabVal + fridgeVal + ovenVal + washVal + windowVal + duration;

    $(".totalServTime").text(totalHour + " Hrs");
    $(".perCleanFee").html(totalHour * 30 + "&euro;");
    $(".totalPayment").html(totalHour * 30 + "&euro;");
}

function GetAddresses() {
    $.ajax({
        method: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url: "/Customer/GetAddresses",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: function (data) {
            setTimeout(() => {
                if (data != "notfound") {
                    var AddList = $(".radioAdd");
                    AddList.empty();
                    for (var i = 0; i < data.length; i++) {
                        AddList.append('<div class="selectAddress"><input type="radio" name="addressRadio" id="addressID' + data[i].id + '" value="' + data[i].id + '"><span class="addressDetails"><span class="addressRow"><strong>Address :</strong> ' + data[i].addressLine2 + ', ' + data[i].addressLine1 + ', ' + data[i].city + ', ' + data[i].postalCode + '</span><span class="phoneDetails"><strong>Phone number :</strong>' + data[i].mobile + '</span></span></div>');
                    }
                } else {
                    var AddList = $(".radioAdd");
                    AddList.empty();
                }
            }, 2000);
        },
        error: function (err) {
            alert("fail")
        },
        complete: () => {
            setTimeout(() => {
                $(".loading-div").addClass("d-none");
            }, 2000);
        }
    });
}

function ClearForm() {
    $("#inputStreet").val("");
    $("#inputHouseNo").val("");
    $("#inputPhone").val("");
    $("#errorAddForm").addClass("d-none");
}

function addSave() {

    var obj = {
        AddressLine1: $("#inputStreet").val(),
        AddressLine2: $("#inputHouseNo").val(),
        PostalCode: $("#inputPostCode").val(),
        City: $("#inputLocation").val(),
        Mobile: $("#inputPhone").val()
    }
    var testPhone = /^([ 0-9]){10}$/.test(obj.Mobile);

    if (obj.AddressLine1 == "" && obj.AddressLine2 == "" && obj.Mobile == "") {
        $("#errorAddForm").removeClass("d-none").text("Please fill form properly!");
    }
    else if (obj.AddressLine1 == "") {
        $("#errorAddForm").removeClass("d-none").text("Please enter Steet!");
    } else if (obj.AddressLine2 == "") {
        $("#errorAddForm").removeClass("d-none").text("Please enter House Number!");
    } else if (obj.mobile == "" || !testPhone) {
        $("#errorAddForm").removeClass("d-none").text("Please enter valid Mobile Number!");
    }
    else {
        $("#errorAddForm").addClass("d-none");

        $.ajax({
            url: "/Customer/AddressSave",
            method: "POST",
            data: obj,
            beforeSend: () => {
                $(".loading-div").removeClass("d-none");
            },
            success: function (data) {
                setTimeout(() => {
                    if (data == "true") {
                        GetAddresses();
                        $(".addressForm").addClass("d-none");
                        $("#errorAddNotSelected").addClass("d-none");
                        $(".addressBtn").removeClass("d-none");
                        ClearForm();

                    } else {
                        alert("Fail");
                    }
                }, 2000);
            },
            error: function (err) {
                alert("false");
            },
            complete: () => {
                setTimeout(() => {
                    $(".loading-div").addClass("d-none");
                }, 2000);
            }
        });
    }
}

function addressFun() {

    if ($(".selectAddress").text() == null || $(".selectAddress").text() == "") {
        $("#errorAddNotSelected").removeClass("d-none").text("Please Add Address!");
    } else {

        if ($(".radioAdd div input[type=radio]:checked").val() == undefined || $(".radioAdd div input[type=radio]:checked").val() == "" || $(".radioAdd div input[type=radio]:checked").val() == null) {
            $("#errorAddNotSelected").removeClass("d-none").text("Please Select Address!");
        } else {
            $("#errorAddNotSelected").addClass("d-none");
            $(".loading-div").removeClass("d-none");
            setTimeout(() => {
                $(".loading-div").addClass("d-none");
            }, 2000);
            form4();
        }
    }
}

function completeBook() {

    var obj = {};

    obj.StartDateTIme = $("#bookDt").val() + " " + $("#selectBookTime").val();
    obj.Duration = $("#selectBookDuration").val();
    obj.Comment = $("#txtAreaComment").val();
    obj.HasPet = $("#petCheckbox").is(":checked");
    obj.AddressId = $(".radioAdd div input[type=radio]:checked").val();
    obj.PostalCode = $("#zipCodeValidate").val();
    obj.ExtraHours = 0;

    if ($("#cabinet").is(":checked")) {
        obj.ExtraHours += 0.5;
        obj.Cabinet = $("#cabinet").is(":checked");
    }

    if ($("#fridge").is(":checked")) {
        obj.ExtraHours += 0.5;
        obj.Fridge = $("#fridge").is(":checked");
    }

    if ($("#oven").is(":checked")) {
        obj.ExtraHours += 0.5;
        obj.Oven = $("#oven").is(":checked");
    }

    if ($("#wash").is(":checked")) {
        obj.ExtraHours += 0.5;
        obj.Wash = $("#wash").is(":checked");
    }

    if ($("#windows").is(":checked")) {
        obj.ExtraHours += 0.5;
        obj.Windows = $("#windows").is(":checked");
    }

    console.log(obj);

    $.ajax({
        url: "/Customer/CompleteBooking",
        method: "POST",
        data: obj,
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: function (data) {
            setTimeout(() => {
                console.log("Success");
                if (data == "false") {
                    alert("False");
                } else {
                    $(".bookSuccessSmTxt").text("Service request id : " + data);
                    $("#bookSuccessModal").modal("show");
                }
            }, 2000);
        },
        error: function (err) {
            console.log(err);
            alert("Fail");
        },
        complete: () => {
            setTimeout(() => {
                $(".loading-div").addClass("d-none");
            }, 2000);
        }
    });
}
    
