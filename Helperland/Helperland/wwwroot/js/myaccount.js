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
                if (data != "notfound") {
                    var AddList = $("#accAddressTab tbody");
                    AddList.empty();

                    for (var i = 0; i < data.length; i++) {
                        AddList.append('<tr><td><span class="addressDetails"><span class="addressRow"><strong>Address :</strong> ' + data[i].addressLine2 + ', ' + data[i].addressLine1 + ', ' + data[i].city + ', ' + data[i].postalCode + '</span><span class="phoneDetails"><strong>Phone number :</strong> ' + data[i].mobile + '</span></span></td><td><div class="addAction"><a value="' + data[i].id + '"><i class="far fa-edit editAddAcc"></i></a><a value="' + data[i].id +'"><i class="fal fa-trash-alt delAddAcc"></i></a></div></td></tr>');
                    }
                } else {
                    var AddList = $("#accAddressTab tbody");
                    AddList.empty();
                }

                $("#accAddressTab tbody tr").click((e) => {
                    if (e.target.className == "far fa-edit editAddAcc") {
                        while (e.target && e.target.nodeName !== "TR") {
                            e.target = e.target.parentNode;
                        }
                        var reqAdd = $(e.target.childNodes[0]).text();
                        var arr = reqAdd.split(",");

                        $("#inputStreet").val($.trim(arr[1]));
                        $("#inputHouseNo").val(arr[0].slice(10));
                        $("#inputLocation").val($.trim(arr[2]));
                        $("#inputPostCode").val(parseInt(arr[3].slice(0, -25)));
                        $("#inputPhone").val(parseInt(arr[3].slice(21)));
                        $("#editAddressForm").val(e.target.childNodes[1].childNodes[0].childNodes[1].getAttribute("value"));

                        $("#addNewAddressModal .modal-header h5").text("Edit Address");
                        $("#addNewAddressModal .modal-footer").html('<button type="button" class="btn btn-primary" id="editAddressBtn">Edit</button>');
                        $("#addNewAddressModal").modal('show');

                        $("#editAddressBtn").click(() => {
                            var obj = {
                                AddressId: $("#editAddressForm").val(),
                                AddressLine1: $("#inputStreet").val(),
                                AddressLine2: $("#inputHouseNo").val(),
                                City: $("#inputLocation").val(),
                                PostalCode: $("#inputPostCode").val(),
                                Mobile: $("#inputPhone").val()                               
                            }

                            if ($("#editAddressState").val() != "") {
                                obj.State = $("#editAddressState").val();
                            }
                            console.log(obj);

                            $.ajax({
                                url: "/Customer/EditAddressAcc",
                                method: "POST",
                                data: obj,
                                success: (data) => {
                                    $("#addNewAddressModal").modal("hide");
                                    $("#nav-address-tab").click();
                                    $("#successMsgAddForm").removeClass("d-none");
                                    $("#successMsgAddForm div strong").text("Address changed successfully!");
                                    setTimeout(() => {
                                        $("#successMsgAddForm").addClass("d-none")
                                    }, 3000);                                },
                                error: (err) => {
                                    console.log(err);
                                }
                            });
                        });
                    }

                    if (e.target.className == "fal fa-trash-alt delAddAcc") {
                        $("#delAddressId").val(e.target.parentNode.getAttribute('value'));
                        $("#deleteAddressModal").modal('show');
                    }
                });
            },
            error: (err) => {
                alert("fail");
                console.log(err);
            }
        });
    });

    $("#deleteAddBtn").click(() => {
        var obj = {
            Id: $("#delAddressId").val()
        }

        $.ajax({
            url: "/Customer/DeleteAddress",
            method: "POST",
            data: obj,
            success: (data) => {
                $("#deleteAddressModal").modal("hide");
                $("#nav-address-tab").click();
                $("#successMsgAddForm").removeClass("d-none");
                $("#successMsgAddForm div strong").text("Address deleted successfully!");
                setTimeout(() => {
                    $("#successMsgAddForm").addClass("d-none")
                }, 3000);            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    $("#inputPostCode").keyup(() => {
        var pinData = $("#inputPostCode");
        $("#inputLocation").val("");
        if (pinData.val().length == 6) {
            console.log("success");
            $.ajax({
                url: "https://api.postalpincode.in/pincode/"+pinData.val(),
                method:"GET",
                dataType: "json",
                cache: false,
                success: (data) => {

                    console.log(data);
                    if (data[0].Status == "Error") {
                        console.log("err");
                        $("#errAddAddressPin").removeClass("d-none").text("Invalid Postal Code!")
                    } else if (data[0].Status == "Success") {
                        $("#inputLocation").val(data[0].PostOffice[0].District);
                        $("#editAddressState").val(data[0].PostOffice[0].State);
                        $("#errAddAddressPin").addClass("d-none");
                    }
                },
                error: (err) => {
                    console.log(err);
                }

            });
        }
    });

    $("#inputPhone").keyup(() => {
        if ($("#inputPhone").val().length == 10) {
            var testPhone = /^([ 0-9]){10}$/.test($("#inputPhone").val());
            if (!testPhone) {
                $("#errAddAddressPhone").removeClass("d-none").text("Invalid Mobile Number");
                $("#addAddressBtn").prop("disabled", true);
                $("#editAddressBtn").prop("disabled", true);
            } else {
                $("#errAddAddressPhone").addClass("d-none");
                $("#addAddressBtn").prop("disabled", false);
                $("#editAddressBtn").prop("disabled", false);
            }
        } else {
            $("#errAddAddressPhone").removeClass("d-none").text("Invalid Mobile Number");
            $("#addAddressBtn").prop("disabled", true);
            $("#editAddressBtn").prop("disabled", true);
        }
    });

    $("#addNewAddress").click(() => {
        $("#addNewAddressModal .modal-header h5").text("Add New Address");
        $("#addNewAddressModal .modal-footer").html('<button type="button" class="btn btn-primary" id="addAddressBtn">Add</button>');
        $("#addNewAddressModal form").trigger('reset');
        $("#addNewAddressModal").modal('show');

        if ($("#inputStreet").val() == "" || $("#inputHouseNo").val() == "" || $("#inputPostCode").val() == "" || $("#inputLocation").val() == "" || $("#inputPhone").val() == "") {
            $("#addAddressBtn").prop("disabled", true);
        }
        
        $("#addAddressBtn").click(() => {
            var obj = {
                AddressLine1: $("#inputStreet").val(),
                AddressLine2: $("#inputHouseNo").val(),
                City: $("#inputLocation").val(),
                PostalCode: $("#inputPostCode").val(),
                Mobile: $("#inputPhone").val(),
                State: $("#editAddressState").val()
            }

            console.log(obj);

            $.ajax({
                url: "/Customer/AddAddressAcc",
                method: "POST",
                data: obj,
                success: (data) => {
                    $("#addNewAddressModal").modal("hide");
                    $("#nav-address-tab").click();
                    $("#successMsgAddForm").removeClass("d-none");
                    $("#successMsgAddForm div strong").text("Address saved successfully!");
                    //    
                    setTimeout(()=>{
                        $("#successMsgAddForm").addClass("d-none")
                    }, 3000);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    });

    $("#inputStreet, #inputHouseNo, #inputPostCode, #inputLocation").on('keyup', () => {
        if ($("#inputStreet").val() == "" || $("#inputHouseNo").val() == "" || $("#inputPostCode").val() == "" || $("#inputLocation").val() == "") {
            $("#addAddressBtn").prop("disabled", true);
            $("#editAddressBtn").prop("disabled", true);
        } else {
            $("#editAddressBtn").prop("disabled", false);
        }
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

