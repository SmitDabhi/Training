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
});