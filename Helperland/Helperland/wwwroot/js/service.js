$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>10){
			$('.home-navbar').css({'background-color': '#525252','opacity':'0.9'});
			$('.sp-btn').css('background-color', '#29626D');
			$('.logo-nav').css({"width": "73px","height":"54px"});
			$('#homebtn').css('display', 'block');		         
        }else{
			$('.home-navbar').css('background-color', 'transparent');
			$('.sp-btn').css('background-color', 'transparent');
			$('.logo-nav').css({'width': '156px','height':'120px'})
			$('#homebtn').css('display', 'none');		
        }
    });
	$("#homebtn").click(function (e) { 
		$("html, body").animate({ scrollTop: 0 }, 0); 
	});
});