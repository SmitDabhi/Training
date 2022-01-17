$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>10){
			$('.sp-navabar').css({'background-color': '#525252','opacity':'0.9'});
			$('.sp-btn').css('background-color', '#29626D');
            $('.sp-logo').css({"width": "73px","height":"54px"});
			$('#homebtn').css('display', 'block');		         
        }else{
			$('.sp-navabar').css('background-color', 'transparent');
			$('.sp-btn').css('background-color', 'transparent');
            $('.sp-logo').css({'width': '156px','height':'120px'})
			$('#homebtn').css('display', 'none');		
        }
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
});