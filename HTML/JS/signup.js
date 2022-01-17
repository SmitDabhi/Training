$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>0){
			$('.signup-navbar').css('opacity','0.8');
			$('#homebtn').css('display', 'block');		         
        }else{
			$('.signup-navbar').css('opacity','1');
			$('#homebtn').css('display', 'none');		
        }
    });
    $("#homebtn").click(function (e) { 
		$("html, body").animate({ scrollTop: 0 }, 0); 
	});
});