$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>0){
			$('.contact-navbar').css('opacity','0.8');
			$('#homebtn').css('display', 'block');		         
        }else{
			$('.contact-navbar').css('opacity','1');
			$('#homebtn').css('display', 'none');		
        }
    });
	$("#homebtn").click(function (e) { 
		$("html, body").animate({ scrollTop: 0 }, 0); 
	});
    $("#frgLink").click(function (e) { 
		$("#exampleModal").modal('hide');
	});
	$(".loginlink").click(function (e) { 
		$("#frgPsw").modal('hide');
	});
});