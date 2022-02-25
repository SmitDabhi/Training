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
    if ($(window).width() < 425) {
        $("#nav-details-tab").html('<i class="fal fa-file-alt fa-lg"></i>');
        $("#nav-address-tab").html('<i class="fal fa-map-marker-alt fa-lg"></i>');
        $("#nav-pass-tab").html('<i class="fal fa-key fa-lg"></i>');
    }
    $(window).resize(() => {
        if ($(window).width() < 425) {
            $("#nav-details-tab").html('<i class="fal fa-file-alt fa-lg"></i>');
            $("#nav-address-tab").html('<i class="fal fa-map-marker-alt fa-lg"></i>');
            $("#nav-pass-tab").html('<i class="fal fa-key fa-lg"></i>');
        } else {
            $("#nav-details-tab").html("My Details");
            $("#nav-address-tab").html("My Addresses");
            $("#nav-pass-tab").html("Change Password");
        }
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
            }
        });
    });

    $("#inputFname , #inputLname , #inputPhoneNumber").on('keyup', () => {
        if ($("#inputFname").val() == "" || $("#inputLname").val() == "" || $("#inputPhoneNumber").val() == "") {
            $("#btnDataChangeSave").prop("disabled", true);
        } else {
            $("#btnDataChangeSave").prop("disabled", false);
        }    
    });

    $("#inputPhoneNumber").on('keyup', () => {
        var mob = $("#inputPhoneNumber").val();
        var testPhone = /^([ 0-9]){10}$/.test(mob);

        if (!testPhone) {
            $("#errorMobileData").removeClass("d-none");
        } else {
            $("#errorMobileData").addClass("d-none");
        }
    });

    $("#btnDataChangeSave").click(() => {

        var obj = {
            Fname: $("#inputFname").val(),
            Lname: $("#inputLname").val(), 
            Email: $("#inputEmail").val(), 
            Mobile: $("#inputPhoneNumber").val(),
        };

        if ($("#inputDOB").val() != null && $("#inputDOB").val() != "") {
            obj.DoB = $("#inputDOB").val();
        }


        $.ajax({
            url: "/Customer/UpdateUserData",
            method: "POST",
            data: obj,
            success: (data) => {
                if (data == "true") {
                    $("#errorDataPage").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>User has been updated successfully!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    $("#nav-address-tab").click(() => {
        $.ajax({
            method: "GET",
            url: "/Customer/GetAddressAcc",
            success: (data) => {
                console.log(data);
                if (data != "notfound") {
                    var AddList = $("#accAddressTab tbody");
                    AddList.empty();

                    for (var i = 0; i < data.length; i++) {
                        AddList.append('<tr><td><span class="addressDetails"><span class="addressRow"><strong>Address :</strong> ' + data[i].addressLine2 + ', ' + data[i].addressLine1 + ', ' + data[i].city + ', ' + data[i].postalCode + '</span><span class="phoneDetails"><strong>Phone number :</strong> ' + data[i].mobile + '</span></span></td><td><div class="addAction"><a class="editAddAcc" value="' + data[i].id + '"><i class="far fa-edit"></i></a><a class="delAddAcc" value="' + data[i].id +'"><i class="fal fa-trash-alt"></i></a></div></td></tr>');
                    }
                } else {
                    var AddList = $("#accAddressTab tbody");
                    AddList.empty();
                }

                $(".editAddAcc").click(() => {
                    console.log("Add");
                    
                });
                $(".delAddAcc").click(() => {
                    console.log("Delete");
                });
            },
            error: (err) => {
                alert("fail");
                console.log(err);
            }
        });
    });

    
    getDataAcc();
});

function getDataAcc() {
    $.ajax({
        url: "/Customer/GetDataAcc",
        method: "GET",
        success: (data) => {

            if (data != "notfound") {
                $("#inputFname").val(data.fname);
                $("#inputLname").val(data.lname);
                $("#inputEmail").val(data.email);
                $("#inputPhoneNumber").val(data.mobile);
                if (data.doB != null && data.doB != "") {
                    var y = data.doB.split("T")
                    var dmy = y[0].split("-");
                    $("select.year").val(dmy[0]);
                    $("select.month").val(dmy[1]);
                    $("select.day").val(dmy[2]);
                }
            } else {
                console.log("Fail");
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
}

