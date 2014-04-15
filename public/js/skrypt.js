$(function () {
    alert('Zacznij grę!');

    var size, dim, max;
    /*
		PLAN
		=========

		1. rysowanie interfejsu w tym komunikacja z serwerem ile pol i do czego
			* 3 stale pola na size dim max
			* przycisk wysylajacy ajaxem ustawienia size dim max
		2. sekcja playGame, rysowanie kolejnych pol do zgadywania + div na odpowiedzi srvera + przycisk wyslij

    */

    

    graj = function()
    {
    	$('#poleGry').html("");
    	for(var i=0; i<size; i++)
    		$('#poleGry').html($('#poleGry').html()+"<input id="+(i+1)+"></div>");

    	$('#poleGry').html($('#poleGry').html()+"<div class='wynik'></div>");

    	$('#poleGry').html($('#poleGry').html()+"<button class='wyslij'>Wyslij</button>");

    	$('.wyslij').click(wyslij);
    }

    wyslij = function(e){

    	var liczby = "";
    	var urlBuilder = "/mark";

    	for(var i=0; i<size; i++)
    		urlBuilder+="/"+$('#'+(i+1)).val();

    	urlBuilder+="/";

    	for(var i=0; i<size; i++)
    		liczby+=$('#'+(i+1)).val()+" ";
 	
    	$.ajax({
    		url: urlBuilder,
    		method: 'get',
    		success: function(arg){ $('#historia').html($('#historia').html()+liczby+arg.retVal+ " " + arg.retMsg +"<br>") }
    	})
		
    }

    startButton = function(e){

    	size = $('#size').val();
    	dim = $('#dim').val();
    	max = $('#max').val();

    	//console.log(size + " " + dim + " " + max);

    	$.ajax({
    		url: '/play/size/'+size+'/dim/'+dim+'/max/'+max+'/',
    		method: 'get',
    		success: function(arg) {
    			graj();
    			$('#success').html(arg.retMsg);
    		}
    	})

    }
  
    // click event dla rozpoczecia gry
    $('#startButton').click(startButton);

});
