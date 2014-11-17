$(document).ready(function(){
	var client,dest;
	xmlhttp=new XMLHttpRequest();
	if(window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
	else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.open("GET","topics159339.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	var url=xmlDoc.getElementsByTagName("channel")[0].childNodes[2].childNodes[0].nodeValue;
	//complete user list
	$(xmlDoc).find('item').each(function(){
		var title=$(this).find('title').text();
		var link = $(this).find('link').text();
		$('#topics').append("<div class='topic_obj' id='"+link+"' value='0'>"+title+"</div>");
	});	
	
	//connect button
	$('#btn_connect').click(function(){
		var id = $("#user").val();
        var pw = $("#password").val();
		dest = "/topic/"+id;
		client = Stomp.client(url);
		//debug info shows at bottom of page
 		client.debug = function(str){
			$("#main_5").append(str + "</br>");
        };
		//connect callback, shows all available sections
		var conCallBack=function(frame){
			client.debug("connected to Stomp");
			$('#connect').fadeOut({ duration: 'fast' });
			$('#disconnect').fadeIn();
			$('#main_2').slideDown();
			$('#main_3').slideDown();
			$('#main_4').slideDown();
			$('#main_6').slideDown();
			//automatically subscribe the user himself and append any incoming message to 'main_4' division
			client.subscribe(dest, function(message) {
				$("#main_4").append("<div class='sub_obj'><b>"+id+" said: </b>"+ message.body + "</div>");
			});
			
		}
		//connect error call back, alert user why is it not connected
		var conCallBackErr=function(error){
			alert(error.headers.message);
		}
		client.connect(id,pw,conCallBack,conCallBackErr);  
	});
	
	//disconnect button click, disconnect and refresh this page
	$('#btn_disconnect').click(function(){
		 client.debug = function(str){
			$("#main_5").append(str + "</br>");
        };
		var discCallBack=function(){
			window.location.assign('index.html');
		}
		client.disconnect(discCallBack);
	});
	
	//send button function, send the content in the textarea to server
	$('#btn_send').click(function(){
		var text = $('#txt_send').val();
		client.debug = function(str){
			$("#main_5").append(str + "</br>");
        };
        if (text){
			client.send(dest, {}, text);
            $('#txt_send').val("");	//empty the textarea if send
        }
	});
	
	$('.topic_obj').click(function(){
		var sub_dest=$(this).attr('id');
		var sub_user=$(this).html();
		if($(this).val()==0){
			//subscribe chosen user, append incoming message to 'main_4' division
			var sub_id=client.subscribe(sub_dest,function(message){
				$("#main_4").append("<div class='sub_obj'><b>"+sub_user+" said: </b>"+message.body+"</div>");
			});
			//change subscribe status of this user to '1' and change bg-color font-color
			$(this).val('1');
			$(this).css({"background-color":"#660066","color":"white"});
		}else{
			//unsubscribe fails to work, dont know how to pass the subscribe header
			//suppose to unsubscribe and change the bg-color and font-color
			client.unsubscribe();
			$(this).css({"background-color":"white","color":"#660066"});
			$(this).val('0');
		}
	});
		
});
