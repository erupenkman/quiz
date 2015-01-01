$(function(){
	var template = $('#food-image-template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, {'foods':foods});
	$('#gallery').html(rendered);

	$('#next-button').on('click', function(){
		var answers = [];
		$("input:checkbox[name=foods]:checked").each(function()
		{
		    answers.push($(this).val());
		});
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/answers',
			data: JSON.stringify({foods:answers}),
   			contentType : 'application/json',
			success: function(data){
				console.log(data);
			},
			error: function(error){
				console.log(error.responseText);
			}
		});
	});
});
