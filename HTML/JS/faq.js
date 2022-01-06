$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>0){
			$('.faq-navbar').css('opacity','0.8');
			$('#homebtn').css('display', 'block');		         
        }else{
			$('.faq-navbar').css('opacity','1');
			$('#homebtn').css('display', 'none');		
        }
    });
});