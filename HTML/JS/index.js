$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>10){
			$('.home-navbar').css({'background-color': '#525252','opacity':'0.9'});
			$('.sp-btn').css('background-color', '#29626D');
            $('.logonav').css({"width": "73px","height":"54px"});
			$('#homebtn').css('display', 'block');		
            
        }else{
			$('.home-navbar').css('background-color', 'transparent');
			$('.sp-btn').css('background-color', 'transparent');
            $('.logonav').css({'width': '175px','height':'130px'})
			$('#homebtn').css('display', 'none');		
        }
    });
	$("#hide-btn").click(function (e) { 
		$("#privacy").css("display", "none");
	});
});