$(document).ready(() => {
    $(window).scroll((e)=>{
        if(window.scrollY>10){
			$('.home-navbar').css({'background-color': '#525252','opacity':'0.9'});
			$('.sp-btn').css('background-color', '#29626D');
            $('.logo-nav').css({"width": "73px","height":"54px"});
			$('#homebtn').css('display', 'block');		      
        }else{
			$('.home-navbar').css('background-color', 'transparent');
			$('.sp-btn').css('background-color', 'transparent');
            $('.logo-nav').css({'width': '175px','height':'130px'})
			$('#homebtn').css('display', 'none');		
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
	$("#hide-btn").click(function (e) { 
		$("#privacy").css("display", "none");
	});
	$("#frgLink").click(function (e) { 
		$("#exampleModal").modal('hide');
	});
	$(".loginlink").click(function (e) { 
		$("#frgPsw").modal('hide');
	});
	$("#homebtn").click(function (e) { 
		$("html, body").animate({ scrollTop: 0 }, 0); 
	});
	$('#logoutModal').modal({
		backdrop: 'static',
		keyboard: false
	});
	const urlSearchParams = new URLSearchParams(window.location.search);
	if (urlSearchParams == "login=true") {
		$('#exampleModal').modal('show');
	}
	if (urlSearchParams == "forgot=true") {
		$("#frgPsw").modal('show');
	}
	if (urlSearchParams == "logout=true") {
		$("#logoutModal").modal('show');
	}
	if (urlSearchParams == "reset=true") {
		$('#resetPassSuccessModal').modal('show');
	}
});

