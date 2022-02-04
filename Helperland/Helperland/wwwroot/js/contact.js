$(document).ready(()=>{
    $(window).scroll((e)=>{
        if(window.scrollY>0){
			$('.price-navbar').css('opacity','0.8');
			$('#homebtn').css('display', 'block');		         
        }else{
			$('.price-navbar').css('opacity','1');
			$('#homebtn').css('display', 'none');		
        }
    });
    $(".uploadBtnLabel").click( ()=> {
        $("#uploadFile").trigger('click');
    });
    $("#uploadFile").change(() => {
        var a = $("#uploadFile").val();
        if (a) {
            $(".custom-txt").html(a.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
        } else {
            $(".custom-txt").html("No file chosen, yet.")
        }
    });
});