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

    $("#inputDOB").dateDropdowns({
        submitFieldName: 'inputDOB',
        minAge: 18,
        submitFormat: "dd/mm/yyyy"
    });

    if ($("#inputOldPass").val() == "" || $("#inputNewPass").val() == "" || $("#inputCPass").val() == "") {
        $("#btnPassChangeSave").prop("disabled", true);
    }

    $("#inputOldPass,#inputNewPass,#inputCPass").on('keyup', () => {

        if ($("#inputOldPass").val() != "" && $("#inputNewPass").val() != "" && $("#inputCPass").val() != "") {
            $("#btnPassChangeSave").prop("disabled", false);
        } else {
            $("#btnPassChangeSave").prop("disabled", true);
        }
    });

    $("#btnPassChangeSave").click(() => {

        var obj = {
            OldPassword: $("#inputOldPass").val(),
            NewPassword: $("#inputNewPass").val(),
            ConfirmPassword: $("#inputCPass").val()
        };


        $.ajax({
            url: "/Customer/PassChange",
            method: "POST",
            data: obj,
            beforeSend: () => {
                $(".loading-div").removeClass("d-none");
            },
            success: (data) => {
                if (data == "Success") {
                    $("#inputOldPass").val("");
                    $("#inputNewPass").val("");
                    $("#inputCPass").val("");
                    $("#errorPassChange").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>The password reset successfully!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                } else if (data == "PassNotMatch") {
                    $("#errorPassChange").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>The password and confirmation password is not match!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                } else if (data == "PassNotValid") {
                    $("#errorPassChange").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>The password must contain: <br>Minimum 8 characters, <br>Atleast 1 UpperCase Alphabet, <br>1 LowerCase Alphabet, <br>1 Number and 1 Special Character!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                } else if (data == "PassNotFound") {
                    $("#errorPassChange").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>The Old password is incorrect!</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>');
                } else if (data == "SamePass") {
                    $("#errorPassChange").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>The new password is same as current password!</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
                }

                $("#btnPassChangeSave").prop("disabled", true);
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                $(".loading-div").addClass("d-none");
            }
        });
    });

    $(".avatarRadio .avatarRadioOptions input[type=radio]").change(() => {
        var Avatar = $(".avatarRadio .avatarRadioOptions input[type=radio]:checked").val();
        $(".spAccProfIcon").html('<img src="/img/avatar-' + Avatar + '.png">')
    });


    $("#inputPostCode").keyup(() => {
        var pinData = $("#inputPostCode");
        $("#inputCity").val("");
        if (pinData.val().length == 6) {
            $.ajax({
                url: "https://api.postalpincode.in/pincode/" + pinData.val(),
                method: "GET",
                dataType: "json",
                cache: false,
                beforeSend: () => {
                    $(".loading-div").removeClass("d-none");
                },
                success: (data) => {

                    if (data[0].Status == "Error") {
                        $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter Valid Postal Code!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                    } else if (data[0].Status == "Success") {
                        $("#inputCity").val(data[0].PostOffice[0].District);
                        $("#editAddressState").val(data[0].PostOffice[0].State);
                        $("#errorDataPage").html('');                    }
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

    $("#btnDataChangeSave").click(() => {
        var testPhone = /^([ 0-9]){10}$/.test($("#inputPhoneNumber").val());
        var testPin = /^([ 0-9]){6}$/.test($("#inputPostCode").val());

        if ($("#inputFname").val() == "") {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter First Name!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($("#inputLname").val() == "") {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter Last Name!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($("#inputPhoneNumber").val() == "" || !testPhone || $("#inputPhoneNumber").val().length != 10) {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter Valid Phone Number!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($("#inputNationality").val() == "") {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Select Nationality!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($(".dobSelect .day").val() == "" || $(".dobSelect .month").val() == "" || $(".dobSelect .year").val() == "") {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Select Date of Birth!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($(".genderRadio input[type=radio]:checked").val() == undefined) {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Select Gender!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($(".avatarRadio .avatarRadioOptions input[type=radio]:checked").val() == undefined) {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter Last Name!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($("#inputStreet").val() == "") {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter Street Name!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($("#inputHouseno").val() == "") {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter House Number!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        } else if ($("#inputPostCode").val() == "" || !testPin || $("#inputPostCode").val().length != 6) {
            $("#errorDataPage").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter Valid Postal Code!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        }else {
            var obj = {
                Fname: $("#inputFname").val(),
                Lname: $("#inputLname").val(),
                Email: $("#inputEmail").val(),
                Mobile: $("#inputPhoneNumber").val(),
                Nationaity: parseInt($("#inputNationality").val()),
                Gender: parseInt($(".genderRadio input[type=radio]:checked").val()),
                Avatar: $(".avatarRadio .avatarRadioOptions input[type=radio]:checked").val(),
                StreetName: $("#inputStreet").val(),
                HouseNo: $("#inputHouseno").val(),
                PostalCode: $("#inputPostCode").val(),
                City:$("#inputCity").val()
            }

            if ($("#editAddressState").val() != "") {
                obj.State = $("#editAddressState").val();
            }
            if ($("#inputDOB").val() != "") {
                obj.DOB = $("#inputDOB").val();
            }

            $.ajax({
                url: "/Serviceprovider/UpdateSpData",
                method: "POST",
                data: obj,
                beforeSend: () => {
                    $(".loading-div").removeClass("d-none");
                },
                success: (data) => {
                    if (data == "true") {
                        $("#errorDataPage").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>User has been updated successfully!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        setTimeout(() => {
                            $("#errorDataPage").html("");
                        }, 5000);
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

    getAccData();
});

function getAccData() {
    $.ajax({
        url: "/Serviceprovider/GetMyAccountData",
        method: "GET",
        beforeSend: () => {
            $(".loading-div").removeClass("d-none");
        },
        success: (data) => {
            if (data != "notfound") {
                $("#inputFname").val(data.fname);
                $("#inputLname").val(data.lname);
                $("#inputEmail").val(data.email);
                $("#inputPhoneNumber").val(data.mobile);

                if (data.avatar != null) {
                    $(".spAccProfIcon").html('<img src="/img/avatar-' + data.avatar + '.png">');
                }

                if (data.dob != null) {
                    var arr = data.dob.split("T")[0].split("-");
                    $(".dobSelect .day").val(arr[2]);
                    $(".dobSelect .month").val(arr[1]);
                    $(".dobSelect .year").val(arr[0]);
                }

                if (data.nationaity != null) {
                    $("#inputNationality").val(data.nationaity);
                }

                if (data.gender != null) {
                    $(".genderRadio input[type=radio][value=" + data.gender + "]").prop('checked', true)
                }

                if (data.avatar != null) {
                    $(".avatarRadio .avatarRadioOptions  input[type=radio][value=" + data.avatar + "]").prop('checked', true)
                }
                if (data.streetName != null) {
                    $("#inputStreet").val(data.streetName);
                }
                if (data.houseNo != null) {
                    $("#inputHouseno").val(data.houseNo);
                }
                if (data.postalCode != null) {
                    $("#inputPostCode").val(data.postalCode);
                }
                if (data.city != null) {
                    $("#inputCity").val(data.city);
                }
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
